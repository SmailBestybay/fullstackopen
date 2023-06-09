import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes
    .filter((anecdote) => anecdote.content.includes(state.filter.input))
    .toSorted((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList