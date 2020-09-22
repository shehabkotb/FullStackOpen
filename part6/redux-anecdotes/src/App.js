import React, { useEffect } from "react"
import AnecdoteForm from "./components/AnecdoteForm.js"
import AnecdoteList from "./components/AnecdoteList.js"
import Notification from "./components/Notification.js"
import Filter from "./components/Filter.js"
import AnecdoteService from "./services/anecdotes.js"
import { intializeAnecdotes } from "./reducers/anecdoteReducer.js"
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    AnecdoteService.getAll().then((anecdotes) => {
      dispatch(intializeAnecdotes(anecdotes))
    })
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
