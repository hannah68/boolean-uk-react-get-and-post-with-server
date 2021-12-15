import { useEffect, useState } from "react"
import { useLocation} from "react-router";
import {useNavigate} from 'react-router';
import {APIEndpoints} from '../../../config';

function BookTicket(props) {
  const [tickets, setTickets] = useState([])
  const [tour, setTour] = useState([]);
  // const {tour, setTour} = props
  const [submitted, setsubmitted] = useState(false);
  const [ticketInfo, setTicketInfo] = useState({
    email: '',
    quantity: '',
    date: '',
    tourId: '',
  });

  console.log('tickets',tickets);
  console.log('tour',tour);
  console.log('submitted',submitted);
  console.log('ticketInfo',ticketInfo);

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
    fetch(APIEndpoints.tickets)
      .then(res => res.json())
      .then(data => {
        setTickets(data);
      })
  }, [])

  useEffect(() => {
    if(submitted){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketInfo)
      };
  
      fetch(APIEndpoints.tickets, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log('data', data);
            setTickets([...tickets, data]);
            setTour([tour, ...[...tickets ,ticketInfo]])
            // navigate('/tickets');
          })
          .catch(error => console.log('error', error))
    }
  }, [navigate, setTickets, submitted, ticketInfo])

  console.log(ticketInfo);

  // handle submit===================
  const handleSubmit = (event) => {
    event.preventDefault();
    setsubmitted(true);
  }

  // handle change===================
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    setTicketInfo({
      ...ticketInfo, 
      [name] : value, 
      tourId: tour.id,
    })
  }


  return (
    <form onSubmit={handleSubmit}>
      <h3>{tour.name}</h3>
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
