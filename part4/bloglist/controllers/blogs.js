const blogsRouter = require("express").Router()
const Blog = require("../models/blog.js")
const User = require("../models/user.js")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  return response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  if (!("title" in request.body || "url" in request.body))
    return response.status(400).end()

  const token = await jwt.verify(request.token, process.env.SECRET)
  if (request.token === undefined || !token.id)
    return response.status(401).json({ error: "missing or invalid token" })

  const user = await User.findById(token.id)

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes,
    user: user.id
  })

  const result = await blog.save()
  await result.populate("user", { username: 1, name: 1 }).execPopulate()

  user.blogs =
    user.blogs === undefined ? [result.id] : user.blogs.concat(result.id)

  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete("/:id", async (request, response) => {
  const token = await jwt.verify(request.token, process.env.SECRET)

  if (request.token === undefined || !token.id)
    return response.status(401).json({ error: "missing or invalid token" })

  const user = await User.findById(token.id)
  const blog = await Blog.findById(request.params.id)

  if (!blog.user.equals(user.id))
    return response
      .status(403)
      .json({ error: "you don't have the right permissions" })

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
