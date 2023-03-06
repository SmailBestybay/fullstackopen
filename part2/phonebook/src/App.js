import { useState } from 'react'

const Number = ({person}) => <div>{person.name} {person.number}</div>

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '123-456' ,
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const foundName = persons.find(person => newName === person.name)
    if (foundName) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input
            value={newName} 
            onChange={(event) => {setNewName(event.target.value)}} 
          />
        </div>
        <div>
          number:
          <input
            value={newNumber} 
            onChange={(event) => {setNewNumber(event.target.value)}}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Number person={person} key={person.name} />
        )}
      </div>
    </div>
  )
}

export default App