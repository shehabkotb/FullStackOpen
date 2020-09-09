const app = require("../app")
const supertest = require("supertest")
const mongoose = require("mongoose")
const Blog = require("../models/blog.js")
const helper = require("./test_helper.js")
const User = require("../models/user")
const bcrypt = require("bcrypt")

const api = supertest(app)

beforeAll(async () => {
  await User.deleteMany({})
  const rootUser = new User({
    username: "admin",
    name: "fortesting",
    password: await bcrypt.hash("sekret", 10)
  })
  await rootUser.save()
})

describe("blog rest api", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogsObject = helper.intialBlogs.map((blog) => new Blog(blog))
    const promiseArray = blogsObject.map((blog) => blog.save())
    await Promise.all(promiseArray)
  })

  test("get all blogs", async () => {
    const resultBlogs = await api
      .get("/api/blogs")
      .expect(200)
      .expect("content-type", /application\/json/)

    expect(resultBlogs.body).toHaveLength(helper.intialBlogs.length)
  })

  test("blog has id property", async () => {
    const result = await api
      .get("/api/blogs")
      .expect(200)
      .expect("content-type", /application\/json/)

    expect(result.body[0].id).toBeDefined()
  })

  test("blog created sucessfully", async () => {
    const newBlog = {
      title: "Why Medium is a good platform",
      author: "Michael Li",
      url: "https://reactpatterns.com/",
      likes: 7
    }

    const user = {
      username: "admin",
      name: "fortesting",
      password: "sekret"
    }

    const login = await api
      .post("/login")
      .send(user)
      .expect(200)
      .expect("content-type", /application\/json/)

    expect(login.body.token).not.toBeFalsy()

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("authorization", `bearer ${login.body.token}`)
      .expect(201)
      .expect("content-type", /application\/json/)

    const blogs = await helper.blogsInDB()
    expect(blogs).toHaveLength(helper.intialBlogs.length + 1)

    const titles = blogs.map((blog) => blog.title)
    expect(titles).toContain("Why Medium is a good platform")
  })

  test("likes default to zero", async () => {
    const newBlog = {
      title: "Why Medium is a good platform",
      author: "Michael Li",
      url: "https://reactpatterns.com/"
    }

    const user = {
      username: "admin",
      name: "fortesting",
      password: "sekret"
    }

    const login = await api
      .post("/login")
      .send(user)
      .expect(200)
      .expect("content-type", /application\/json/)

    expect(login.body.token).not.toBeFalsy()

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("authorization", `bearer ${login.body.token}`)
      .expect(201)
      .expect("content-type", /application\/json/)

    const blogs = await helper.blogsInDB()
    expect(blogs).toHaveLength(helper.intialBlogs.length + 1)

    const testBlog = blogs.find(
      (blog) => blog.title === "Why Medium is a good platform"
    )
    expect(testBlog.likes).toEqual(0)
  })

  test("reject blog with title or url missing", async () => {
    const newBlog = {
      author: "Michael Li"
    }

    await api.post("/api/blogs").send(newBlog).expect(400)

    const blogs = await helper.blogsInDB()
    expect(blogs).toHaveLength(helper.intialBlogs.length)
  })

  test("deleting a blog works", async () => {
    const newBlog = {
      title: "Why Medium is a good platform",
      author: "Michael Li",
      url: "https://reactpatterns.com/",
      likes: 7
    }

    const user = {
      username: "admin",
      name: "fortesting",
      password: "sekret"
    }

    const login = await api
      .post("/login")
      .send(user)
      .expect(200)
      .expect("content-type", /application\/json/)

    expect(login.body.token).not.toBeFalsy()

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("authorization", `bearer ${login.body.token}`)
      .expect(201)
      .expect("content-type", /application\/json/)

    const blogToDelete = await Blog.findOne({
      title: "Why Medium is a good platform"
    })

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("authorization", `bearer ${login.body.token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(helper.intialBlogs.length)
  })

  test("updating a blog works", async () => {
    const blogs = await helper.blogsInDB()
    const blogToUpdate = blogs[0]

    const updatedNote = {
      title: "updated title",
      likes: blogToUpdate.likes + 10
    }

    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedNote)
      .expect(200)
      .expect("content-type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    const testBlog = blogsAtEnd.find((blog) => blog.title === "updated title")

    expect(testBlog.likes).toBe(blogToUpdate.likes + 10)
    expect(result.body.title).toEqual("updated title")
    expect(result.body.likes).toBe(blogToUpdate.likes + 10)
  })

  test("reject creating a blog without token", async () => {
    const newBlog = {
      title: "Why Medium is a good platform",
      author: "Michael Li",
      url: "https://reactpatterns.com/"
    }

    const result = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("content-type", /application\/json/)

    expect(result.body.error).toEqual("missing or invalid token")
  })

  test("reject creating a blog with invalid token", async () => {
    const newBlog = {
      title: "Why Medium is a good platform",
      author: "Michael Li",
      url: "https://reactpatterns.com/"
    }

    const result = await api
      .post("/api/blogs")
      .send(newBlog)
      .set(
        "Authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpxaG4gRG9lIiwiaWQiOiIxNTE2MTE1MTQifQ.A14cFYdB1thAezxXy0mj0ldNynDqk2USSyLws-_ENsU"
      )
      .expect(401)
      .expect("content-type", /application\/json/)

    expect(result.body.error).toEqual("missing or invalid token")
  })
})

afterAll(() => {
  mongoose.connection.close()
})
