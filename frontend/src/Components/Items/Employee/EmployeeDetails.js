import React, { useEffect, useState } from 'react';
import EmployeeForm from './AddEmployee';
import { Button } from 'baseui/button';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState(null);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showEmployees, setShowEmployees] = useState(true);
  const[employeeAdded,setEmployeeAdded]=useState(false);

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
  }, [employeeAdded]);

  return (
    <div>
       <div className='my-2' style={{ marginRight: "0.5vw" }}>
      <Button
        size='compact'
        style={{ backgroundColor: 'darkcyan' }}
        onClick={() => {
          setShowEmployeeForm(true);
          setShowEmployees(false);
        }}
      >
        Add Employee
      </Button>
      </div>
      {showEmployeeForm && <EmployeeForm onAddEmployee={()=>{setShowEmployees(true); setShowEmployeeForm(false); setEmployeeAdded(true)}} onCloseForm={() => {setShowEmployees(true); setShowEmployeeForm(false)}}  />}
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
