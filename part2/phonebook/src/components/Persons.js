import Person from './Person'

const Persons = ({ persons }) => <div>
    {persons.map(person => <Person person={person} key={person.name} />)}
</div>

export default Persons