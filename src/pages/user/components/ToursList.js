import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {APIEndpoints} from '../../../config'

function ToursList() {
  const [tours, setTours] = useState([]);
  const [address, setAddress] = useState([]);

  console.log({ tours, address })

  useEffect(() => {
    fetch(APIEndpoints.tours)
      .then(res => res.json())
      .then(data => {
        setTours(data);
      })
  }, []);

  useEffect(() => {
    fetch(APIEndpoints.address)
      .then(res => res.json())
      .then(data => {
        setAddress(data);
      })
  }, [tours]);

  const ifToursAndAddress = (address.length > 0 && tours.length > 0)

  return (
    <>
      { ifToursAndAddress && (
        <ul>
      {tours.map((tour, index) => {
        const { name, price} = tour

        return (
          <li key={index}>
            <h3>{name}</h3>
            <p>{address.length > 0 && address[index].street}</p>
            <p>{address.length > 0 && address[index].city}</p>
            <p>{address.length > 0 && address[index].postcode}</p>
            <p>Price: £{price}</p>
            <Link to={`/tours/${tour.id}/book`} state={{ tour }}>
              Book Tour
            </Link>
          </li>
          )
      })}
      </ul>
      )}
    </>
  )
}

export default ToursList
