import React, { useState, useEffect } from 'react';
import { styled } from 'baseui';
import CustomerForm from './CustomerForm';
import { Button } from 'baseui/button';

const CustomersComponent = () => {
  const [customerData, setCustomerData] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the form
  const [datainserted, setDataInserted]=useState(false);

  useEffect(() => {
    async function fetchCustomerData() {
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
    }
    fetchCustomerData();
  }, [showForm, datainserted]);

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
      <div style={{ marginLeft: "70vw", padding:"10px"}}>
        <Button  size='compact' style={{backgroundColor:"darkcyan"}} onClick={() => setShowForm(true)} >Add Customer</Button>
      </div>
      {showForm && <CustomerForm
        onCloseForm={() => {
          setShowForm(false);
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
      <div className='table-responsive' style={{padding:"20px", marginLeft:"2vw"}}>
      <table className="table table-bordered table-striped table-lg">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>City</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer, index) => (
            <tr key={index}>
              <td style={{textAlign:"left", width:"max-content", paddingLeft:"20px"}}>{customer.Cust_name}</td>
              <td>{customer.City}</td>
              <td>{customer.State}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </CustomersComponentWrapper>
  );
};

export default CustomersComponent;

const CustomersComponentWrapper = styled('div', {
  // Add specific styling for the CustomersComponent if needed
  //background: 'white',
  color:'black',
  marginLeft: '0px',
  //marginTop:"0.5rem",
  width:"100%"
  // padding: '10px'
});
