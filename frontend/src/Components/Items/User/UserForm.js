import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export const UserForm = ({ onSubmit,onCancel }) => {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [passwordMatchState, setPasswordMatchState] = useState("");
  const [username, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [roles, setRoles] = useState(null);
  const [roleId, setRoleId] = useState("");
  const[userNameValid,setUserNameValid]=useState(false);
  const[NameValid,setNameValid]=useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (roles !== null) {
      const selectedRole = roles.find((role) => role.role_name === userRole);
      setRoleId(selectedRole ? selectedRole.role_id : "");
    }
  }, [userRole, roles]);

  useEffect(() => {
    fetch("http://localhost:5000/getRoles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRoles(data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);
  const handleNameValidation = (e) => {
    const value = e.target.value;
    setName(value);
    const nameRegex = /^[a-zA-Z ]+$/;
  
    if (nameRegex.test(value)) {
      setNameValid(true); // Assuming setNameValid sets the validity state for the name
      setErrorMessage('');
    } else {

      setErrorMessage("*Name is not valid");
      setNameValid(false); // Assuming setNameValid sets the validity state for the name
    }
  };
  
  const handleChangeUsername = (e) => {
    const value = e.target.value;
    const alphanumericRegex = /^[a-zA-Z0-9]*$/; // Regex for alphanumeric characters
    const alphaRegex = /[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/;    // Regex to check for at least 3 alphabetic characters
    setUserName(e.target.value);
    if (value.length >= 3 && alphanumericRegex.test(value) && alphaRegex.test(value)) {
      // Validation passed
      setUserNameValid(true);
      setErrorMessage('');
    } else {
      // Validation failed
      
      setErrorMessage("*Username should be alphanumeric");
    }
  };
  
  const handleConfirmPasswordChange = (e) => {
    const newPassword = e.target.value;
    if (pass.length < 6) {
      setErrorMessage("*Password must be at least 6 characters long");
      return;
    }
    setConfirmPass(newPassword);
    setErrorMessage("");

    const match = pass === newPassword;
    setPasswordsMatch(match);

    if (match) {
      setPasswordMatchState("Passwords Matched !");
    } else {
      setPasswordMatchState("Passwords do not match");
    }
  };
const handleCancelClick=async(e)=>{
    onCancel();
}
  const handleSubmit = async (e) => {
    e.preventDefault();
     // Your existing password match check
     if(!NameValid){
      console.error("name is not valid");
      setErrorMessage("*Name is not valid");
      return;
     }
  if (!passwordsMatch) {
    console.error("Passwords do not match");
    return;
  }
  if(!userNameValid){
    console.error("Username is not valid");
    setErrorMessage("*Username is not valid");
    return;
  }

  // Additional validation checks
  if (name.trim() === '') {
    setErrorMessage("Please enter your name");
    return;
  }

  if (username.trim() === '') {
    setErrorMessage("Please enter a username");
    return;
  }

  if (pass.length < 6) {
    setErrorMessage("*Password must be at least 6 characters long");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, pass, roleId }),
    });

    if (response.status === 200) {
      setRegistrationSuccess(true);
      onSubmit();
    } else {
      console.error("Registration failed");
      setErrorMessage("Registration failed !");
    }
  } catch (error) {
    console.error("Error:", error);
    setErrorMessage("Server Error ! Please try after some time");
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center userform">
      <div className="card form1" >
        <div className="d-flex justify-content-center mb-3">
          <h2>Add User</h2>
        </div>
        
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {registrationSuccess ? (
          <p className="success-message">Registration successful!</p>
        ) : (
          <div className="d-flex justify-content-center " style={{textAlign:"start"}}>
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="form-group row mb-4" >
              <label htmlFor="role" className="control-label col-sm-4">
                Role:
              </label>
              <div className="col-sm-8 ">
              <select
                value={userRole}
                name="role"
                onChange={(e) => setUserRole(e.target.value)}
                id="role"
                className="form-select"
                required
              >
                <option value="" disabled>
                  Select Role
                </option>
                {roles &&
                  roles.map((role) => (
                    <option key={role.role_id}>{role.role_name}</option>
                  ))}
              </select>

              </div>
        
            </div>
            <div className="form-group row mb-4"  >
              <label htmlFor="name" className="control-label col-sm-4">
                Full Name:
              </label>
              <div className="col-sm-8 ">
              <input
                value={name}
                name="name"
                onChange={(e) => handleNameValidation(e)}
                id="name"
                className="form-control"
                placeholder="Full Name"
                required
              />
              </div>
            </div>

            <div className=" form-group row mb-4" >
              <label htmlFor="username" className="control-label col-sm-4">
                User Name:
              </label>
              <div className="col-sm-8 ">
              <input
                value={username}
                name="username"
                onChange={(e) => handleChangeUsername(e)}
                id="username"
                className="form-control"
                placeholder="User Name"
                required
              />
              </div>
            </div>

            <div className=" form-group row mb-4" >
              <label htmlFor="password" className="control-label col-sm-4">
                Password:
              </label>
              <div  className="col-sm-8 ">
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="********"
                id="password"
                name="password"
                className="form-control"
                required
              />
              </div>
            </div>

            <div className="form-group row " >
              <label htmlFor="confirmPassword" className="control-label col-sm-4">
                Confirm Password:
              </label>
              <div  className="col-sm-8 ">
              <input
                value={confirmPass}
                onChange={handleConfirmPasswordChange}
                type="password"
                placeholder="********"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                style={{ borderColor: passwordsMatch ? "green" : "red" }}
                required
              /><p

              className="error-message"
              style={{ color: passwordsMatch ? "green" : "red" , textAlign:"center"}}
            >
              {passwordMatchState}
            </p>
              </div>
            </div>
            <div className="d-flex justify-content-center form1" >
              <Button className="btn btn-primary flat-button  "  type="submit" >Submit</Button>
              <Button className="btn btn-danger flat-button"  type="button" onClick={handleCancelClick} style={{marginLeft: "1rem"}} >Cancel</Button>
            </div>
          </form>
          </div>
        )}
      </div>
    </div>
  );
};
