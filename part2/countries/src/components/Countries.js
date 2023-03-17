const Countries = ({ foundCountries }) => {

  if (foundCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (foundCountries.length === 1) {
    const country = foundCountries[0]
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map(language => {
            return (
              <li key={language}>{language}</li>
            )
          })}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    )
  }

  return (
    <>
      {foundCountries.map((country, i) => {
        return (
          <div key={i}>{country.name.common}</div>
        )
      })}
    </>
  )
}

export default Countries