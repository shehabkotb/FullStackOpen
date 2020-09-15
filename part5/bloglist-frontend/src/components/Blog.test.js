import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
// import userEvent from "@testing-library/user-event"
import Blog from "./Blog.js"
// import BlogForm from "./BlogsForm.js"

describe("<Blog />", () => {
  let component
  let likesMockHandler
  let removeMockHandler

  beforeEach(() => {
    const testBlog = {
      title: "Why Medium is a good platform",
      author: "Michael Li",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: {
        name: "adminUser",
        username: "root",
        id: "5f582c40eca4af07e062a7c8"
      },
      id: "5f582f0c9f959e074cbb1b9a"
    }

    const user = {
      name: "adminUser",
      username: "root",
      id: "5f582c40eca4af07e062a7c8"
    }

    likesMockHandler = jest.fn()
    removeMockHandler = jest.fn()

    component = render(
      <Blog
        blog={testBlog}
        likeBlog={likesMockHandler}
        removeBlog={removeMockHandler}
        user={user}
      />
    )
  })

  test("url and likes are hidden by default", () => {
    expect(component.container).toHaveTextContent(
      "Why Medium is a good platform"
    )
    expect(component.container).toHaveTextContent("Michael Li")

    expect(
      component.container.querySelector(".url-div")
    ).not.toBeInTheDocument()

    expect(
      component.container.querySelector(".likes-div")
    ).not.toBeInTheDocument()
  })

  test("cliking show button shows url and likes", () => {
    const showButton = component.getByText("view")
    fireEvent.click(showButton)

    expect(component.container.querySelector(".url-div")).toBeDefined()
    expect(component.container.querySelector(".likes-div")).toBeDefined()
  })

  test("clicking the like button", () => {
    const showButton = component.getByText("view")
    fireEvent.click(showButton)

    const likeButton = component.getByText("like")
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likesMockHandler.mock.calls).toHaveLength(2)
  })
})
