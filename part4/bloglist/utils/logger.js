const info = (...params) => {
  if (process.env.ENV !== "test") {
    console.log(...params)
  }
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info,
  error
}
