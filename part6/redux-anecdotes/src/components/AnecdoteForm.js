import React from "react"
import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer.js"
import {
  setNotification,
  removeNotification
} from "../reducers/notificationReducer.js"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(newAnecdote(content))
    dispatch(setNotification(`you voted ${content}`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
