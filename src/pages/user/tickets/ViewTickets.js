import { useEffect} from "react"
import {APIEndpoints} from '../../../config'
import { useState } from "react"

function ViewTickets(props) {
  const [tickets, setTickets] = useState([])


  useEffect(() => {
    fetch('http://localhost:3030/tickets',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    
    
      .then(res => {
        let response = JSON.stringify(res)
        res = JSON.parse(response)
      })
      .then(data => {
        setTickets(data);
      })
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
