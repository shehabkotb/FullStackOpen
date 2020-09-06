const config = require("./utils/config.js")
const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs.js")
const usersRouter = require("./controllers/users.js")
const errorHandler = require("./utils/middleware.js")

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

app.use(cors())
app.use(express.json())

app.use("/api/users", usersRouter)
app.use("/api/blogs", blogsRouter)

app.use(errorHandler)

module.exports = app
