import { useState } from 'react'

const Number = ({ person }) => <div>{person.name} {person.number}</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')

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

  const filteredPersons = (searchPerson === '')
    ? persons
    : persons.filter(person => person.name
      .toLowerCase()
      .includes(searchPerson.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:
        <input
          value={searchPerson}
          onChange={(event) => { setSearchPerson(event.target.value) }}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input
            value={newName}
            onChange={(event) => { setNewName(event.target.value) }}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={(event) => { setNewNumber(event.target.value) }}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map(person =>
          <Number person={person} key={person.name} />
        )}
      </div>
    </div>
  )
}

export default App