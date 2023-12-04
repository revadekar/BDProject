import React, { useState,useEffect } from "react";
import { Button } from "react-bootstrap";

const EditEmployee=({onCloseForm,onEditEmployee,EditingEmployee})=>{
    const [newEmployee,setNewEmployee]=useState(EditingEmployee);
    const [showErrorMessage,setShowErrorMessage]=useState(false);
    const [GroupData,setGroupData]=useState([]);
    const[DesignationData,setDesignationData]=useState([]);
    
    useEffect(()=>{
        fetch('http://localhost:5000/getGroups', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              })
                .then((response) => response.json())
                .then((data) => { 
                  setGroupData(data);
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
        },[])

        useEffect(()=>{
            fetch('http://localhost:5000/getDesignation', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(),
                  })
                    .then((response) => response.json())
                    .then((data) => { 
                        setDesignationData(data);
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    });
            },[])

            
    const handleEditEmployee=()=>{

    }

   const handleCancel=()=>{
    onCloseForm();
    setShowErrorMessage(false);
    }
    return(
        <div className="container-fluid">
             {showErrorMessage && (
        <div className="d-flex justify-content-center align-items-center">
            <p style={{color:"red"}}>Name,Email, Designation and Mobile No is required</p>
        </div>
        )}
            <div  className="d-flex justify-content-center align-items-center">
                <div className="card col-sm-6 form1">
                    <form className="form-horizontal">
                        <div  className="d-flex justify-content-center mb-3">
                            <h4>Edit Employee</h4>
                        </div>
                        <div className=" form-group row mb-3">
                        <label htmlFor='id' className='control-label col-sm-4 '>Employee ID</label>
                        <div className='col-sm-8'>
                        <input 
                        type='number'
                        id='id'
                        className='form-control '
                        value={newEmployee.Emp_id}
                        onChange={(e) =>
                            setNewEmployee({ ...newEmployee, Emp_id: e.target.value })}
                            disabled
                        />
                         </div>
                        </div>

                        <div className=" form-group row mb-3">
                        <label htmlFor='Name' className='control-label col-sm-4 '>Employee Name</label>
                        <div className='col-sm-8'>
                        <input 
                        type='text'
                        id='Name'
                        className='form-control '
                        value={newEmployee.Employee_Name}
                        onChange={(e) =>
                            setNewEmployee({ ...newEmployee, Employee_Name: e.target.value })}
                            disabled
                        />
                         </div>
                        </div>
                        <div className=" form-group row mb-3">
                        <label htmlFor='Designation' className='control-label col-sm-4 '>Designation</label>
                        <div className='col-sm-8'>
                        <select 
                        type='text'
                        id='Designation'
                        className='form-control '
                        value={newEmployee.Desig_Code}
                        onChange={(e) =>
                            setNewEmployee({ ...newEmployee, Desig_Code: e.target.value })}
                        >
                             {DesignationData.map((desig, index) => (
              <option key={index} value={desig.desig_code}>{desig.desig_name}</option>
            ))}
                            </select>
                         </div>
                        </div>
                        <div className=" form-group row mb-3">
                        <label htmlFor='Group_Name' className='control-label col-sm-4 '>Group_Name</label>
                         <div className='col-sm-8'>
                         <div className='dropdown'>
                            <select
                             id='Group'
                            className='form-select '
                            value={newEmployee.Group_Name}
                            onChange={(e) => setNewEmployee({ ...newEmployee, Group: e.target.value })}>
            {GroupData.map((group, index) => (
              <option key={index} value={group.Group_Name}>{group.Group_Name}</option>
            ))}
          </select>
        </div>
        </div>

                    
                        </div>
                        <div className=" form-group row mb-3">
                        <label htmlFor='Email' className='control-label col-sm-4 '>Email</label>
                        <div className='col-sm-8'>
                        <input 
                        type='text'
                        id='Email'
                        className='form-control '
                        value={newEmployee.Email}
                        onChange={(e) =>
                            setNewEmployee({ ...newEmployee, Email: e.target.value })}
                        />
                         </div>
                        </div>
                        <div className=" form-group row mb-3">
                        <label htmlFor='Office_landline' className='control-label col-sm-4 '>Office_landline</label>
                        <div className='col-sm-8'>
                        <input 
                        type='text'
                        id='Office_landline'
                        className='form-control '
                        value={newEmployee.Office_landline}
                        onChange={(e) =>
                            setNewEmployee({ ...newEmployee, Office_landline: e.target.value })}
                        />
                         </div>
                        </div>
                        <div className=" form-group row mb-3">
                        <label htmlFor='Mobile' className='control-label col-sm-4 '>Mobile</label>
                        <div className='col-sm-8'>
                        <input 
                        type='text'
                        id='Mobile'
                        className='form-control '
                        value={newEmployee.Mobile}
                        onChange={(e) =>
                            setNewEmployee({ ...newEmployee, Mobile: e.target.value })}
                        />
                         </div>
                        </div>
                        <div className=" form-group row mb-3">
                        <label htmlFor='Location' className='control-label col-sm-4 '>Location</label>
                        <div className='col-sm-8'>
                        <input 
                        type='text'
                        id='Location'
                        className='form-control '
                        value={newEmployee.Location}
                        onChange={(e) =>
                            setNewEmployee({ ...newEmployee, Location: e.target.value })}
                        />
                         </div>
                        </div>

                        <div className='d-flex justify-content-center' >

                        <Button
                       size='sm'
                     type='button'
                      onClick={handleEditEmployee}
                           >
                       Save
                     </Button>
                      <Button
                         className="btn btn-danger"
                        size='sm'
                        type='button'
                       style={{marginLeft:"1rem"}}
                   onClick={handleCancel}
                          >
                          Cancel
                          </Button>
                      </div>
                        
                      
                    </form>
                </div>
            </div>
        </div>
    )
}


export default EditEmployee;