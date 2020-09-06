const app = require("../app")
const supertest = require("supertest")
const mongoose = require("mongoose")
const Blog = require("../models/blog.js")
const helper = require("./test_helper.js")
const usersRouter = require("../controllers/users")
const User = require("../models/user")

const api = supertest(app)

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

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("content-type", /application\/json/)

    const blogs = await helper.blogsInDB()
    expect(blogs).toHaveLength(helper.intialBlogs.length + 1)

    const titles = blogs.map((blog) => blog.title)
    expect(titles).toContain("Why Medium is a good platform")
  })

  test("likes if non existent default to zero", async () => {
    const newBlog = {
      title: "Why Medium is a good platform",
      author: "Michael Li",
      url: "https://reactpatterns.com/"
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("content-type", /application\/json/)

    const blogs = await helper.blogsInDB()
    expect(blogs).toHaveLength(helper.intialBlogs.length + 1)

    const testBlog = blogs.find(
      (blog) => blog.title === "Why Medium is a good platform"
    )
    expect(testBlog.likes).toEqual(0)
  })

  test("400 on title or url of blog missing", async () => {
    const newBlog = {
      author: "Michael Li"
    }

    await api.post("/api/blogs").send(newBlog).expect(400)

    const blogs = await helper.blogsInDB()
    expect(blogs).toHaveLength(helper.intialBlogs.length)
  })

  test("deleting a blog works", async () => {
    const blogs = await helper.blogsInDB()

    const idToDelete = blogs[0].id
    await api.delete(`/api/blogs/${idToDelete}`).expect(204)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(helper.intialBlogs.length - 1)
  })

  test("updating a note works", async () => {
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
})

describe("user rest api", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const rootUser = new User({
      username: "admin",
      name: "fortesting",
      password: "sekret"
    })
    await rootUser.save()
  })

  test("creating A user works", async () => {
    const user = {
      username: "newuser",
      name: "testUser",
      password: "sekret"
    }

    const result = await api
      .post("/api/users")
      .send(user)
      .expect(201)
      .expect("content-type", /application\/json/)

    const dbAtEnd = await helper.usersInDB()

    expect(dbAtEnd).toHaveLength(2)
    const users = dbAtEnd.map((user) => user.username)
    expect(users).toContain("newuser")
  })

  test("get all users", async () => {
    const result = await api
      .get("/api/users")
      .expect(200)
      .expect("content-type", /application\/json/)

    const users = await result.body.map((user) => user.username)
    expect(users).toContain("admin")
  })

  test("rejected user with short password", async () => {
    const testUser = {
      username: "new",
      name: "testUser",
      password: "se"
    }

    const result = await api
      .post("/api/users")
      .send(testUser)
      .expect(400)
      .expect("content-type", /application\/json/)

    expect(result.body.error).toEqual(
      "password should be at least 3 characters long"
    )
    const dbAtEnd = await helper.usersInDB()
    expect(dbAtEnd).toHaveLength(1)
  })

  test("rejected user with short username", async () => {
    const testUser = {
      username: "ne",
      name: "testUser",
      password: "sekret"
    }

    const result = await api
      .post("/api/users")
      .send(testUser)
      .expect(400)
      .expect("content-type", /application\/json/)

    const dbAtEnd = await helper.usersInDB()
    expect(dbAtEnd).toHaveLength(1)
  })

  test("rejected user with duplicate username", async () => {
    const testUser = {
      username: "admin",
      name: "testUser",
      password: "sekret"
    }

    const result = await api
      .post("/api/users")
      .send(testUser)
      .expect(400)
      .expect("content-type", /application\/json/)

    const dbAtEnd = await helper.usersInDB()
    expect(dbAtEnd).toHaveLength(1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
