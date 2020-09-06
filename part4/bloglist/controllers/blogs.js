const blogsRouter = require("express").Router()
const Blog = require("../models/blog.js")
const User = require("../models/user.js")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  return response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  if (!("title" in request.body || "url" in request.body))
    return response.status(400).end()

  // if (!("likes" in request.body)) request.body.likes = 0

  const randomUser = await User.findOne({})

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes,
    user: randomUser.id
  })

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  return response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body

  const result = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true
  })

  return response.status(200).json(result)
})

module.exports = blogsRouter
