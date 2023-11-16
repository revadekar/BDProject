import React, { useState,useEffect } from "react";
import { Button } from "baseui/button";

const EditContactDetails = ({onCloseForm, onEditContact, editingContact}) => {
  const[showErrorMessage,setShowErrorMessage]=useState(false);
  const[customerData,setCustomerData]=useState([]);
  const [newContact, setNewContact] = useState(editingContact);
useEffect(()=>{
fetch('http://localhost:5000/getCustomers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      })
        .then((response) => response.json())
        .then((data) => { 
          setCustomerData(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
},[])
const handleCancel=()=>{
  onCloseForm();
  setShowErrorMessage(false);
 };
const handleEditContact = () => {
      
    // Check if all fields are filled
      if (newContact.contact_person && newContact.Email_id && newContact.Designation && newContact.Mobile ) {
        // Create a new customer object
        const contact = {
          contact_id:newContact.contact_id,
          contact_person: newContact.contact_person,
          Designation: newContact.Designation,
          Email_id: newContact.Email_id,
          Mobile: newContact.Mobile,
          Landline: newContact.Landline,
          Fax: newContact.Fax
        };
  
        // Send a request to your server to add the new customer
        fetch('http://localhost:5000/editContact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contact),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from your server, you can update your state or perform any necessary actions
            // For example, you can call `onAddCustomer` to add the new customer to your state
           //onAddCustomer();
           //setDataInserted(true);
          // onCloseForm();
           setShowErrorMessage(false);
            onCloseForm();
            onEditContact();
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
    <>
     <div className='container-fluid' style={{color:"black", margin:"10px"}}>
        <h4>Edit Contact</h4>
        {showErrorMessage && (
        <div className="d-flex justify-content-center align-items-center">
            <p style={{color:"red"}}>Name,Email, Designation and Mobile No is required</p>
        </div>
        )}
        
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh'}}>
        
        <div  className='card col-sm-6' style={{paddingLeft:"1vw"}}>
        <form className='form-horizontal' style={{padding: "10px", fontFamily:"serif", fontWeight:"bold"}}>
        <div className='form-group row' style={{ padding: '10px' }}>
        <label htmlFor='Customer' className='control-label col-sm-4'>
        Customer Name:
        <span className='text-danger'>*</span>
        </label>
        <div className='col-sm-8'>
        <div className='dropdown'>
        <select
            id='Customer'
            className='form-control dropdown-toggle'
            value={newContact.Customer}
            onChange={(e) => setNewContact({ ...newContact, Customer: e.target.value })}
            disabled
          >
            <option >{ editingContact.Cust_name} </option>
            {customerData.map((customer, index) => (
              <option key={index} value={customer.Cust_name}>{customer.Cust_name}</option>
            ))}
          </select>
        </div>
        </div>
        </div>
        <div className='form-group row' style={{padding: "10px"}}>
        <label htmlFor='Name' className='control-label col-sm-4'>
        Contact Person Name:
        <span className='text-danger'>*</span>
        </label>
        <div className='col-sm-8'>
          <input
            type='text'
            id='Name'
            className='form-control'
            value={newContact.contact_person}
            onChange={(e) =>
                setNewContact({ ...newContact, contact_person: e.target.value })
            }
          />
        </div>
        </div>
        <div className='form-group row' style={{padding: "10px"}}>
        <label htmlFor='Designation' className='control-label col-sm-4'>
        Designation:
        <span className='text-danger'>*</span>
        </label>
        <div className='col-sm-8'>
          <input
            type='text'
            id='Designation'
            className='form-control'
            value={newContact.Designation}
            onChange={(e) =>
                setNewContact({ ...newContact, Designation: e.target.value })
            }
          />
        </div>
        </div>
        <div className='form-group row' style={{ padding: '10px' }}>
        <label htmlFor='Email' className='control-label col-sm-4'>
        Email:
        <span className='text-danger'>*</span>
        </label>
        <div className='col-sm-8'>
        <div>
        <input
        type='text'
        id='Email'
        className='form-control'
        value={newContact.Email_id}
        onChange={(e) =>
          setNewContact({ ...newContact, Email_id: e.target.value })
        }
        />
        </div>
        </div>
        </div>
        
        <div className='form-group row' style={{padding: "10px"}}>
        <label htmlFor='Mobile' className='control-label col-sm-4'>
          Mobile:
          <span className='text-danger'>*</span>
        </label>
        <div className='col-sm-8'>
          <input
            type='text'
            id='Mobile'
            className='form-control'
            value={newContact.Mobile}
            onChange={(e) =>
                setNewContact({ ...newContact, Mobile: e.target.value })
            }
          />
        </div>
        </div>
        
        <div className='form-group row' style={{padding: "10px"}}>
        <label htmlFor='Landline' className='control-label col-sm-4'>
          Landline:
        </label>
        <div className='col-sm-8'>
          <input
            type='text'
            id='Landline'
            className='form-control'
            value={newContact.Landline}
            onChange={(e) =>
                setNewContact({ ...newContact, Landline: e.target.value })
            }
          />
        </div>
        </div>
        <div className='form-group row' style={{padding: "10px"}}>
        <label htmlFor='Fax' className='control-label col-sm-4'>
          Fax:
        </label>
        <div className='col-sm-8'>
          <input
            type='text'
            id='Fax'
            className='form-control'
            value={newContact.Fax}
            onChange={(e) =>
                setNewContact({ ...newContact, Fax: e.target.value })
            }
          />
        </div>
        </div>
        <div className='form-group row' style={{ padding: "10px" }}>
        <div className='col-sm-offset-2 col-sm-12'>
        <Button
        size='compact'
        type='button'
        style={{backgroundColor:"darkred"}}
        onClick={handleCancel}
        >
        Cancel
        </Button>
        <Button
        size='compact'
        type='button'
        style={{ marginLeft:"10px", backgroundColor:"darkslategray"}}
        onClick={handleEditContact}
        >
        Save
        </Button>
        </div>
        </div>
        </form>
        </div>
        </div>
        </div>
    </>
  );
};

export default EditContactDetails;
