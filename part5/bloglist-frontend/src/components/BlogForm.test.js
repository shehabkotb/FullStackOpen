import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogsForm.js"

describe("blogForm", () => {
  const createMockHandler = jest.fn(() => ({
    title: "testTitle",
    author: "testAuthor"
  }))
  const notificationMockHandler = jest.fn()

  const component = render(
    <BlogForm
      setNotification={notificationMockHandler}
      createBlog={createMockHandler}
    />
  )

  test.only("creating blog calls passed in function", async () => {
    const form = await component.findByTestId("form-input")
    const titleInput = await component.findByTestId("title-input")
    const authorInput = await component.findByTestId("author-input")
    const urlInput = await component.findByTestId("url-input")

    userEvent.type(titleInput, "testTitle")
    userEvent.type(authorInput, "testAuthor")
    userEvent.type(urlInput, "testURL")

    fireEvent.submit(form)
    // debugger
    expect(createMockHandler.mock.calls).toHaveLength(1)
    expect(createMockHandler.mock.calls[0][0].title).toEqual("testTitle")
    expect(createMockHandler.mock.calls[0][0].author).toEqual("testAuthor")
    expect(createMockHandler.mock.calls[0][0].url).toEqual("testURL")
  })
})
