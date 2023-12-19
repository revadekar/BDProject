import React, { useEffect, useState } from 'react';
import EmployeeForm from './AddEmployee';
import { Button } from 'baseui/button';
import { FaPencilAlt, FaTrash,FaPlus } from 'react-icons/fa';
import EditEmployee from './EditEmployee';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState(null);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const [showEditEmployeeForm, setShowEditEmployeeForm]= useState(false);
  const [showEmployees, setShowEmployees] = useState(true);
  const [employeeAdded,setEmployeeAdded]=useState(false);
  const [EditingEmployee, setEditingEmployee] = useState(null);
  const [employeeDeleted,setEmployeeDeleted]=useState(false);
  const [employeeUpdated,setEmployeeUpdated]=useState(false);

  useEffect(() => {
    console.log(employees);
  }, [employees]);

  useEffect(() => {
    fetch('http://localhost:5000/getEmployees', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [employeeAdded, employeeUpdated, employeeDeleted]);

useEffect(() => {
  // Use setTimeout to reset state after a delay
  if (employeeAdded || employeeUpdated||employeeDeleted) {
    const timeout = setTimeout(() => {
      setEmployeeAdded(false);
      setEmployeeUpdated(false);
      setEmployeeDeleted(false);
    }, 2000); // Adjust the delay (in milliseconds) as needed
    return () => clearTimeout(timeout); // Cleanup the timeout on unmount
  }
}, [employeeAdded, employeeUpdated, employeeDeleted]);

  const handleEditClick=(employee)=>{
    setEditingEmployee(employee);
    setShowEditEmployeeForm(!showEditEmployeeForm);
  }

  const handleDeleteClick=(emp)=>{
    const shouldDeleteEmp = window.confirm('Are you sure to delete this Employee ?');
    if (shouldDeleteEmp) {
      fetch('http://localhost:5000/deleteEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Emp_id: emp.Emp_id}),
      })
        .then(response => response.json())
        .then(data => {
          setEmployees(prevEmployees => prevEmployees.filter(e => e.Emp_id !== emp.Emp_id));
          // Handle the response if needed
          setEmployeeDeleted(true);
          // setShowPopup(true);

          // // Hide the popup after 1 second
          setTimeout(() => {
            setEmployeeDeleted(false);
          }, 2000);
          
        })
        .catch(error => console.error('Fetch error:', error));
    }
  }


  return (
 
<<<<<<< HEAD
    <div>
      {employeeAdded && (
  <div className="d-flex justify-content-center align-items-center" style={{ position: "fixed", top: "5rem", left: "50%", transform: "translate(-50%, -50%)", width: "50%" }}>
    <div role="alert" style={{ backgroundColor: "lightgreen", padding:"1rem" }}>
      Record inserted successfully!
    </div>
  </div>
)}

{/* // Update the styles for dataUpdated alert */}
{employeeUpdated && (
  <div className="custom-alert" >
    <div className='success'>
      Employee details updated successfully!
    </div>
  </div>
)}

{/* // Update the styles for dataDeleted alert */}
{employeeDeleted && (
  <div className="d-flex justify-content-center align-items-center" style={{ position: "fixed", top: "5rem", left: "50%", transform: "translate(-50%, -50%)", width: "max-content" }}>
   <div role="alert" style={{ backgroundColor: "lightgreen", padding:"1rem" }}>
      Employee details deleted successfully!
    </div>
  </div>
)}
      <div style={{ marginRight: "10px" }}>
=======
    <div className='container-fluid'>
      <div >
>>>>>>> d3f47389ef07a4b37952e57be1a8025fc01bbe49
       <div className='d-flex justify-content-end form1 mb-4'>
        
      <Button className="button"
       
        onClick={() => {
          setEmployeeAdded(false);
          setShowAddEmployeeForm(true);
          setShowEmployees(false);
        }}
      >
        <FaPlus></FaPlus>&nbsp;Add Employee
      </Button>
      </div>
      </div>
      {showAddEmployeeForm && <EmployeeForm onAddEmployee={()=>{setShowEmployees(true); setShowAddEmployeeForm(false); setEmployeeAdded(true)}} onCloseForm={() => {setShowEmployees(true); setShowAddEmployeeForm(false)}}  />}
      {showEditEmployeeForm && 
      <div className='popup'>
      <EditEmployee EditingEmployee={EditingEmployee} onEditEmployee={()=>{ setShowEmployees(true); setShowEditEmployeeForm(false); setEmployeeUpdated(true)}} onCloseForm={() => {setShowEmployees(true); setShowEditEmployeeForm(false)}}  />
      </div>}
      {showEmployees && (
        <div className='table-responsive'>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Office Landline</th>
                <th>Location</th>
                <th>Group Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees !== null &&
                employees.map((emp, index) => {
                  return (
                    <tr key={emp.Emp_id}>
                      <td>{index + 1}.</td>
                      <td>{emp.Emp_id}</td>
                      <td>{emp.Employee_Name}</td>
                      <td>{emp.Designation}</td>
                      <td>{emp.Email}</td>
                      <td>{emp.Mobile}</td>
                      <td>{emp.Office_landline}</td>
                      <td>{emp.Location}</td>
                      <td>{emp.Group_Name}</td>
                      <td><FaPencilAlt style={{cursor: 'pointer'}} onClick={() => handleEditClick(emp)}/><span>&nbsp;&nbsp;&nbsp;</span><FaTrash style={{cursor: 'pointer'}}onClick={() => handleDeleteClick(emp)}/></td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
