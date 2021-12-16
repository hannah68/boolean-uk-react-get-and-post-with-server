import { useState, useEffect } from "react"
import {useNavigate} from 'react-router';
import {LocalRoutes, APIEndpoints} from '../../../config';

function CreateTourPage(props) {
  const { tours, setTours } = props
  const [submitted, setsubmitted] = useState(false);

  const [tourToCreate, setTourToCreate] = useState({
    name: "",
    price: 0,
    street: '',
    city: '',
    postcode: ''
  })

  const navigate = useNavigate();

  useEffect(() => {
    if(submitted){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tourToCreate)
      };
  
      fetch(APIEndpoints.tours, requestOptions)
          .then(response => response.json())
          .then(data => {
            setTours([...tours, data]);
            navigate(LocalRoutes.home);
          })
          .catch(error => console.log('error', error));
          setsubmitted(false);
    }
  }, [tours, submitted, setTours, tourToCreate, navigate])
 

  function handleSubmit(event) {
    event.preventDefault()
    setsubmitted(true);
  }

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    setTourToCreate({ ...tourToCreate, [name]: value })
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit}>
      <h2>Create a Tour</h2>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
        value={tourToCreate.name}
      />
      <label htmlFor="price">price</label>
      <input
        type="text"
        id="price"
        name="price"
        onChange={handleChange}
        value={tourToCreate.price}
      />
      <label htmlFor="price">street</label>
      <input
        type="text"
        id="street"
        name="street"
        onChange={handleChange}
        value={tourToCreate.street}
      />
      <label htmlFor="price">city</label>
      <input
        type="text"
        id="city"
        name="city"
        onChange={handleChange}
        value={tourToCreate.city}
      />
      <label htmlFor="price">postcode</label>
      <input
        type="text"
        id="postcode"
        name="postcode"
        onChange={handleChange}
        value={tourToCreate.postcode}
      />
      <button type="submit">Create Tour</button>
    </form>
  )
}

export default CreateTourPage
