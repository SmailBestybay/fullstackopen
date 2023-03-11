import Person from './Person'

const Persons = ({ persons, handleDeleteOf }) => <div>
    {persons.map(person => 
        <Person 
            person={person} 
            key={person.id} 
            // passing the handler as a callback function
            handleDelete={() => handleDeleteOf(person.id)}
        />)}
</div>

export default Persons