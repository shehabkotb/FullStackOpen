const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user.js")

usersRouter.get("/", async (request, response) => {
  const result = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1
  })
  return response.json(result)
})

usersRouter.post("/", async (request, response) => {
  const body = request.body

  if (body.password.length < 3)
    return response
      .status(400)
      .json({ error: "password should be at least 3 characters long" })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    name: body.name,
    username: body.username,
    password: passwordHash
  })

  const result = await newUser.save()
  return response.status(201).json(result)
})

module.exports = usersRouter
