import { Button } from 'baseui/button';
import React, { useCallback, useEffect, useState } from 'react';
import ContactDetailsForm from './AddContactDetails';
import EditContactDetails from './EditContactDetails';
import { FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa';
//import {useNavigate } from 'react-router-dom';

const ContactDetails = () => {
   // const Navigate = useNavigate();
   const[showServerError,setShowServerError]=useState(false);
   const[showErrorMessage,setShowErrorMessage]=useState(false);
    const [showAddContactForm, setShowAddContactForm]=useState(false);
    const [showEditContactForm, setShowEditContactForm]=useState(false);
    const [customerData,setCustomerData]=useState([]);
    const [contactDetails, setContactDetails] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState('');
      // State to store the details of the contact being edited
    const [editingContact, setEditingContact] = useState(null);
    const[dataUpdated,setDataUpdated]=useState(false);
    const[dataDeleted,setDataDeleted]=useState(false);
    //const[deletingContact,setDeletingContact]=useState(null);

   // Function to handle the edit button click
   const handleEditClick = (contact) => {
    setEditingContact(contact);
    setShowEditContactForm(!showEditContactForm);
   // setButtonClicked(false);
  };
  const handleDeleteClick = (contact) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this contact?');

    if (confirmDelete) {
      // Perform the deletion logic here
      // deletingContact(contact);
      handleDeleteContact(contact);
    }
  };
  
 
    const [dataInserted, setDataInserted]=useState(false);
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


      const fetchContactDetails = useCallback(() => {
        setShowAddContactForm(false);
        setShowEditContactForm(false);
        if (selectedCustomer) {
          // Send a request to your server to add the new customer
          fetch('http://localhost:5000/getContactDetails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedCustomer }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch contact details');
              }
              return response.json();
            })
            .then((data) => {
              setContactDetails(data);
              setButtonClicked(true);
            })
            .catch((error) => {
              setShowErrorMessage(true);
              console.error('Error:', error);
            });
        } else {
          console.error('Please select customer.');
        }
      }, [selectedCustomer]);

    useEffect(() => {
      fetchContactDetails();
      // Use setTimeout to reset dataInserted after a delay
      if (dataInserted || dataUpdated||dataDeleted) {
        const timeout = setTimeout(() => {
          setDataInserted(false);
          setDataUpdated(false);
          setDataDeleted(false);
        }, 2000); // Adjust the delay (in milliseconds) as needed
        return () => clearTimeout(timeout); // Cleanup the timeout on unmount
      }
    }, [dataInserted, dataUpdated, dataDeleted,fetchContactDetails]);

    const handleDeleteContact = (deletingContact) => {
      console.log('deleting contact',deletingContact);
      fetch('http://localhost:5000/deleteContact', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        // Additional options, such as body if needed
         body: JSON.stringify(deletingContact),
      })
        .then((response) => {
          if (!response.ok) {
          throw new Error(`Failed to delete contact: ${response.statusText}`);
         }
         return response.json();
    })
        .then(data => {
          // Handle the response data
          setShowServerError(false);
          setDataDeleted(true);
          console.log('Contact deleted successfully', data);
        })
        .catch(error => {
          setShowServerError(true);
          console.error('Error deleting contact:', error);
        });
    };
  return (
<div className='container-fluid' style={{color:"black"}}> 
{showAddContactForm && (<ContactDetailsForm 
     onCloseForm={() => {
      setShowAddContactForm(false);
      //setDataInserted(false); // Reset datainserted when closing the form
    }}
    onAddContact={() => {
      setDataInserted(true); // Set datainserted to true when data is successfully inserted
    }}
    />
    )}
{!showAddContactForm && (
<div>
  <div className='d-flex justify-content-between'>
    <div className='d-flex justify-content-start'>
      <form className='form-horizontal'>
        <div className='form-group row'>
          <div className='col-sm-8'>
            <div className='dropdown'>
              <select
                className='form-select'
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
              >
                <option value="" disabled>
                  Select Customer
                </option>
                {customerData.map((customer, index) => (
                  <option key={index} value={customer.Cust_name}>
                    {customer.Cust_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='col-sm-4 form1'>
            <Button
            className='button'
              type='button'
              onClick={fetchContactDetails }
            >
              Get Details
            </Button>
          </div>
        </div>
      </form>
    </div>

    <div className='d-flex justify-content-end form1' >
  <Button
    className='button'
    type='button'
    onClick={() => {
      setShowEditContactForm(false);
      setShowAddContactForm(true);
      setButtonClicked(false);
    }}
  >
    <FaPlus></FaPlus>&nbsp; Add Contact Details
  </Button>
</div>

  </div>
  {showServerError && (
        <div className="d-flex justify-content-center align-items-center">
            <p style={{color:"red"}}>Sorry! There is a server error occurred</p>
        </div>
        )}
  
      
    {buttonClicked && (
        <div className='table-responsive' style={{marginTop:"2vh"}}>
          <table className='table table-bordered table-striped table-sm'>
            <thead>
              <tr>
                <th>Contact Person</th>
                <th>Designation</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Landline</th>
                <th>Fax</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contactDetails.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.contact_person }</td>
                  <td>{contact.Designation}</td>
                  <td>{contact.Cust_name}</td>
                  <td>{contact.Email_id}</td>
                  <td>{contact.Mobile }</td>
                  <td>{contact.Landline}</td>
                  <td>{contact.Fax }</td>
                  <td>
                    <FaPencilAlt onClick={() => handleEditClick(contact)} style={{cursor:"pointer"}}></FaPencilAlt>
                    <FaTrash style={{ color:"red", marginLeft:"1rem" , cursor:"pointer"}} onClick={() => handleDeleteClick(contact)}></FaTrash>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {showEditContactForm && (
        <div className="popup">

          <span className="close" onClick={() => setShowEditContactForm(false)}>
            &times;
          </span>
          <EditContactDetails
          editingContact={editingContact}
          onCloseForm={() => {
            setShowEditContactForm(false);
            setEditingContact(null); // Reset editingContact when closing the form
          }}
          onEditContact={()=>{
            setShowEditContactForm(false);
            setEditingContact(null); // Reset editingContact when closing the form
            setDataUpdated(true); // Set datainserted to true when data is successfully inserted

          }}
        />

      </div>
    )}
       
      
      {showErrorMessage && (
        <div className="d-flex justify-content-center align-items-center">
            <p style={{color:"red"}}>Unable to get contact details</p>
        </div>
        )}
         {/* // Update the styles for dataInserted alert */}
{dataInserted && (
  <div className="d-flex justify-content-center align-items-center" style={{ position: "fixed", top: "5rem", left: "50%", transform: "translate(-50%, -50%)", width: "50%" }}>
    <div role="alert" style={{ backgroundColor: "lightgreen", padding:"1rem" }}>
      Record inserted successfully!
    </div>
  </div>
)}

{/* // Update the styles for dataUpdated alert */}
{dataUpdated && (
  <div className="d-flex justify-content-center align-items-center" style={{ position: "fixed", top: "5rem", left: "50%", transform: "translate(-50%, -50%)", width: "max-content" }}>
    <div role="alert" style={{ backgroundColor: "lightgreen", padding:"1rem" }}>
      Contact details updated successfully!
    </div>
  </div>
)}

{/* // Update the styles for dataDeleted alert */}
{dataDeleted && (
  <div className="d-flex justify-content-center align-items-center" style={{ position: "fixed", top: "5rem", left: "50%", transform: "translate(-50%, -50%)", width: "max-content" }}>
   <div role="alert" style={{ backgroundColor: "lightgreen", padding:"1rem" }}>
      Contact details deleted successfully!
    </div>
  </div>
)}
</div>
)}
  </div>
  );
};

export default ContactDetails;
