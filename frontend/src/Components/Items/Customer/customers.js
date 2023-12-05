import React, { useState, useEffect } from 'react';
import { styled } from 'baseui';
import CustomerForm from './CustomerForm';
import { Button } from 'baseui/button';
import { FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa';
import { ChevronDown } from 'baseui/icon';
import EditCustomerForm from './EditCustomer';

const CustomersComponent = () => {
  const [customerData, setCustomerData] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the form
  const [datainserted, setDataInserted]=useState(false);
  const [showCustomers, setShowCustomers]=useState(true);
  // State to keep track of selected customers
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [dataDeleted,setDataDeleted]=useState(false);
  const[dataUpdated,setDataUpdated]=useState(false);
  const [ErrorMessage,setErrorMessage]=useState(false);
  // Define a state to keep track of the "Select All" checkbox
 const [selectAllChecked, setSelectAllChecked] = useState(false);
 const[editingCustomer,setEditingCustomer]=useState([]);
 const[showEditCustomerForm,setShowEditCustomerForm]=useState(false);


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
        setErrorMessage('Unable to fetch customer data');
        console.error('Error:', error);
      }
    };
  
    fetchCustomerData();
  }, [showForm, datainserted, dataDeleted,dataUpdated]); // Trigger fetch on dataDeleted change

  useEffect(() => {
    // Use setTimeout to reset dataInserted after a delay
    if (datainserted|| dataUpdated||dataDeleted) {
      const timeout = setTimeout(() => {
        setDataInserted(false);
        setDataUpdated(false);
        setDataDeleted(false);
      }, 2000); // Adjust the delay (in milliseconds) as needed
      return () => clearTimeout(timeout); // Cleanup the timeout on unmount
    }
  }, [dataUpdated, dataDeleted,datainserted]);
  // Function to handle the "Select All" checkbox change
const handleSelectAllChange = (event) => {
  setSelectAllChecked(event.target.checked);
  // Update the selectedCustomers state based on the "Select All" checkbox
  //setSelectedCustomers(event.target.checked ? Array.from({ length: customerData.length }, (_, index) => index) : []);
  setSelectedCustomers(
    event.target.checked ? [...Array(customerData.length).keys()] : []
  );
  
};

   // Function to handle selection or deselection of customers
   const handleSelectCustomer = (index) => {
    const isSelected = selectedCustomers.includes(index);
    setSelectedCustomers((prevSelected) =>
      isSelected
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
  };

  const handleEditCustomers=()=>{

    const selectedCustomer = customerData[selectedCustomers[0]]; // Accessing value at the given index
    console.log('selectedCustomer:', selectedCustomer);
    
    setEditingCustomer(selectedCustomer);
    setShowEditCustomerForm(true);
    
  }
const handleClearCustomers=()=>{
  setSelectedCustomers([]);
  setSelectAllChecked(false);
}
  const handleDeleteCustomers=()=>{
    const confirmDelete=window.confirm("Are you sure to delete this customer ?");
    if(confirmDelete){
      deleteSelectedCustomers();
    }else{
      setSelectedCustomers([]); 
    }
  }

   // Function to delete selected customers
   const deleteSelectedCustomers = async () => {
    setDataDeleted(false);
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
        setErrorMessage('Unable to delete customer');
        setTimeout(() => {
        setErrorMessage('');
      }, 2000);
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      setErrorMessage('Unable to delete customer ');
      console.error('Error:', error);
    }
  };
  
  
  return (
    <CustomersComponentWrapper className='container-fluid'>
      {dataUpdated && (
  <div className="d-flex justify-content-center align-items-center">
    <div className='custom-alert success' >
      Customer details updated successfully!
    </div>
  </div>
)}
{dataDeleted && (
  <div className="d-flex justify-content-center align-items-center">
    <div className='custom-alert success' >
      Customer details deleted successfully!
    </div>
  </div>
)}
  
  {datainserted && (
         <div className="d-flex justify-content-center align-items-center">
         <div className='custom-alert success' >
           Customer details inserted successfully!
         </div>
       </div>
      )}
          {ErrorMessage && 
          <div className='d-flex justify-content-center custom-alert'>
        <p className='error-message'>{ErrorMessage}</p>
        </div>
        }

      {showEditCustomerForm && (
      <div className='popup'>
        <EditCustomerForm 
        editingCustomer={editingCustomer}
        onCloseForm={()=>{setShowEditCustomerForm(false); setEditingCustomer(null);}}
        onEditCustomer={()=>{ setDataUpdated(true);}}
        />
      </div>
      )}
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
    
      {showCustomers &&
      <>
  <div className='d-flex justify-content-between'>
    
  {/* Button to delete selected customers */}

    <div className='d-flex justify-content-start my-2 form1'>
      {(selectedCustomers.length === 1)&&(
      <Button className='button' onClick={handleEditCustomers} >
        <FaPencilAlt></FaPencilAlt>
        <span>&nbsp;</span>
        Edit
      </Button>  )}
    {selectedCustomers.length > 0 && (
      <>
      <Button className='button' onClick={handleDeleteCustomers} style={{marginLeft:"1rem"}}>
        <FaTrash></FaTrash>
        <span>&nbsp;</span>
        Delete
      </Button>
      <Button className='button' onClick={handleClearCustomers} style={{marginLeft:"1rem"}}>
        <faclear></faclear>
        Clear
      </Button>
      </>
      )}
    </div>


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
          <input
           id='selectAll'
           className='form-check-input'
           type='checkbox'
           checked={selectAllChecked}
           onChange={handleSelectAllChange}
           />
            <label htmlFor='selectAll'><ChevronDown size={'20px'} /></label>
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
        <td><input className='form-check-input' type='checkbox' onChange={() => handleSelectCustomer(index)} checked={selectedCustomers.includes(index)}/>
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
