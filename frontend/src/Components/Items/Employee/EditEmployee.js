import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const EditEmployee = ({ onCloseForm, onEditEmployee, EditingEmployee }) => {
  const [newEmployee, setNewEmployee] = useState(EditingEmployee );
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [GroupData, setGroupData] = useState([]);
  const [DesignationData, setDesignationData] = useState([]);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [GroupValid, setGroupValid] = useState(false);
  const [designationValid, setDesignationValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [mobileValid, setMobileValid] = useState(false);
  const [nameValid, setNameValid] = useState(true);
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

            useEffect(() => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              // const designationRegex = /^[a-zA-Z ]+$/;
              const mobileRegex = /^\d{10}$/;
            
              // Validate each required field
              // setDesignationValid(designationRegex.test(newEmployee.Designation));
              setEmailValid(emailRegex.test(newEmployee.Email));
              setMobileValid(newEmployee.Mobile && mobileRegex.test(newEmployee.Mobile));
            }, [newEmployee]);
               

    const handleEditEmployee=()=>{
         //Check if all fields are filled

         newEmployee.desig_code=DesignationData.find((desig)=>desig.desig_name===newEmployee.Designation).desig_code;
         newEmployee.Group_id=GroupData.find((group)=>group.Group_Name===newEmployee.Group_Name).Group_id;
         console.log('newEmployee',newEmployee);
         if (emailValid && mobileValid ) {
    
          // Send a request to your server to add the new customer
          fetch('http://localhost:5000/editEmployee', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEmployee),
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle the response from your server, you can update your state or perform any necessary actions
              // For example, you can call `onAddCustomer` to add the new customer to your state
             //onAddCustomer();
             //setDataInserted(true);
            // onCloseForm();
             setShowErrorMessage(false);
              onCloseForm();
              onEditEmployee();
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        } else {
          // Handle validation or show an error message
          setShowErrorMessage(true);
          console.error('Invalid data. Please fill in all fields.');
        }
    }
    const handleSave = () => {
      // Perform the save operation
      // Assume updatedEmployee contains the edited data
     
  
      // Call onEditEmployee with the updated data
      // onEditEmployee(updatedEmployee);
      const updatedEmployee = {
        Emp_id: EditingEmployee.Emp_id,
        Employee_Name:EditingEmployee.Employee_Name, 
        Designation:EditingEmployee.Designation, 
        Email:EditingEmployee.Email,
        Office_landline:EditingEmployee.Office_Landline,
        Location:EditingEmployee.Location,
        Group_Name:EditingEmployee.Group_Name,
      };
  
       // Call onEditEmployee with the updated data
       onEditEmployee(updatedEmployee);
    };

   const handleCancel=()=>{
    onCloseForm();
    setShowErrorMessage(false);
   };

    return(
      <div className="container-fluid userform">
      {showValidationMessage && (
        <div className="d-flex justify-content-center align-items-center">
          <p style={{ color: "red" }}>
            Name, Email, Designation, and Mobile No are required
          </p>
        </div>
      )}
      {showErrorMessage && (
        <div className="d-flex justify-content-center align-items-center">
          <p style={{ color: "red" }}>
            Unable to add Employee details. Please check your input.
          </p>
        </div>
      )}

      <div
        className="d-flex justify-content-center align-items-center"
        
      >
        <div className="card col-sm-5 form1">
          <div className="d-flex justify-content-center mb-3">
          <h4>Add Employee</h4>
          </div>
          <form
            className="form-horizontal"
            style={{ fontFamily: "serif", fontWeight: "bold" }}
          >
            <div className="form-group row mb-3" >
              <label
                htmlFor="Group_Name"
                className="control-label col-sm-4"
              >
                Group Name:
                <span className="text-danger">*</span>
              </label>
              <div className="col-sm-8">
                <div className="dropdown">
                  <select
                    id="Group_Name"
                    className="form-select"
                    value={newEmployee.Group_Name}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, Group_Name: e.target.value })
                    }
                    required
                  >
                    <option value="" disabled >
                    Select Group
                    </option>
                    {GroupData.map((Group, index) => (
                      <option
                        key={index}
                        value={Group.Group_Name}
                      >
                        {Group.Group_Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {!nameValid && (
                  <div className="invalid-feedback">Name is required.</div>
                )}
            <div className="form-group row mb-3">
              <label htmlFor="Name" className="control-label col-sm-4">
                Employee Name:
                <span className="text-danger">*</span>
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="Name"
                  className="form-control"
                  value={newEmployee.Employee_Name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, Employee_Name: e.target.value })
                  }
                  required
                />
               
              </div>

            </div>
            {!designationValid && (
                  <div className="invalid-feedback">Designation is required.</div>
                )}
            <div className="form-group row mb-3">
  <label htmlFor="Designation" className="control-label col-sm-4">
    Designation:
    <span className="text-danger">*</span>
  </label>
  <div className="col-sm-8">
    <div className="dropdown">
      <select
        type="text"
        id="Designation"
        className="form-select"
        value={newEmployee.Designation}
        onChange={(e) =>
          setNewEmployee({
            ...newEmployee,
            Designation: e.target.value,
          })
        }
        required
      > 
        <option value="" disabled>Select Designation</option>
        {DesignationData.map((desig, index) => (
          <option key={index} value={desig.desig_name}>{desig.desig_name}</option>
        ))}
      </select>
    </div>
  </div>
</div>

          
            
            <div className="form-group row mb-3">
              <label htmlFor="Email" className="control-label col-sm-4">
                Email:
                <span className="text-danger">*</span>
              </label>
              <div className="col-sm-8">
                <div>
                  <input
                    type="email"
                    id="Email"
                    className="form-control"
                    value={newEmployee.Email}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, Email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              {!emailValid && (
<div className="d-flex justify-content-center align-items-center">
  <p style={{ color: "red", marginLeft:"10rem" }}>Email is required and must be valid</p>
</div>
)}
            </div>
          
            <div className="form-group row mb-3">
              <label htmlFor="Mobile" className="control-label col-sm-4">
                Mobile:
                <span className="text-danger">*</span>
              </label>
              <div className="col-sm-8">
                <input
                  type="tel"
                  id="Mobile"
                  className="form-control"
                  value={newEmployee.Mobile}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      Mobile: e.target.value,
                    })
                  }
                  required
                />
              </div>
              {!mobileValid && <div className="d-flex justify-content-center align-items-center">
            <p style={{ color: "red" , marginLeft:"10rem" }}>
            Invalid mobile number. Please enter 10 digits.
          </p>
           </div>}
              
            </div>
            
           
            <div className="form-group row mb-3">
              <label htmlFor="Landline" className="control-label col-sm-4">
                Office-Landline:
              </label>
              <div className="col-sm-8">
                <input
                  type="tel"
                  id="Office_Landline"
                  className="form-control"
                  value={newEmployee.Office_Landline}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      Office_Landline: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="form-group row mb-3" >
              <label htmlFor="Fax" className="control-label col-sm-4">
                Location:
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="Location"
                  className="form-control"
                  value={newEmployee.Location}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      Location: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="form-group row mb-3" >
              <label htmlFor="Floor" className="control-label col-sm-4">
                Floor:
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="Floor"
                  className="form-control"
                  value={newEmployee.Floor}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      Floor: e.target.value,
                    })
                  }
                />
              </div>
            </div>
              <div className="d-flex justify-content-center form1">
                <Button
                 className="flat-button"
                  type="button"
                  onClick={handleEditEmployee}
                >
                  Save
                </Button>
                <Button
                  className="flat-button btn btn-danger"
                  type="button"
                  style={{ marginLeft: "1rem" }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
          </form>
        </div>
      </div>
    </div>
    );
                }
  
                

export default EditEmployee;