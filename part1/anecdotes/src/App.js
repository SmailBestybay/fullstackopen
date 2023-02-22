import { useState } from 'react'

const NextAnecdoteButton = ({handleClick}) => {
  return (
    <button onClick={handleClick}>next anecdote</button>
  )
}

const VoteButton = ({handleVote}) => {
  return (
    <button onClick={handleVote}>vote</button>
  )
}

const Anecdote = ({anecdote, voteCount}) => {
  return (
    <>
      <div>{anecdote}</div>
      <div>has {voteCount} votes</div>
    </>
  )
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const mostVoted = votes.indexOf(Math.max(...votes))

  const handleVote = () => {
    const nextVotes = [...votes]
    nextVotes[selected] += 1
    setVotes(nextVotes)
  }

  const handleClick = () => {
    const randNum = getRandom(0, anecdotes.length) 
    setSelected(randNum)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} voteCount={votes[selected]} />
      <VoteButton handleVote={handleVote}/>
      <NextAnecdoteButton handleClick={handleClick} />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[mostVoted]} voteCount={votes[mostVoted]} />
    </>
  )
}

export default App