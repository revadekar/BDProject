import React, { useEffect, useState } from 'react';
import EmployeeForm from './AddEmployee';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState(null);
  const [showEmployeeForm,setShowEmployeeForm]=useState(false);
  const[showEmployees,setShowEmployees]=useState(true);

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
        //console.log(data);
        setEmployees(data);

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
        <button
    size='compact'
    style={{ backgroundColor: 'darkcyan' }}
    onClick={() => {
      setShowEmployeeForm(true);
       setShowEmployees(false);
    //   setButtonClicked(false);
    }}
  >
    Add Employee
  </button>
  {showEmployeeForm &&<EmployeeForm onCloseForm={()=>setShowEmployees(true)}/>}
  {showEmployees &&
      <div style={{ color: 'black' }}>
        <table className='table table-bordered table-striped'>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Office Landline</th>
              <th>Location</th>
              <th>Group Name</th>
            </tr>
          </thead>
          <tbody>
          {employees!==null &&
  employees.map((emp) => {
    return (
      <tr key={emp.Emp_id}>
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
      </div>}
    </div>
  );
};

export default EmployeeDetails;
