import { useEffect} from "react"
import {APIEndpoints} from '../../../config'
import { useState } from "react"

function ViewTickets() {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(APIEndpoints.tickets);
        const data = await res.json();
        setTickets(data);
      }
      catch(error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  
  
  return (
    <ul>
      {tickets.map((ticket, index) => {
        const { email, quantity, date, tour} = ticket
        console.log(ticket);
        return (
          <li key={index}>
            <h3>{tour.name}</h3>
            <p>Email: {email}</p>
            <p>Quantity: {quantity}</p>
            <p>Date: {date}</p>
          </li>
        )
      })}
    </ul>
  )
}

export default ViewTickets
