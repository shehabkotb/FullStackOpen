const loginRouter = require("express").Router()
const User = require("../models/user.js")
const bycrpt = require("bcrypt")
const jwt = require("jsonwebtoken")

loginRouter.post("/", async (request, response) => {
  const user = await User.findOne({ username: request.body.username })

  const passWordCheck =
    user === null
      ? false
      : await bycrpt.compare(request.body.password, user.password)

  if (!(user && passWordCheck))
    return response.status(401).json({ error: "invalid user name or password" })

  const tokenForUser = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(tokenForUser, process.env.SECRET)

  return response
    .status(200)
    .json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
