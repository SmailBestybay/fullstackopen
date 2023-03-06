const Filter = ({searchPerson, setSearchPerson}) => {

    return (
      <div>
          filter shown with 
          <input
            value={searchPerson}
            onChange={(event) => { setSearchPerson(event.target.value) }}
          />
        </div>
    )
}

export default Filter