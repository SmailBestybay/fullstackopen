import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('enter name')

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  },[])

  const handleSubmit = (event) => {
    event.preventDefault()
    const foundName = persons.find(person => newName === person.name)
    if (foundName) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      personServices
        .create(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
      
      setNewName('')
      setNewNumber('')
    }
  }

  const filteredPersons = (searchPerson === 'enter name')
    ? persons
    : persons.filter(person => person.name
      .toLowerCase()
      .includes(searchPerson.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson} setSearchPerson={setSearchPerson}/>
      <h2>add a new</h2>
      <PersonForm 
        handleSubmit={handleSubmit} 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App