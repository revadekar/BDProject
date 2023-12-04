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
   const[isNameValid,setIsNameValid]=useState(false);
   const[isAddressValid, setIsAddressValid]=useState(false);
   const [isWebsiteValid, setIsWebsiteValid] = useState(false);

   const [newCustomer, setNewCustomer] = useState({
      Cust_name: '',
      Address: '',
      City: '',
      State: '',
      Country: '',
      Website: 'https://',
    });
    //const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control the success message
   
    const handleValidation = () => {
      setShowErrorMessage(false);
    
      const nameRegex = /^[a-zA-Z ]+$/;
      const addressRegex = /^(?:[a-zA-Z][^a-zA-Z]*){5,}$/;
      const websiteRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,})([/\w .-]*)*\/?$/;

    
      const isNameValid = nameRegex.test(newCustomer.Cust_name);
      const isAddressValid = addressRegex.test(newCustomer.Address);
      const isWebsiteValid = websiteRegex.test(newCustomer.Website);
    
      setIsNameValid(isNameValid);
      setIsAddressValid(isAddressValid);
      setIsWebsiteValid(isWebsiteValid);
    
      if (!isNameValid) {
        setErrorMessage('*Name is not valid');
        return false;
      }
      if (!isAddressValid) {
        setErrorMessage('*Address is not valid');
        return false;
      }
      if (!isWebsiteValid) {
        setErrorMessage('*Website is not valid');
        return false;
      }
    
      return true; // All validations passed
    };
    
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
      if(!handleValidation()){
        return
      }

      if (isNameValid && isAddressValid && isWebsiteValid && newCustomer.City && newCustomer.State ) {
        setErrorMessage('');
        setShowErrorMessage(false);
        // Create a new customer object
        const customer = {
          Cust_name: newCustomer.Cust_name,
          Address: newCustomer.Address,
          City: newCustomer.City,
          State: newCustomer.State,
          Country: newCustomer.Country,
          Website: newCustomer.Website,
        };
  
        // Send a request to your server to add the new customer
        fetch('http://localhost:5000/addCustomer', {
          method: 'POST',
          headers: {
           'Content-Type': 'application/json',
               },
              body: JSON.stringify(customer),
                })
          .then((response) => {
           if (response.ok) {
           return response.json(); // Parse response body as JSON
             } else {
            throw new Error('Failed to add customer'); // Throw an error for failed request
           }
             })
            .then((data) => {
             // Handle the response data here
          setErrorMessage('');
            onAddCustomer();
           onCloseForm();
                // Perform further actions if needed
               })
           .catch((error) => {
           console.error('Error:', error);
           // Handle error: Show error message, perform rollback actions, etc.
            });
           } else {
        // Handle validation or show an error message
        setErrorMessage('');
        setShowErrorMessage(true);
        console.error('Invalid data. Please fill in all fields.');
      }
    };
  
  return (
    <div className='container-fluid userform' >

      <div className="d-flex justify-content-center align-items-center" >
        
    <div  className='card col-sm-6 form1 ' >
      <div className="d-flex justify-content-center align-items-center mb-3 ">
      <h3 className=''>Add Customer</h3>
      </div>
      {showErrorMesage && (
        <div className="error-message " >
            <p style={{color:"red"}}>*Please fill in all fields.</p>
        </div>
      )}
      {errorMessage &&(<p className='error-message'>{errorMessage}</p>)}
     
    <form className='form-horizontal' >
      <div className='form-group row col-sm-12 mb-3' >
        <label htmlFor='custName' className='control-label col-sm-4 '>
        <span className='text-danger'>*</span>
          Company Name:
        </label>
        
        <div className='col-sm-8'>
          <input
            type='text'
            id='custName'
            className='form-control'
            value={newCustomer.Cust_name}
            onChange={(e) =>{
              handleValidation();
              setNewCustomer({ ...newCustomer, Cust_name: e.target.value })
            }}
          />
        </div>
      </div>
      <div className='form-group row col-sm-12 mb-3' >
        <label htmlFor='Address' className='control-label col-sm-4'>
        <span className='text-danger '>*</span>
         Company Address:
        </label>
        <div className='col-sm-8'>
          <input
            type='text'
            id='Address'
            className='form-control'
            value={newCustomer.Address}
            onChange={(e) =>{
              handleValidation();
              setNewCustomer({ ...newCustomer, Address: e.target.value })
            }
             
            }
          />
        </div>
      </div>
      <div className='form-group row col-sm-12 mb-3' >
        <label htmlFor='Website' className='control-label col-sm-4'>
        <span className='text-danger'>*</span>
         Company Website:
        </label>
        <div className='col-sm-8'>
          <input
            type='text'
            id='Website'
            className='form-control'
            value={ `${newCustomer.Website}`}
            onChange={(e) =>{
              setNewCustomer({ ...newCustomer, Website: e.target.value })
            }
              
            }
          />
        </div>
      </div>
      <div className='form-group row col-sm-12 mb-3'>
        <label htmlFor='country' className='control-label col-sm-4'>
        <span className='text-danger'>*</span>
          Country:
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
        <span className='text-danger'>*</span>
          State:
        </label>
        <div className='col-sm-8'>
        <select
  id='state'
  className='form-select'
  value={newCustomer.State}
  onChange={(e) =>{
    setSelectedState(e.target.value);
    setNewCustomer({ ...newCustomer, State: e.target.value ,City: ''})
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
      <span className='text-danger'>*</span>
        City:
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
          <option disabled value='' >
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
   

  <div className='d-flex justify-content-center mb-3 form1'>
   
    <Button
      type='button'
      className='btn btn-primary flat-button'
      onClick={handleAddCustomer}
      style={{ marginRight: '1rem'}} 
    >
      Submit
    </Button>
    <Button
      type='button'
      className='btn btn-danger flat-button'
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
