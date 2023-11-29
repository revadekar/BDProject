import React, { useState,useEffect } from "react";
import { Button } from "react-bootstrap";
import '../assets/popCss.css'

const EditContactDetails = ({onCloseForm, onEditContact, editingContact}) => {
  const[showErrorMessage,setShowErrorMessage]=useState(false);
  const[customerData,setCustomerData]=useState([]);
  const [newContact, setNewContact] = useState(editingContact);
  const [nameValid, setNameValid] = useState(false);
  const [designationValid, setDesignationValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [mobileValid, setMobileValid] = useState(false);

  
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


useEffect(()=>{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const designationRegex= /^[a-zA-Z ]+$/;
  const nameRegex=/^[a-zA-Z ]+$/;
  const mobileRegex=/^\d{10}$/;
  // Validate each required field
  setNameValid(nameRegex.test(newContact.contact_person));
  setDesignationValid(designationRegex.test(newContact.Designation));
  setEmailValid(emailRegex.test(newContact.Email_id));
  setMobileValid(newContact.Mobile && mobileRegex.test(newContact.Mobile));
},[newContact])

const handleEditContact = () => {
      
    // Check if all fields are filled
      if (
      nameValid &&
      designationValid &&
      emailValid &&
      mobileValid ) {
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
     <div className='container-fluid userform' style={{color:"black", margin:"10px"}}>
        {showErrorMessage && (
        <div className="d-flex justify-content-center align-items-center">
            <p style={{color:"red"}}>Name,Email, Designation and Mobile No is required</p>
        </div>
        )}
        
        <div className="d-flex justify-content-center align-items-center" >
        
        <div  className='card col-sm-5 form1' >
          <div className="d-flex justify-content-center mb-3">
          <h4>Edit Contact</h4>
          </div>

        <form className='form-horizontal' style={{fontFamily:"serif", fontWeight:"bold"}}>
        <div className='form-group row mb-3' >
        <label htmlFor='Customer' className='control-label col-sm-4 '>
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
        <div className='form-group row mb-3' >
        <label htmlFor='Name' className='control-label col-sm-4 '>
        Contact Person Name:
        <span className='text-danger'>*</span>
        </label>
        <div className='col-sm-8 input'>
          <input
            type='text'
            id='Name'
            className='form-control '
            value={newContact.contact_person}
            onChange={(e) =>
                setNewContact({ ...newContact, contact_person: e.target.value })
            }
          /> {!nameValid && (
            <div className="d-flex justify-content-center align-items-center">
             <p className="error-message" style={{marginLeft:"0rem"}}>Name is required and must be valid</p>
            </div>
          )}
        </div>
        </div>
        <div className='form-group row mb-3' >
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
          /> {!designationValid && (
            <div className="d-flex justify-content-center align-items-center">
             <p className="error-message" style={{marginLeft:"0rem"}}>Designation is required and must be valid</p>
            </div>
          )}
        </div>
        </div>
        <div className='form-group row mb-3' >
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
        {!emailValid && (
  <div className="d-flex justify-content-center align-items-center">
   <p className="error-message" style={{marginLeft:"0rem"}}>Email is required and must be valid</p>
  </div>
)}
        </div>
        </div>
        
        </div>
        <div className='form-group row mb-3' >
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
          {!mobileValid && 
              <p className="error-message" style={{marginLeft:"1rem"}}>
              Invalid mobile number. Please enter 10 digits.
            </p>
             }
        </div>
        
                
        </div>
        
        <div className='form-group row mb-3' >
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
        <div className='form-group row mb-3' >
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
        <div className='d-flex justify-content-center' >
        <Button
        size='sm'
        type='button'
        onClick={handleEditContact}
        >
        Save
        </Button>
        <Button
        className="btn btn-danger"
        size='sm'
        type='button'
        style={{marginLeft:"1rem"}}
        onClick={handleCancel}
        >
        Cancel
        </Button>
        </div>
        </form>
        </div>
        </div>
        </div>
    </>
  );
};

export default EditContactDetails;
