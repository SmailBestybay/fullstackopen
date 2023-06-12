import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return `anecdote '${action.payload}' voted`
    case 'NEW':
      return `anecdote '${action.payload}' created`
    case 'ERROR': 
      return action.payload
    case 'CLEAR':
        return null
    default: 
      return state
  }
}

const AnecdotesContext = createContext()

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(AnecdotesContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch =  () => {
  const notificationAndDispatch = useContext(AnecdotesContext)
  return notificationAndDispatch[1]
}

export const AnecdotesContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <AnecdotesContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </AnecdotesContext.Provider>
  )
}

export default AnecdotesContext