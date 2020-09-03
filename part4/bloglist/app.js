const express = require("express")
const app = express()
const config = require("./utils/config.js")
const cors = require("cors")
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs.js")

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)

module.exports = app
