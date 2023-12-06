import React, { useEffect, useState } from 'react';
import EmployeeForm from './AddEmployee';
import { Button } from 'baseui/button';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import EditEmployee from './EditEmployee';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState(null);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const [showEditEmployeeForm, setShowEditEmployeeForm]= useState(false);
  const [showEmployees, setShowEmployees] = useState(true);
  const[employeeAdded,setEmployeeAdded]=useState(false);
  const [EditingEmployee, setEditingEmployee] = useState(null);
  const[employeeDeleted,setEmployeeDeleted]=useState(false);
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
  }, [employeeAdded, employeeUpdated]);

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
    <div>
       <div className='my-2' style={{ marginRight: "0.5vw" }}>
      <Button
        size='compact'
        style={{ backgroundColor: 'darkcyan' }}
        onClick={() => {
          setShowAddEmployeeForm(true);
          setShowEmployees(false);
        }}
      >
        Add Employee
      </Button>
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
