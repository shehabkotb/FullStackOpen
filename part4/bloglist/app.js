const config = require("./utils/config.js")
const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs.js")
const usersRouter = require("./controllers/users.js")
const loginRouter = require("./controllers/login.js")
const middleware = require("./utils/middleware.js")

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use("/api/users", usersRouter)
app.use("/api/blogs", blogsRouter)
app.use("/login", loginRouter)

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing.js")
  app.use("/api/testing/", testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app
