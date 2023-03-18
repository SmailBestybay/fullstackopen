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
  const [singleCountry, setSingleCountry] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setAllCountries(response.data))
      .catch(() => {
        setAllCountries(fallbackData)
      })
  }, [])

  useEffect(()=> {
    if (singleCountry !== null) {
      const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
      axios
        .get(`${baseUrl}lat=${singleCountry.latlng[0]}&lon=${singleCountry.latlng[1]}&appid=${api_key}&units=metric`)
        .then(response => setWeatherData(response.data))
    }
  },[singleCountry])

  const searchHandler = (countries) => {
    setSearchCountry(countries)
    const nextCountries = allCountries
      .filter(country => country.name.common
        .toLowerCase()
        .includes(searchCountry.toLowerCase()))
    setCountriesToShow(nextCountries);
    if (nextCountries.length === 1) {
      setSingleCountry(nextCountries[0])
    }
  }

  if (allCountries === null) {
    return null
  }

  return (
    <>
      <Search searchCountry={searchCountry} searchHandler={searchHandler} />
      {
        countriesToShow.length > 10 
          ? (<div>Too many matches, specify another filter</div>) 
          : null
      }
      {
        countriesToShow.length === 1
          ? (<Country country={singleCountry} weatherData={weatherData}/>)
          : null
      }
      {
        (countriesToShow.length <= 10 && countriesToShow.length > 1)
          ? (<Countries 
              countriesToShow={countriesToShow} 
              setCountriesToShow={setCountriesToShow} 
              setSingleCountry={setSingleCountry}
            />)
          : null
      }
    </>
  )
}

export default App;
