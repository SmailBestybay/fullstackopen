const Notification = ({ message, messageStatus }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={messageStatus}>
      {message}
    </div>
  )
}

export default Notification