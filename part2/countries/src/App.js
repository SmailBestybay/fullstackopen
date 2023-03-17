import { useEffect, useState } from 'react'
import axios from 'axios'
import fallbackData from './components/data/fallbackData.json'
import Search from './components/Search'
import Countries from './components/Countries'
import Country from './components/Country'

function App() {
  const [searchCountry, setSearchCountry] = useState('')
  const [allCountries, setAllCountries] = useState(null)
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setAllCountries(response.data))
      .catch(() => {
        setAllCountries(fallbackData)
      })
  }, [])

  const searchHandler = (country) => {
    setSearchCountry(country)
    const nextCountries = allCountries
      .filter((country) => country.name.common
        .toLowerCase()
        .includes(searchCountry.toLowerCase()))
    setCountriesToShow(nextCountries);
  }

  if (allCountries === null) {
    return null
  }

  if (countriesToShow.length > 10) {
    return (
      <>
        <Search searchCountry={searchCountry} searchHandler={searchHandler} />
        <div>Too many matches, specify another filter</div>
      </>
    )
  }

  if (countriesToShow.length === 1) {
    const country = countriesToShow[0]
    return (
      <>
        <Search searchCountry={searchCountry} searchHandler={searchHandler} />
        <Country country={country}/>
      </>
    )
  }

  return (
    <>
      <Search searchCountry={searchCountry} searchHandler={searchHandler} />
      <Countries 
        countriesToShow={countriesToShow} 
        setCountriesToShow={setCountriesToShow} 
      />
    </>
  )
}

export default App;
