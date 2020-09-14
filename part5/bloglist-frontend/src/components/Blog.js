import React, { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleRemove = async () => {
    const confirmation = window.confirm(
      `remove blog ${blog.title} by ${blog.author}`
    )

    if (!confirmation) return

    await removeBlog(blog)
  }

  const handleLike = async () => {
    await likeBlog(blog)
  }

  if (visible === false)
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}> view </button>
      </div>
    )

  const removeButton = <button onClick={handleRemove}>remove</button>

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={toggleVisibility}> hide </button>
      <div>{blog.url}</div>
      <div>
        Likes: {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>{blog.user.name}</div>
      {blog.user.username === user.username && removeButton}
    </div>
  )
}

Blog.prototypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
