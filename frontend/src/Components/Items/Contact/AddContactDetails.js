import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const ContactDetailsForm = ({ onCloseForm, onAddContact }) => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [nameValid, setNameValid] = useState(true);
  const [designationValid, setDesignationValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [mobileValid, setMobileValid] = useState(true);
  const [newContact, setNewContact] = useState({
    Customer: null,
    Name: null,
    Designation:null,
    Email: null,
    Mobile: null,
    Landline: null,
    Fax: null,
    Cust_id: null,
  });

  useEffect(() => {
    fetch("http://localhost:5000/getCustomers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomerData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleCancel = () => {
    onCloseForm();
    setShowErrorMessage(false);
  };

 const validateFields=(e)=>{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const designationRegex= /^[a-zA-Z ]+$/;
  const nameRegex=/^[a-zA-Z ]+$/;
  const mobileRegex=/^\d{10}$/;
  // Validate each required field
  setNameValid(nameRegex.test(newContact.Name));
  setDesignationValid(designationRegex.test(newContact.Designation));
  setEmailValid(emailRegex.test(newContact.Email));
  setMobileValid(newContact.Mobile && mobileRegex.test(newContact.Mobile));
 }

  const handleAddContact = () => {
    // Find the selected customer based on the name
    validateFields();
    const selectedCustomer = customerData.find(
      (customer) => customer.Cust_name === newContact.Customer
    );

    // Check if all required fields are filled
    if (
      nameValid &&
      designationValid &&
      emailValid &&
      mobileValid &&
      selectedCustomer
    ) {
      // Create a new contact object
      const contact = {
        contact_person: newContact.Name,
        Designation: newContact.Designation,
        Email_id: newContact.Email,
        Mobile: newContact.Mobile,
        Cust_id: selectedCustomer.Cust_id,
        Landline: newContact.Landline,
        Fax: newContact.Fax,
      };

      // Send a request to your server to add the new contact
      fetch("http://localhost:5000/addContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setShowValidationMessage(false);
            setShowErrorMessage(true);
            throw new Error(
              `Unable to add contact details: ${response.statusText}`
            );
          }
        })
        .then((data) => {
          setShowErrorMessage(false);
          onCloseForm();
          onAddContact();
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

  return (
    <>
      <div className="container-fluid userform"  >
        
        {showErrorMessage && (
          <div className="d-flex justify-content-center align-items-center">
            <p style={{ color: "red" }}>
              Unable to add contact details. Please check your input.
            </p>
          </div>
        )}
        <div className="d-flex justify-content-center align-items-center">
          <div className="card form1">
            <div className="d-flex justify-content-center mb-3">
              <h3>Add Contact</h3>
            </div>
            {showValidationMessage && (
          <div className="d-flex justify-content-center align-items-center">
            <p className="error-message">
              Name, Email, Designation, and Mobile No are required
            </p>
          </div>
        )}
            <form
              className="form-horizontal"
            >
              <div className="form-group row" >
                <label
                  htmlFor="Customer"
                  className="control-label col-sm-4"
                >
                  Company Name:
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-8 mb-3">
                  <div className="dropdown">
                    <select
                      id="Customer"
                      className="form-select"
                      value={newContact.Customer}
                      onChange={(e) =>
                        setNewContact({ ...newContact, Customer: e.target.value })
                      }
                      required
                    >
                      <option value="" disabled selected>
                        Select Company
                      </option>
                      {customerData.map((customer, index) => (
                        <option
                          key={index}
                          value={customer.Cust_name}
                        >
                          {customer.Cust_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
              </div>
              
              <div className="form-group row" >
                <label htmlFor="Name" className="control-label col-sm-4">
                  Contact Person Name:
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-8 mb-4">
                  <input
                    type="text"
                    id="Name"
                    className="form-control"
                    value={newContact.Name}
                    onChange={(e) =>
                      setNewContact({ ...newContact, Name: e.target.value })
                    }
                    required
                  />
                 {!nameValid && (
  <div className="d-flex justify-content-start align-items-center">
    <p style={{ color: "red",marginLeft:"3rem",fontSize:"small"}}>Name is required and must be valid</p>
  </div>
)}
                </div>
                
              </div>
              <div className="form-group row" >
                <label htmlFor="Designation" className="control-label col-sm-4">
                  Designation:
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-8 mb-3">
                  <input
                    type="text"
                    id="Designation"
                    className="form-control"
                    value={newContact.Designation}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        Designation: e.target.value,
                      })
                    }
                    required
                  />
                   {!designationValid && (
  <div className="d-flex justify-content-start align-items-center">
    <p style={{ color: "red",marginLeft:"3rem",fontSize:"small"}}>Designation is required and must be valid</p>
  </div>
)}
                </div>
              </div>
              
              <div className="form-group row" >
                <label htmlFor="Email" className="control-label col-sm-4">
                  Email:
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-8 mb-3">
                  <div>
                    <input
                      type="email"
                      id="Email"
                      className="form-control"
                      value={newContact.Email}
                      onChange={(e) =>{
                        setNewContact({ ...newContact, Email: e.target.value })
                      }}
                      required
                    />
                    {!emailValid && (
  <div className="d-flex justify-content-start align-items-center">
    <p style={{ color: "red", marginLeft:"3rem" , fontSize:"small"}}>Email is required and must be valid</p>
  </div>
)}
                  </div>
                  
                </div>
              </div>
            
              <div className="form-group row" >
                <label htmlFor="Mobile" className="control-label col-sm-4">
                  Mobile:
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-8 mb-3">
                  <input
                    type="tel"
                    id="Mobile"
                    className="form-control"
                    value={newContact.Mobile}
                    onChange={(e) =>{
                      setNewContact({
                        ...newContact,
                        Mobile: e.target.value,
                      })
                    }}
                    required
                  />
                  {(!mobileValid)&& <div className="d-flex justify-content-center align-items-center">
              <p style={{ color: "red",fontSize:"small"  }}>
              Invalid mobile number. Please enter 10 digits.
            </p>
             </div>}
                </div>
                
              </div>
              
             
              <div className="form-group row" >
                <label htmlFor="Landline" className="control-label col-sm-4">
                  Landline:
                </label>
                <div className="col-sm-8 mb-3">
                  <input
                    type="tel"
                    id="Landline"
                    className="form-control"
                    value={newContact.Landline}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        Landline: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="Fax" className="control-label col-sm-4">
                  Fax:
                </label>
                <div className="col-sm-8 mb-4">
                  <input
                    type="tel"
                    id="Fax"
                    className="form-control"
                    value={newContact.Fax}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        Fax: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
                <div className="d-flex justify-content-center">
                 
                  <Button
                    className="flat-button"
                    type="button"
                    onClick={handleAddContact}
                  >
                    Submit
                  </Button>
                  <Button
                  className="flat-button btn btn-danger"
                    size="sm"
                    type="button"
                    style={{marginLeft: "1rem" }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetailsForm;
