import React, { useState, useEffect } from "react"
import Blog from "./components/Blog.js"
import LoginForm from "./components/LoginForm.js"
import blogService from "./services/blogs.js"
import BlogsForm from "./components/BlogsForm.js"
import Notification from "./components/Notification.js"
import "./App.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedBlogsappUser")

    if (userJSON !== null) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedBlogsappUser")
    setUser(null)
    blogService.setToken(null)
  }

  if (user === null) {
    return (
      <div>
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
        <LoginForm setUser={setUser} setNotification={setNotification} />
      </div>
    )
  }
  return (
    <div>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <h2>blogs</h2>
      {user.name} is logged in
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      <p />
      <BlogsForm setNotification={setNotification} />
      <p />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
