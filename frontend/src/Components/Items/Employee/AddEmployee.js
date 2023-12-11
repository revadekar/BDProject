import React, { useEffect, useState } from "react";
import { Button } from "baseui/button";

const EmployeeForm=({onCloseForm,onAddEmployee})=>{
    const[GroupData,setGroupData]=useState([]);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const [nameValid, setNameValid] = useState(true);
    const [designationValid, setDesignationValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [mobileValid, setMobileValid] = useState(true);
    const [DesignationData, setDesignationData] = useState([]);
    const [newEmployee,setNewEmployee]=useState({
      
        Group_Name: null,
        Employee_Name: null,
        Designation:null,
        Email: null,
        Mobile: null,
        Office_Landline: null,
        Location: null,
        
    });
    useEffect(() => {
        fetch("http://localhost:5000/getGroups", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setGroupData(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }, []);

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



    const handleCancel = () => {
        onCloseForm();
        setShowErrorMessage(false);
      };

      const handleAddEmployee = () => {
        // Find the selected customer based on the name
        const selectedGroup = GroupData.find(
          (group) => group.Group_Name === newEmployee.Group_Name
        );
        newEmployee.desig_code=DesignationData.find((desig)=>desig.desig_name===newEmployee.Designation).desig_code;
    
        // Check if all required fields are filled
        if (
          nameValid &&
          designationValid &&
          emailValid &&
          mobileValid &&
          selectedGroup
        ) {
          // Create a new contact object
          const employee = {
        Group_id: selectedGroup.Group_id,
        Employee_Name: newEmployee.Employee_Name,
        Designation:newEmployee.Designation,
        Email: newEmployee.Email,
        Mobile: newEmployee.Mobile,
        Office_landline: newEmployee.Office_Landline,
        Location: newEmployee.Location,
          };
    
          // Send a request to your server to add the new contact
          fetch("http://localhost:5000/addEmployee", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(employee),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                setShowValidationMessage(false);
                setShowErrorMessage(true);
                throw new Error(
                  `Unable to add Employee details: ${response.statusText}`
                );
              }
            })
            .then((data) => {
              setShowErrorMessage(false);
              onCloseForm();
              onAddEmployee();
            })
            .catch((error) => {
              setShowErrorMessage(true);
              console.error("Error:", error.message);
            });
        } else {
          // Handle validation or show an error message
          setShowValidationMessage(true);
          setShowErrorMessage(false);
          console.error("Invalid data. Please fill in all required fields.");
        }
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
                      <option value="" disabled selected>
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
              <div className="form-group row mb-3" >
                <label htmlFor="Designation" className="control-label col-sm-4">
                  Designation:
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-8">
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
                  <option value='' disabled selected> Select Designation</option>
                  {DesignationData.map((desig)=>(
                    <option  value={desig.desig_name}>{desig.desig_name}</option>
                  ))}
                  </select>
                  {/* <input
                    type="text"
                    id="Designation"
                    className="form-control"
                    value={newEmployee.Designation}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        Designation: e.target.value,
                      })
                    }
                    required
                  /> */}

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
                <div className="d-flex justify-content-center">
                  <Button
                 className="flat-button btn btn-danger"
                 size="compact"
                
          
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
style={{ marginLeft: "0.3rem" }}
              size="compact"
                    
                    className="btn btn-danger flat-button"
                    onClick={handleAddEmployee}
                  >
                    Save
                  </Button>
                </div>
            </form>
          </div>
        </div>
      </div>
    )

}
export default EmployeeForm;