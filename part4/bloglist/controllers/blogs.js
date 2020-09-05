const blogsRouter = require("express").Router()
const Blog = require("../models/blog.js")
const { request } = require("../app.js")
const { response } = require("express")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  if (!("title" in request.body || "url" in request.body))
    return response.status(400).end()

  if (!("likes" in request.body)) request.body.likes = 0

  const blog = new Blog(request.body)
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
