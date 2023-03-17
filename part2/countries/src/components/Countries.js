import Country from './Country'

const Countries = ({ foundCountries }) => {

  if (foundCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (foundCountries.length === 1) {
    const country = foundCountries[0]
    return (
      <Country country={country}/>
    )
  }

  return (
    <>
      {foundCountries.map((country, i) => {
        return <div key={i}>{country.name.common}</div>
      })}
    </>
  )
}

export default Countries