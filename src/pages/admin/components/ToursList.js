function ToursList(props) {
  const { tours } = props

  return (
    <>
      <h2>Available Tours</h2>
      <ul>
        {tours.map((tour, index) => {
          const { name, price, street, city, postcode } = tour

          return (
            <li key={index}>
              <h3>{name}</h3>
              <p>{street}</p>
              <p>{city}</p>
              <p>{postcode}</p>
              <p>Price: £{price}</p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ToursList
