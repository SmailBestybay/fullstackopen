import { useEffect, useState } from 'react'
import axios from 'axios'
import data from './components/data/data.json'
import Search from './components/Search'
import Countries from './components/Countries'

function App() {
  const [searchCountry, setSearchCountry] = useState('')
  const [allCountries, setAllCountries] = useState(null)
  const [foundCountries, setFoundCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setAllCountries(response.data))
      .catch(error => {
        setAllCountries(data)
      })
  }, [])

  const changeHandler = (country) => {
    setSearchCountry(country)
    const nextCountries = allCountries
      .filter((country) => country.name.common
        .toLowerCase()
        .includes(searchCountry.toLowerCase()))
    setFoundCountries(nextCountries);
  }

  if (allCountries === null) {
    return null
  }

  return (
    <>
      <Search searchCountry={searchCountry} changeHandler={changeHandler} />
      <Countries foundCountries={foundCountries} />
    </>
  )
}

export default App;
