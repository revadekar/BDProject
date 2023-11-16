import { Button } from 'baseui/button';
import React, { useEffect, useState } from 'react';
import ContactDetailsForm from './AddContactDetails';
import EditContactDetails from './EditContactDetails';
//import {useNavigate } from 'react-router-dom';

const ContactDetails = () => {
   // const Navigate = useNavigate();
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
    setShowEditContactForm(true);
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

      useEffect(() => {
        fetchContactDetails();
        // Use setTimeout to reset dataInserted after a delay
        if (dataInserted || dataUpdated||dataDeleted) {
          const timeout = setTimeout(() => {
            setDataInserted(false);
            setDataUpdated(false);
            setDataDeleted(false);
          }, 5000); // Adjust the delay (in milliseconds) as needed
          return () => clearTimeout(timeout); // Cleanup the timeout on unmount
        }
      }, [dataInserted, dataUpdated, dataDeleted]);

    const fetchContactDetails  = () => {
      setShowAddContactForm(false);
      setShowEditContactForm(false);
      if(selectedCustomer){
      // Send a request to your server to add the new customer
      fetch('http://localhost:5000/getContactDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({selectedCustomer}),
      })
        .then((response) => response.json())
        .then((data) => {
                    setContactDetails(data);
                    
          setButtonClicked(true);

        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      // Handle validation or show an error message
      //setShowErrorMessage(true);
      console.error('Please select customer.');
    }

    };

    const handleDeleteContact = (deletingContact) => {
      fetch('http://localhost:5000/deleteContact', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        // Additional options, such as body if needed
         body: JSON.stringify(deletingContact),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response data
          setDataDeleted(true);
          console.log('Contact deleted successfully', data);
        })
        .catch(error => {
          console.error('Error deleting contact:', error);
        });
    };
  return (
<div className='container-fluid' style={{color:"black"}}> 
  <div className='d-flex justify-content-between'>
    <div className='card col-sm-6'>
      <form className='form-horizontal' style={{ padding: '20px' }}>
        <div className='form-group row'>
          <div className='col-sm-8'>
            <div className='dropdown'>
              <select
                className='form-control'
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
          <div className='col-sm-4'>
            <Button
              size='compact'
              style={{ backgroundColor: 'darkcyan' }}
              type='button'
              onClick={fetchContactDetails }
            >
              Get Details
            </Button>
          </div>
        </div>
      </form>
    </div>

    <div className='my-2' style={{ marginRight: "0.5vw" }}>
  <Button
    size='compact'
    style={{ backgroundColor: 'darkcyan' }}
    onClick={() => {
      setShowAddContactForm(true);
      setButtonClicked(false);
    }}
  >
    Add Contact Details
  </Button>
</div>

  </div>


      
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
     {dataInserted && (
        <div className="alert alert-success" role="alert" style={{width:"max-content"}}>
          Record inserted successfully!
        </div>
      )}
      
    {buttonClicked && (
        <div className='table-responsive' style={{marginRight:"0.5vw" ,marginTop:"1vw"}}>
          <table className='table table-bordered table-striped table-sm'>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Contact Person</th>
                <th>Designation</th>
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
                  <td>{contact.Cust_name}</td>
                  <td>{contact.contact_person }</td>
                  <td>{contact.Designation}</td>
                  <td>{contact.Email_id}</td>
                  <td>{contact.Mobile }</td>
                  <td>{contact.Landline}</td>
                  <td>{contact.Fax }</td>
                  <td>
                    <Button size='compact'style={{ backgroundColor: 'orange' }} onClick={() => handleEditClick(contact)}>
                      Edit
                    </Button>
                    <Button size='compact'style={{ backgroundColor: 'darkred',marginLeft:"0.3rem" }} onClick={() => handleDeleteClick(contact)}>
                      Delete
                    </Button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showEditContactForm && (
        <EditContactDetails
          // ... (other props)
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
      )}
       {dataUpdated && (
        <div className="alert alert-success" role="alert" style={{width:"max-content"}}>
          Contact details updated successfully!
        </div>
      )}
      {dataDeleted && (
        <div className="alert alert-success" role="alert" style={{width:"max-content"}}>
          Contact deleted successfully!
        </div>
      )}
</div>
  );
};

export default ContactDetails;
