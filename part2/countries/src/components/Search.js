const Search = ({ searchCountry, changeHandler }) => {
    return (
      <div>
        find countries
        <input
          value={searchCountry}
          onChange={(event) => { changeHandler(event.target.value) }}
        />
      </div>
    )
  }

export default Search