import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [messageStatus, setMessageStatus] = useState(null)

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const foundPerson = persons.find(person => newName === person.name)
    if (foundPerson) {
      const confirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if(confirmed) {
        const newPerson = {...foundPerson, number: newNumber}
        personServices
          .update(newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== returnedPerson.id 
              ? person 
              : returnedPerson
            ))
          })
          .catch(error => {
            alert(`Unable to update ${newPerson.name}'s number`)
          })
      }

    } else {
      const newPerson = { name: newName, number: newNumber }
      personServices
        .create(newPerson)
        .then(returnedPerson => {
          setNotificationMessage(`Added ${newPerson.name}`)
          setPersons(persons.concat(returnedPerson))
          setMessageStatus('success')
          setTimeout(() => setNotificationMessage(null),2000)
        })
        .catch(error => alert(`Something went wrond. ${newPerson.name} was not added.`))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleDeleteOf = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personServices
        .deletePerson(person.id)
        .then(response => {
          if(response.statusText === 'OK') {
            setPersons(persons.filter(p => p.id !== person.id))
          }
        })
        .catch(error =>{
          setNotificationMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setMessageStatus('error')
        })
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
      <Notification message={notificationMessage} status={messageStatus}/>
      <Filter searchPerson={searchPerson} setSearchPerson={setSearchPerson} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      {/* passing the handler as a prop */}
      <Persons persons={filteredPersons} handleDeleteOf={handleDeleteOf} />
    </div>
  )
}

export default App