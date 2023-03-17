const Search = ({ searchCountry, searchHandler }) => {
    return (
      <div>
        find countries
        <input
          value={searchCountry}
          onChange={(event) => { searchHandler(event.target.value) }}
        />
      </div>
    )
  }

export default Search