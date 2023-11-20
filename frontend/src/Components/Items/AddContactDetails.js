import React, { useState, useEffect } from "react";
import { Button } from "baseui/button";

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
  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Validate each required field
    setNameValid(!!newContact.Name);
    setDesignationValid(!!newContact.Designation);
    setEmailValid(emailRegex.test(newContact.Email));
    setMobileValid(newContact.Mobile && /^\d{10}$/.test(newContact.Mobile));
  };

  const handleAddContact = () => {
    // Find the selected customer based on the name
    const selectedCustomer = customerData.find(
      (customer) => customer.Cust_name === newContact.Customer
    );

      // Validate each required field
    validateFields();

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
      <div className="container-fluid" style={{ color: "black", margin: "10px" }}>
        <h4>Add Contact</h4>
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
              Unable to add contact details. Please check your input.
            </p>
          </div>
        )}

        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <div className="card col-sm-6" style={{ paddingLeft: "1vw" }}>
            <form
              className="form-horizontal"
              style={{ padding: "10px", fontFamily: "serif", fontWeight: "bold" }}
            >
              <div className="form-group row" style={{ padding: "10px" }}>
                <label
                  htmlFor="Customer"
                  className="control-label col-sm-4"
                >
                  Customer Name:
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-8">
                  <div className="dropdown">
                    <select
                      id="Customer"
                      className="form-control dropdown-toggle"
                      value={newContact.Customer}
                      onChange={(e) =>
                        setNewContact({ ...newContact, Customer: e.target.value })
                      }
                      required
                    >
                      <option value="" disabled selected>
                        {" "}
                        Select Customer
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
              {!nameValid && (
                    <div className="invalid-feedback">Name is required.</div>
                  )}
              <div className="form-group row" style={{ padding: "10px" }}>
                <label htmlFor="Name" className="control-label col-sm-4">
                  Contact Person Name:
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-8">
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
                 
                </div>

              </div>
              {!designationValid && (
                    <div className="invalid-feedback">Designation is required.</div>
                  )}
              <div className="form-group row" style={{ padding: "10px" }}>
                <label htmlFor="Designation" className="control-label col-sm-4">
                  Designation:
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-8">
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
                </div>
              </div>
              {!emailValid && (
  <div className="d-flex justify-content-center align-items-center">
    <p style={{ color: "red" }}>Email is required and must be valid</p>
  </div>
)}
              <div className="form-group row" style={{ padding: "10px" }}>
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
                      value={newContact.Email}
                      onChange={(e) =>
                        setNewContact({ ...newContact, Email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              {!mobileValid && <div className="d-flex justify-content-center align-items-center">
              <p style={{ color: "red" }}>
              Invalid mobile number. Please enter 10 digits.
            </p>
             </div>}
              <div className="form-group row" style={{ padding: "10px" }}>
                <label htmlFor="Mobile" className="control-label col-sm-4">
                  Mobile:
                  <span className="text-danger">*</span>
                </label>
                <div className="col-sm-8">
                  <input
                    type="tel"
                    id="Mobile"
                    className="form-control"
                    value={newContact.Mobile}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        Mobile: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
             
              <div className="form-group row" style={{ padding: "10px" }}>
                <label htmlFor="Landline" className="control-label col-sm-4">
                  Landline:
                </label>
                <div className="col-sm-8">
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
              <div className="form-group row" style={{ padding: "10px" }}>
                <label htmlFor="Fax" className="control-label col-sm-4">
                  Fax:
                </label>
                <div className="col-sm-8">
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
              <div className="form-group row" style={{ padding: "10px" }}>
                <div className="col-sm-offset-2 col-sm-12">
                  <Button
                    size="compact"
                    type="button"
                    style={{ backgroundColor: "darkred" }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="compact"
                    type="button"
                    style={{ marginLeft: "10px", backgroundColor: "darkslategray" }}
                    onClick={handleAddContact}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetailsForm;
