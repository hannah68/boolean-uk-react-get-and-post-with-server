import { Route, Routes } from "react-router"
import { Link } from "react-router-dom"
import HomePage from "./Home"
import BookTicket from "./tickets/BookTicket"
import ViewTickets from "./tickets/ViewTickets"
import { useState } from "react"

function UserRouter() {
  const [tickets, setTickets] = useState([])
  const [tour, setTour] = useState([]);
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tickets">Tickets</Link>
            </li>
            <li>
              <Link to="/admin">Admin Pages</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage />} 
        />
        <Route 
          path="/tours/:id/book" 
          element={<BookTicket 
          tickets={tickets} 
          setTickets={setTickets}
          tour={tour}
          setTour={setTour}
          />} 
        />
        <Route 
          path="/tickets" 
          element={<ViewTickets 
          tickets={tickets} 
          setTickets={setTickets}
          tour={tour}
          setTour={setTour}
        />} />
      </Routes>
    </>
  )
}

export default UserRouter
