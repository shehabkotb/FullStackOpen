import React from "react"
import blogService from "../services/blogs.js"

const BlogsForm = (props) => {
  const setNotification = props.setNotification

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    const blog = await blogService.create(newBlog)
    setNotification({
      type: "success",
      message: `A new blog ${blog.title} by ${blog.author} added`
    })
  }
  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input type="text" name="title"></input>
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input type="text" name="author"></input>
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input type="text" name="url"></input>
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default BlogsForm
