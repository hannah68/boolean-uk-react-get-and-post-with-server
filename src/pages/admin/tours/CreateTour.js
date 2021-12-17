import { useState } from "react"
import {useNavigate} from 'react-router';
import {LocalRoutes, APIEndpoints} from '../../../config';

function CreateTourPage(props) {
  const { tours, setTours } = props
  const [address, setAddress] = useState({
    street: '',
    city: '',
    postcode: ''
  });

  const [tourToCreate, setTourToCreate] = useState({
    name: "",
    price: 0,
    addressId: null
  })

  const navigate = useNavigate();

  // handle submit=======================
  function handleSubmit(event) {
    event.preventDefault()
    postTourAndAddress()
    setTours([...tours, tourToCreate])
    navigate(LocalRoutes.home);
  }

  // =============================

  const postTourAndAddress = async () => {
    try{
      // post tour ========
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...tourToCreate, addressId: tours.length+1})
      };
      const tourInfoRes = await fetch(APIEndpoints.tours, requestOptions);
      const tourInfoData = await tourInfoRes.json();
      console.log('tourInfoData',tourInfoData);
      // post Address ==========
      const addressOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(address)
      };
      const addressRes = await fetch(APIEndpoints.address, addressOptions);
      const addressData = await addressRes.json();
      console.log('addressData', addressData);
    }
    catch(error){
      console.log('error', error);
    }
  }
  
 
  //handle change ========================
  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    setTourToCreate({...tourToCreate, [name]: value })
  }

  //handle change address========================
  function handleChangeAddress(event) {
    const name = event.target.name
    const value = event.target.value
    setAddress({...address, [name]: value })
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
        onChange={handleChangeAddress}
        value={tourToCreate.street}
      />
      <label htmlFor="price">city</label>
      <input
        type="text"
        id="city"
        name="city"
        onChange={handleChangeAddress}
        value={tourToCreate.city}
      />
      <label htmlFor="price">postcode</label>
      <input
        type="text"
        id="postcode"
        name="postcode"
        onChange={handleChangeAddress}
        value={tourToCreate.postcode}
      />
      <button type="submit">Create Tour</button>
    </form>
  )
}

export default CreateTourPage
