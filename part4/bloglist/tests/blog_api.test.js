const app = require("../app")
const supertest = require("supertest")
const mongoose = require("mongoose")
const Blog = require("../models/blog.js")
const helper = require("./test_helper.js")

const api = supertest(app)

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

  debugger
  expect(result.body[0].id).toBeDefined()
})

test("blog created sucessfully", async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
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
  expect(titles).toContain("React patterns")
})

afterAll(() => {
  mongoose.connection.close()
})
