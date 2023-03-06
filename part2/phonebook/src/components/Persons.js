
const Person = ({ person }) => <div>{person.name} {person.number}</div>

const Persons = ({ persons }) => <div>
    {persons.map(person => <Person person={person} key={person.name} />)}
</div>

export default Persons