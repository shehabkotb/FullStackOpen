import React from "react"
// import blogService from "../services/blogs.js"

const BlogsForm = (props) => {
  const setNotification = props.setNotification
  const createBlog = props.createBlog

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: event.target.elements.title.value,
      author: event.target.elements.author.value,
      url: event.target.elements.url.value
    }

    const blog = await createBlog(newBlog)
    setNotification({
      type: "success",
      message: `A new blog ${blog.title} by ${blog.author} added`
    })
  }
  return (
    <div>
      <form data-testid="form-input" onSubmit={handleNewBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input data-testid="title-input" type="text" name="title"></input>
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input data-testid="author-input" type="text" name="author"></input>
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input data-testid="url-input" type="text" name="url"></input>
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default BlogsForm
