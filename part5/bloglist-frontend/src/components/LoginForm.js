import React, { useState } from "react"
import blogService from "../services/blogs.js"
import loginService from "../services/login.js"

const LoginForm = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const setNotification = props.setNotification
  const setUser = props.setUser

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedBlogsappUser", JSON.stringify(user))
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setNotification({
        type: "error",
        message: "Wrong user name or password"
      })
      console.log(exception)
    }
  }

  return (
    <div>
      <h1>log in to application</h1>
      <form>
        <label htmlFor="username">username:</label>
        <br />
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          id="username"
          name="username"
        ></input>
        <br />
        <label htmlFor="password">password:</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id="password"
          name="password"
        ></input>
        <br />
        <button type="submit" onClick={handleLogin}>
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
