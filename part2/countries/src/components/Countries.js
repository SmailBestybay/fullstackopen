const Countries = ({ countriesToShow, setCountriesToShow }) => {
  if (countriesToShow === 1) return null
  return (
    <>
      {countriesToShow.map((country, i) => {
        return (
          <div key={i}>
            {country.name.common}
            <button onClick={() => setCountriesToShow([country])}>show</button>
          </div>
          )
      })}
    </>
  )
}

export default Countries