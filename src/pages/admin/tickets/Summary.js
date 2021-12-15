import { useState, useEffect} from "react"
import TicketsTable from "./components/TicketsTable"
import {APIEndpoints} from '../../../config'

function TicketsSummary() {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    fetch(APIEndpoints.tickets)
      .then(res => res.json())
      .then(data => {
        setTickets(data);
      })
  }, [])

  return (
    <main>
      <h1>Tickets Summary</h1>
      <TicketsTable tickets={tickets} />
    </main>
  )
}

export default TicketsSummary
