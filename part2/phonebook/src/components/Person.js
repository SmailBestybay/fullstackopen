const Person = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name} {person.number} 
      {/* on click the callback function will be called */}
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}

export default Person