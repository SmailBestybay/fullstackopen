import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../AnecdotesContext"

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content}, {
      onSuccess: () => {
        notificationDispatch({type: 'NEW', payload: content})
        setTimeout(() => notificationDispatch({type: 'CLEAR'}), 5000)
      },
      onError: (error) => {
        notificationDispatch({type: 'ERROR', payload: error.response.data.error})
        setTimeout(() => notificationDispatch({type: 'CLEAR'}), 5000)
      } 
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
