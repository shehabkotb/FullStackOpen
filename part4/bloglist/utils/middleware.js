const logger = require("./logger.js")

const errorHandler = (error, request, response, next) => {
  if (process.env.NODE_ENV !== "test") {
    logger.error(error.message)
  }

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "missing or invalid token" })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("bearer")) {
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor
}
