import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
//import {useNavigate } from 'react-router-dom';


const CustomerForm = ({ onCloseForm, onAddCustomer }) => {
   // const Navigate = useNavigate();
   const [showErrorMesage,setShowErrorMessage]=useState(false);
   const[errorMessage,setErrorMessage]=useState('');
   const[selectedCountry,setSelectedCountry]=useState('');
   const[selectedState,setSelectedState]=useState('');
   const[states,setStates]=useState([]);
   const[cities,setCities]=useState([]);
   const[isNameValid,setIsNameValid]=useState(null);
   const[isAddressValid, setIsAddressValid]=useState(null);
   const [newCustomer, setNewCustomer] = useState({
      Cust_name: '',
      Address: '',
      City: '',
      State: '',
      Country: '',
    });
    //const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control the success message
   
const handleValidation=()=>{
  setShowErrorMessage(false);
  const nameRegex=/^[a-zA-Z ]+$/;
  const addressRegex = /^(?:[a-zA-Z][^a-zA-Z]*){5,}$/;
  setIsNameValid(nameRegex.test(newCustomer.Cust_name)) ;
  setIsAddressValid(addressRegex.test(newCustomer.Address));

}
    //const [dataInserted, setDataInserted]=useState(datainserted);
   const handleCancel=()=>{
    onCloseForm();
   };
   useEffect(()=>{
     console.log(states);
   },[states])

   useEffect(() => {
    // Fetch cities based on selected state
    if (selectedState) {
      const state_name=selectedState;
      fetch('http://localhost:5000/getCities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state_name }),
      })
        .then((response) => response.json())
        .then((data) => {
          setCities(data);
        })
        .catch((error) => {
          console.error('Error fetching cities:', error);
        });
    }
  }, [selectedState]);

   useEffect(()=>{
    const country_name=selectedCountry;
    fetch('http://localhost:5000/getStates',{
      method:'Post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({country_name}),
    })
    .then((response) => response.json())
    .then((data) => {setStates(data)})
    .catch((error)=>{
      console.error('Error:', error);
    })
   },[selectedCountry])
    const handleAddCustomer = () => {
      handleValidation();
      // Check if all fields are filled
      if(!isNameValid){
        setErrorMessage('Name is not valid');
        return;
      }
      if(!isAddressValid){
        setErrorMessage('Address is not valid');
        return;
      }

      if (isNameValid && isAddressValid && newCustomer.City && newCustomer.State) {
        // Create a new customer object
        const customer = {
          Cust_name: newCustomer.Cust_name,
          Address: newCustomer.Address,
          City: newCustomer.City,
          State: newCustomer.State,
          Country: newCustomer.Country,
        };
  
        // Send a request to your server to add the new customer
        fetch('http://localhost:5000/addCustomer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(customer),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from your server, you can update your state or perform any necessary actions
            // For example, you can call `onAddCustomer` to add the new customer to your state
            setErrorMessage('');
           onAddCustomer();
           //setDataInserted(true);
           onCloseForm();
            // setShowSuccessMessage(true); // Show the success message
            // setTimeout(() => {
            //   setShowSuccessMessage(false); // Hide the success message after 5 seconds
            // }, 5000);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        // Handle validation or show an error message
        setErrorMessage('');
        setShowErrorMessage(true);
        console.error('Invalid data. Please fill in all fields.');
      }
    };
  
  return (
    <div className='container-fluid userform' style={{color:"black", padding:"10px"}}>
      {(!isNameValid || !isAddressValid) &&(<p className='error-message'>{errorMessage}</p>)}
    {showErrorMesage && (
        <div className="d-flex justify-content-center align-items-center">
            <p style={{color:"red"}}>Please fill in all fields.</p>
        </div>
      )}

      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh'}}>
        
    <div  className='card col-sm-6 form1 ' style={{padding:"2rem"}}>
      <div className="d-flex justify-content-center align-items-center mb-3">
      <h3>Add Customer</h3>
      </div>

    <form className='form-horizontal' style={{ fontFamily:"serif", fontWeight:"bold"}}>
      <div className='form-group row col-sm-12 mb-3' >
        <label htmlFor='custName' className='control-label col-sm-4 '>
          Customer Name:
          <span className='text-danger'>*</span>
        </label>
        
        <div className='col-sm-8'>
          <input
            type='text'
            id='custName'
            className='form-control'
            value={newCustomer.Cust_name}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, Cust_name: e.target.value })
            }
          />
        </div>
      </div>
      <div className='form-group row col-sm-12 mb-3' >
        <label htmlFor='Address' className='control-label col-sm-4'>
          Address:
          <span className='text-danger'>*</span>
        </label>
        <div className='col-sm-8'>
          <input
            type='text'
            id='Address'
            className='form-control'
            value={newCustomer.Address}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, Address: e.target.value })
            }
          />
        </div>
      </div>
      <div className='form-group row col-sm-12 mb-3'>
        <label htmlFor='country' className='control-label col-sm-4'>
          Country:
          <span className='text-danger'>*</span>
        </label>
        <div className='col-sm-8'>
        <select
           id='country'
           className='form-select'
           value={newCustomer.Country}
           onChange={(e) => {
          setSelectedCountry(e.target.value);
          setNewCustomer({ ...newCustomer, Country: e.target.value });
          }}
          >
  <option disabled value=''>Select Country</option>
  <option value='India'>India</option>
</select>

        </div>
      </div>
      <div className='form-group row col-sm-12 mb-3' >
        <label htmlFor='state' className='control-label col-sm-4'>
          State:
          <span className='text-danger'>*</span>
        </label>
        <div className='col-sm-8'>
        <select
  id='state'
  className='form-select'
  value={newCustomer.State}
  onChange={(e) =>{
    setSelectedState(e.target.value);
    setNewCustomer({ ...newCustomer, State: e.target.value })
  }}
>
  <option disabled value=''>Select State</option>
  {states.map((state) => (
    <option key={state.id} value={state.name}>
      {state.name}
    </option>
  ))}
</select>


        </div>
      </div>
      <div className='form-group row col-sm-12 mb-4'>
      <label htmlFor='city' className='control-label col-sm-4'>
        City:
        <span className='text-danger'>*</span>
      </label>
      <div className='col-sm-8'>
        <select
          id='city'
          className='form-select'
          value={newCustomer.City}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, City: e.target.value })
          }
        >
          <option disabled value=''>
            Select City
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
   

  <div className='d-flex justify-content-center mb-3'>
   
    <Button
    size='sm'
      type='button'
      className='btn btn-dark'
      onClick={handleAddCustomer}
      style={{ marginRight: '1rem'}} 
    >
      Save
    </Button>
    <Button
    size='sm'
      type='button'
      className='btn btn-danger '
      onClick={handleCancel}
    >
      Cancel
    </Button>
  </div>
    </form>
    </div>
    </div>
    </div>
  );
};

export default CustomerForm;
