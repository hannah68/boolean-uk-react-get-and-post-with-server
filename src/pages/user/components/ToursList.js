import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {APIEndpoints} from '../../../config'

function ToursList() {
  const [tours, setTours] = useState([])

  console.log({ tours })

  useEffect(() => {
    fetch(APIEndpoints.tours)
      .then(res => res.json())
      .then(data => {
        setTours(data);
      })
  }, [])

  return (
    <ul>
      {tours.map((tour, index) => {
        const { name, price, postcode, city, street} = tour

        return (
          <li key={index}>
            <h3>{name}</h3>
            <p>{street}</p>
            <p>{city}</p>
            <p>{postcode}</p>
            <p>Price: £{price}</p>
            <Link to={`/tours/${tour.id}/book`} state={{ tour }}>
              Book Tour
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default ToursList
