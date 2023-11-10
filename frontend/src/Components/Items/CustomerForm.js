import React, { useState } from 'react';
//import {useNavigate } from 'react-router-dom';


const CustomerForm = ({ onCloseForm, onAddCustomer }) => {
   // const Navigate = useNavigate();
    const [newCustomer, setNewCustomer] = useState({
      Cust_name: '',
      Address: '',
      City: '',
      State: '',
      Country: '',
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control the success message
    const [showErrorMesage,setShowErrorMessage]=useState(false);

    //const [dataInserted, setDataInserted]=useState(datainserted);
    const handleAddCustomer = () => {
      // Check if all fields are filled
      if (newCustomer.Cust_name && newCustomer.City && newCustomer.State) {
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
           onAddCustomer();
           //setDataInserted(true);
           onCloseForm();
            setShowSuccessMessage(true); // Show the success message
            setTimeout(() => {
              setShowSuccessMessage(false); // Hide the success message after 5 seconds
            }, 5000);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        // Handle validation or show an error message
        setShowErrorMessage(true);
        console.error('Invalid data. Please fill in all fields.');
      }
    };
  
  return (
    <div>
    {showErrorMesage && (
        <div className="alert alert-danger">
          Please fill in all fields.
        </div>
      )}
    <form className='form-horizontal' style={{padding: "10px"}}>
      <div className='form-group row' style={{padding: "10px"}}>
        <label htmlFor='custName' className='control-label col-sm-2'>
          Customer Name:
        </label>
        <div className='col-sm-4'>
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
      <div className='form-group row' style={{padding: "10px"}}>
        <label htmlFor='Address' className='control-label col-sm-2'>
          Address:
        </label>
        <div className='col-sm-4'>
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
      <div className='form-group row' style={{padding: "10px"}}>
        <label htmlFor='city' className='control-label col-sm-2'>
          City:
        </label>
        <div className='col-sm-4'>
          <input
            type='text'
            id='city'
            className='form-control'
            value={newCustomer.City}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, City: e.target.value })
            }
          />
        </div>
      </div>
      <div className='form-group row' style={{padding: "10px"}}>
        <label htmlFor='state' className='control-label col-sm-2'>
          State:
        </label>
        <div className='col-sm-4'>
          <input
            type='text'
            id='state'
            className='form-control'
            value={newCustomer.State}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, State: e.target.value })
            }
          />
        </div>
      </div>
      <div className='form-group row' style={{padding: "10px"}}>
        <label htmlFor='Country' className='control-label col-sm-2'>
          Country:
        </label>
        <div className='col-sm-4'>
          <input
            type='text'
            id='Country'
            className='form-control'
            value={newCustomer.Country}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, Country: e.target.value })
            }
          />
        </div>
      </div>
      <div className='form-group' style={{padding: "10px"}}>
        <div className='col-sm-offset-2 col-sm-10'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={handleAddCustomer}
          >
           Save
          </button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default CustomerForm;
