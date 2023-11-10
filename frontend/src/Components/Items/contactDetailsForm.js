import React, { useState } from 'react';
//import {useNavigate } from 'react-router-dom';


const ContactDetailsForm = ({ onCloseForm, onAddCustomer }) => {
   // const Navigate = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control the success message
    const [showErrorMesage,setShowErrorMessage]=useState(false);
    const [showContactForm, setShowContactForm]=useState(false);
    const [newContact, setNewContact] = useState({
      Name: '',
      Designation: '',
      Email: '',
      Mobile: '',
      Landline: '',
      Fax: '',
      Cust_id: ''
    });

    //const [dataInserted, setDataInserted]=useState(datainserted);
   const handleCancel=()=>{
    setShowContactForm(false);
    setShowErrorMessage(false);
   };
    const handleAddContact = () => {
      // Check if all fields are filled
      if (newContact.Name && newContact.Email && newContact.Designation && newContact.Mobile && newContact.Cust_id) {
        // Create a new customer object
        const contact = {
          contact_person: newContact.Name,
          Designation: newContact.Designation,
          Email_id: newContact.Email,
          Mobile: newContact.Mobile,
          Cust_id: newContact.Cust_id,
          Landline: newContact.Landline,
          Fax: newContact.Fax
        };
  
        // Send a request to your server to add the new customer
        fetch('http://localhost:5000/addContact', {
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
           onAddCustomer();
           //setDataInserted(true);
           onCloseForm();
           setShowErrorMessage(false);
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
<>
    <div style={{ marginLeft: "60vw", padding:"10px"}}>
        <button className='btn btn-primary' onClick={() => setShowContactForm(true)} >Add Contact Details</button>
      </div>
    {showContactForm && (
    <div className='container-fluid' style={{color:"black", margin:"10px"}}>
        <h2>Add Contact</h2>
    {showErrorMesage && (
        <div className="d-flex justify-content-center align-items-center">
            <p style={{color:"red"}}>Name,Email, Designation and Mobile No is mandatory</p>
        </div>
      )}

{showSuccessMessage && (
        <div className="d-flex justify-content-center align-items-center">
        <div className="alert alert-success" style={{paddingTop:"10px", paddingBottom:"10px", paddingLeft:"50px",paddingRight:"50px", width:"max-content"}}>
         Contact details added successfully.
        </div>
        </div>
      )}
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh'}}>
        
      <div  className='card col-sm-6' style={{paddingLeft:"1vw"}}>
    <form className='form-horizontal' style={{padding: "10px", fontFamily:"serif", fontWeight:"bold"}}>
      <div className='form-group row' style={{padding: "10px"}}>
        <label htmlFor='Name' className='control-label col-sm-4'>
          Name:
        </label>
        <div className='col-sm-8'>
          <input
            type='text'
            id='Name'
            className='form-control'
            value={newContact.Name}
            onChange={(e) =>
              setNewContact({ ...newContact, Name: e.target.value })
            }
          />
        </div>
      </div>
      <div className='form-group row' style={{padding: "10px"}}>
        <label htmlFor='Designation' className='control-label col-sm-4'>
        Designation:
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
      <div className='form-group row' style={{padding: "10px"}}>
        <label htmlFor='Email' className='control-label col-sm-4'>
          Email:
        </label>
        <div className='col-sm-8'>
          <input
            type='text'
            id='Email'
            className='form-control'
            value={newContact.Email}
            onChange={(e) =>
                setNewContact({ ...newContact, Email: e.target.value })
            }
          />
        </div>
      </div>
      <div className='form-group row' style={{padding: "10px"}}>
        <label htmlFor='Mobile' className='control-label col-sm-4'>
          Mobile:
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
    <button
      type='button'
      className='btn btn-danger'
      style={{ marginRight: '10px' }} 
      onClick={handleCancel}
    >
      Cancel
    </button>
    <button
      type='button'
      className='btn btn-primary '
      onClick={handleAddContact}
    >
      Save
    </button>
  </div>
</div>
    </form>
    </div>
    </div>
    </div>
    
    )}
</>
  );
};

export default ContactDetailsForm;
