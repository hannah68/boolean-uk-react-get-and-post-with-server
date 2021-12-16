import { useState, useEffect } from "react"
import { Route, Routes } from "react-router"
import { Link } from "react-router-dom"
import CreateTourPage from "./tours/CreateTour"
import Dashboard from "./Dashboard"
import TicketsSummary from "./tickets/Summary"

import {LocalRoutes, APIEndpoints} from '../../config'

function AdminRouter() {
  const [tours, setTours] = useState([])


  useEffect(() => {
    fetch(APIEndpoints.tours)
      .then(res => res.json())
      .then(data => {
        setTours(data);
      })
  }, [])

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/admin/">Admin Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/tours/create">Create a Tour</Link>
            </li>
            <li>
              <Link to="/admin/tickets/summary">Tickets Summary</Link>
            </li>
            <li>
              <Link to={LocalRoutes.home}>User Pages</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route 
        path="/" 
        element={<Dashboard 
          tours={tours} />} 
        />
        <Route
          path="/tours/create"
          element={<CreateTourPage 
            tours={tours} 
            setTours={setTours} />}
        />
        <Route 
        path="tickets/summary" 
        element={<TicketsSummary />} />
      </Routes>
    </>
  )
}

export default AdminRouter
