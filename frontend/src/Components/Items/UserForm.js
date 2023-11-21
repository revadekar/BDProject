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

  const handleConfirmPasswordChange = (e) => {
    const newPassword = e.target.value;
    setConfirmPass(newPassword);

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
    if (!passwordsMatch) {
      console.error("Passwords do not match");
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
    <div className="d-flex justify-content-center align-items-center">
      <div className="card col-sm-4" style={{padding:"1rem"}}>
        <h2>Register</h2>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {registrationSuccess ? (
          <p className="success-message">Registration successful!</p>
        ) : (
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="form-group row mb-3" style={{ padding: "10px" }}>
              <label htmlFor="role" className="control-label col-sm-4">
                <h6>Role:</h6>
              </label>
              <div className="col-sm-6">
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
            <div className="form-group row mb-3"  style={{ padding: "10px" }}>
              <label htmlFor="name" className="control-label col-sm-4">
                <h6>Full Name:</h6>
              </label>
              <div className="col-sm-6">
              <input
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                id="name"
                className="form-control"
                placeholder="Full Name"
                required
              />
              </div>
            </div>

            <div className=" form-group row mb-3" style={{ padding: "10px" }}>
              <label htmlFor="username" className="control-label col-sm-4">
                <h6>User Name:</h6>
              </label>
              <div className="col-sm-6">
              <input
                value={username}
                name="username"
                onChange={(e) => setUserName(e.target.value)}
                id="username"
                className="form-control"
                placeholder="User Name"
                required
              />
              </div>
            </div>

            <div className=" form-group row mb-3" style={{ padding: "10px" }}>
              <label htmlFor="password" className="control-label col-sm-4">
                <h6>Password:</h6>
              </label>
              <div  className="col-sm-6">
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

            <div className="form-group row mb-3" style={{ padding: "10px" }}>
              <label htmlFor="confirmPassword" className="control-label col-sm-4">
                <h6>Confirm Password:</h6>
              </label>
              <div  className="col-sm-6">
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
              />
              </div>
            </div>

            <p
              className="error-message"
              style={{ color: passwordsMatch ? "green" : "red" }}
            >
              {passwordMatchState}
            </p>
            <div className="d-flex justify-content-center" style={{marginLeft:"3rem"}}>
              <Button size="sm" type="submit" >Submit</Button>
              <Button size="sm" type="button" onClick={handleCancelClick} style={{marginLeft: "1rem"}} >Cancel</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
