import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer.js"

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const handleVote = (id) => {
    console.log("vote", id)
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    dispatch(vote(id, changedAnecdote))
    dispatch(setNotification(`you voted ${changedAnecdote.content}`, 5))
  }

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter).toUpperCase()

  return (
    <div>
      {anecdotes
        .filter((anecdote) => {
          const content = anecdote.content.toUpperCase()
          return content.indexOf(filter) > -1
        })
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  )
}

export default AnecdoteList
