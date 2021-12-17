function ToursList(props) {
  const { tours } = props

  return (
    <>
      <h2>Available Tours</h2>
      <ul>
        {tours.map((tour, index) => {
          const { name, price } = tour

          return (
            <li key={index}>
              <h3>{name}</h3>
              <p>Price: £{price}</p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ToursList
