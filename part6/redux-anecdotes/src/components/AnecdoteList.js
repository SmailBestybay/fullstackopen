import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes
    .filter((anecdote) => anecdote.content.includes(state.filter.input))
    .toSorted((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000);
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList