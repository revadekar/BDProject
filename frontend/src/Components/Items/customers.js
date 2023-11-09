import React, { useState, useEffect } from 'react';
import { styled } from 'baseui';
import CustomerForm from './CustomerForm';

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

  return (
    <CustomersComponentWrapper>
      <div style={{ marginLeft: "600px", padding: "20px" }}>
        <button className='btn btn-primary' onClick={() => setShowForm(true)} >Add Customer</button>
      </div>
      {showForm && <CustomerForm
        onCloseForm={() => {
          setShowForm(false);
          setDataInserted(false); // Reset datainserted when closing the form
        }}
        onAddCustomer={() => {
          setDataInserted(true); // Set datainserted to true when data is successfully inserted
        }}
      />} {/* Render the form when showForm is true */}
      
      {datainserted && (
        <div className="alert alert-success" role="alert">
          Data inserted successfully!
        </div>
      )}

      <table className="table table-bordered table-striped">
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
              <td>{customer.Cust_name}</td>
              <td>{customer.City}</td>
              <td>{customer.State}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </CustomersComponentWrapper>
  );
};

export default CustomersComponent;

const CustomersComponentWrapper = styled('div', {
  // Add specific styling for the CustomersComponent if needed
  //background: 'white',
  color:'black',
  marginLeft: '200px',
  marginTop:"0.5rem"
  // padding: '10px'
});
