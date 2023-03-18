const Country = ({country, weatherData}) => {
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
          {
            weatherData === null
              ? null
              : (
                <>
                  <h2>Weather in {country.capital}</h2>
                  <p>temperature {weatherData.main.temp} Celicius</p>
                  <img 
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description} />
                  <p>wind {weatherData.wind.speed} m/s</p>
                </>
              )
          }
          
      </div>
  )
}

export default Country