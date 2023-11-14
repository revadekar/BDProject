import { Button } from 'baseui/button';
import React, { useEffect, useState } from 'react';
import ContactDetailsForm from './ContactDetailsForm';
//import {useNavigate } from 'react-router-dom';

const ContactDetails = () => {
   // const Navigate = useNavigate();
    const [showContactForm, setShowContactForm]=useState(false);
    const [customerData,setCustomerData]=useState([]);
    const [contactDetails, setContactDetails] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState('');
  
 
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
      // Use setTimeout to reset datainserted after a delay
      if (dataInserted) {
        const timeout = setTimeout(() => {
          setDataInserted(false);
        }, 5000); // Adjust the delay (in milliseconds) as needed
        return () => clearTimeout(timeout); // Cleanup the timeout on unmount
      }
    }, [dataInserted]);

    const handleFormSubmit = () => {
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
      console.error('Invalid data. Please fill in all fields.');
    }

    };
  return (
<div className='container-fluid' style={{color:"black"}}> 
<div className='d-flex justify-content-start'>
  <div className='card col-sm-6'>
    <form className='form-horizontal' style={{ padding: '20px' }}>
      <div className='form-group row'>
        <div className='col-sm-8'>
          <div className='dropdown'>
          <select
         className='form-control'
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}>
              <option value="" disabled >Select Customer</option>
              {customerData.map((customer, index) => (
                <option key={index} value={customer.Cust_name}>{customer.Cust_name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='col-sm-4'>
                <Button size='compact' style={{backgroundColor:"darkcyan"}} type='button' onClick={handleFormSubmit}>
                  Get Details
                </Button>
              </div>
      </div>
    </form>
  </div>
</div>


<div className='d-flex justify-content-end my-2' style={{ marginRight: '2vw' }}>
        <Button size='compact' style={{ backgroundColor: 'darkcyan' }} onClick={() => setShowContactForm(true)}>
          Add Contact Details
        </Button>
      </div>
      
    {showContactForm && (<ContactDetailsForm 
     onCloseForm={() => {
      setShowContactForm(false);
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
        <div className='table-responsive' style={{paddingRight:"2vw"}}>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
</div>
  );
};

export default ContactDetails;
