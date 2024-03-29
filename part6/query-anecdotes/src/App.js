import { useQuery, useMutation, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './AnecdotesContext'

const App = () => {
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData(
        'anecdotes', 
        anecdotes.map(a => a.id === newAnecdote.id ? newAnecdote : a)
      )
    }
  })
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1}, {
      onSuccess: () => {
        notificationDispatch({type: 'VOTE', payload: anecdote.content})
        setTimeout(() => notificationDispatch({type: 'CLEAR'}), 5000)
      }
    })
  }

  const result = useQuery('anecdotes', getAnecdotes, {retry: 2})

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service is not available due to problems in server</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
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
    </div>
  )
}

export default App
