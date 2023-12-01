import React, { useState, useEffect } from 'react';
import { styled } from 'baseui';
import CustomerForm from './CustomerForm';
import { Button } from 'baseui/button';
import { FaPlus } from 'react-icons/fa';
import { ChevronDown } from 'baseui/icon';

const CustomersComponent = () => {
  const [customerData, setCustomerData] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the form
  const [datainserted, setDataInserted]=useState(false);
  const [showCustomers, setShowCustomers]=useState(true);
  // State to keep track of selected customers
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [dataDeleted,setDataDeleted]=useState(false);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getCustomers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCustomerData(data);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchCustomerData();
  }, [showForm, datainserted, dataDeleted]); // Trigger fetch on dataDeleted change


   // Function to handle selection or deselection of customers
   const handleSelectCustomer = (index) => {
    const isSelected = selectedCustomers.includes(index);
    setSelectedCustomers((prevSelected) =>
      isSelected
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
  };
   // Function to delete selected customers
   const deleteSelectedCustomers = async () => {
    try {
      const selectedCustomerIds = selectedCustomers.map(
        (index) => customerData[index].Cust_id
      );
  
      const response = await fetch('http://localhost:5000/deleteCustomers', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedCustomerIds }),
      });
  
      if (response.ok) {
        setSelectedCustomers([]); // Clear selected customers after deletion
        setDataDeleted(true);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  useEffect(() => {
    // Use setTimeout to reset datainserted after a delay
    if (datainserted) {
      const timeout = setTimeout(() => {
        setDataInserted(false);
      }, 5000); // Adjust the delay (in milliseconds) as needed
      return () => clearTimeout(timeout); // Cleanup the timeout on unmount
    }
  }, [datainserted]);
  
  return (
    <CustomersComponentWrapper className='container-fluid'>
      {showForm && <CustomerForm
        onCloseForm={() => {
          setShowForm(false);
          setShowCustomers(true);
          //setDataInserted(false); // Reset datainserted when closing the form
        }}
        onAddCustomer={() => {
          setDataInserted(true); // Set datainserted to true when data is successfully inserted
        }}
        
      />} {/* Render the form when showForm is true */}
      
      {datainserted && (
        <div className="alert alert-success" role="alert" style={{width:"max-content"}}>
          Record inserted successfully!
        </div>
      )}
      {showCustomers &&
      <>
  <div className='d-flex justify-content-between'>
  {/* Button to delete selected customers */}
  {selectedCustomers.length > 0 && (
    <div className='d-flex justify-content-start my-2 form1'>
      <Button className='button' onClick={deleteSelectedCustomers}>
        Delete Selected Customers
      </Button>
    </div>
  )}

  {/* Spacer to push buttons apart */}
  <div style={{ flex: 1 }}></div>

  {/* Button to add a new customer */}
  <div className='d-flex justify-content-end my-2 form1' style={{ marginRight: '1vw' }}>
    <Button  className='button'  onClick={() => {setShowForm(true); setShowCustomers(false)}}>
      <FaPlus></FaPlus>
      <span>&nbsp;</span> Add Customer
    </Button>
  </div>
</div>

      <div className='table-responsive'>
      <table className="table table-bordered table-striped table-lg">
  <thead>
    <tr>
      <th> 
        <div className='d-flex align-items-center'>
          <div className='form-check'>
            <input id='selectAll' className='form-check-input' type='checkbox' />
            <label htmlFor='selectAll'><ChevronDown size={'20px'}/></label>
            </div>
        </div>
      </th>
      <th>S.No.</th>
      <th>Company Name</th>
      <th>City</th>
      <th>State</th>
      <th>Country</th>
      <th>Website</th>
    </tr>
  </thead>
  <tbody>
    {customerData.map((customer, index) => (
      <tr key={index}>
        <td><input className='form-check-input' type='checkbox' onClick={() => handleSelectCustomer(index)} checked={selectedCustomers.includes(index)}/>
        </td>
        <td>{index + 1}.</td>
        <td>{customer.Cust_name}</td>
        <td>{customer.City}</td>
        <td>{customer.State}</td>
        <td>{customer.country}</td>
        <td><a href={customer.Website} target='_blank' rel='noopener noreferrer'>{customer.Website}</a></td>
      </tr>
    ))}
  </tbody>
</table>

      </div></>}
    </CustomersComponentWrapper>
  );
};

export default CustomersComponent;

const CustomersComponentWrapper = styled('div', {
  // Add specific styling for the CustomersComponent if needed
  //background: 'white',
  color:'black',
  //marginLeft: '0px',
  //marginTop:"0.5rem",
  width:"100%"
  // padding: '10px'
});
