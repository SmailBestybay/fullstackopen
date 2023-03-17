const Country = ({country}) => {
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

export default Country