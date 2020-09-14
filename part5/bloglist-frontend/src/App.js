import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog.js"
import LoginForm from "./components/LoginForm.js"
import blogService from "./services/blogs.js"
import BlogsForm from "./components/BlogsForm.js"
import Notification from "./components/Notification.js"
import Togglable from "./components/Togglable.js"
import "./App.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedBlogsappUser")

    if (userJSON !== null) {
      const user = JSON.parse(userJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const createBlog = (newBlog) => {
    return blogService.create(newBlog).then((returnedBlog) => {
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog))
      return returnedBlog
    })
  }

  const likeBlog = async (newBlog) => {
    const updatedBlog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes + 1,
      user: newBlog.user.id
    }
    const response = await blogService.update(newBlog.id, updatedBlog)

    const newBlogs = blogs.map((blog) => {
      return blog.id === newBlog.id ? { ...blog, likes: blog.likes + 1 } : blog
    })

    setBlogs(newBlogs)
    return response
  }

  const removeBlog = async (blogToDelete) => {
    await blogService.remove(blogToDelete.id)
    const newBlogs = blogs.filter((blog) => blog.id !== blogToDelete.id)
    setBlogs(newBlogs)

    setNotification({
      type: "success",
      message: `${blogToDelete.title} was deleted`
    })
  }

  const handleLogout = () => {
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
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogsForm setNotification={setNotification} createBlog={createBlog} />
      </Togglable>
      <p />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
