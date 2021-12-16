import { useEffect, useState } from "react"
import { useLocation} from "react-router";
import {useNavigate} from 'react-router';
import {APIEndpoints} from '../../../config';

function BookTicket() {
  const [tour, setTour] = useState(null);
  const [submitted, setsubmitted] = useState(false);
  const [ticketInfo, setTicketInfo] = useState({
    email: '',
    quantity: '',
    date: '',
    tourId: null,
  });


  // =================
  const location = useLocation();
  const navigate = useNavigate();
  // =================

  useEffect(() => {
    if(location.state){
      const {tour} = location.state;
      setTour(tour)
    }
  }, [location])

  useEffect(() => {
    const postDataToTickets = async () => {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...ticketInfo, tourId: tour.id }),
      }
      await fetch(APIEndpoints.tickets, requestOptions);
      navigate('/tickets');
    }

    if(submitted){
      postDataToTickets()
    }
  }, [navigate, submitted, ticketInfo])
  

  // handle submit===================
  const handleSubmit = (event) => {
    event.preventDefault();
    setsubmitted(true)
  }

  // handle change===================
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    setTicketInfo({
      ...ticketInfo, 
      [name] : value
    })
  }


  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="email"
        name="email"
        value={ticketInfo.email}
        onChange={handleChange}
      />
      <input 
        type="number" 
        name="quantity"
        value={ticketInfo.quantity}
        onChange={handleChange}
      />
      <input 
        type="date"
        name="date"
        value={ticketInfo.date}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  )
  
}

export default BookTicket
