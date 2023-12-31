import { Button } from "baseui/button";
import React, { useEffect, useState } from "react";

export const Register = (props) => {
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [name, setName] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [passwordMatchState, setPasswordMatchState] = useState('');
  const [username, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [roles, setRoles] = useState(null);
  const [roleId, setRoleId] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (roles !== null) {
      const selectedRole = roles.find((role) => role.role_name === userRole);
      setRoleId(selectedRole ? selectedRole.role_id : '');
    }
  }, [userRole, roles]);

  useEffect(() => {
    fetch('http://localhost:5000/getRoles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setRoles(data);
      })
      .catch(error => console.error('Fetch error:', error));
  }, []);

  const handleConfirmPasswordChange = (e) => {
    const newPassword = e.target.value;
    setConfirmPass(newPassword);

    const match = pass === newPassword;
    setPasswordsMatch(match);

    if (match) {
      setPasswordMatchState('Passwords Matched !');
    } else {
      setPasswordMatchState('Passwords do not match');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, pass, roleId }),
      });

      if (response.status === 200) {
        setRegistrationSuccess(true);
      } else {
        console.error('Registration failed');
        setErrorMessage('Registration failed !');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Server Error ! Please try after some time');
    }
  }

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {registrationSuccess ? (
        <p className="success-message">Registration successful!</p>
      ) : (
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="role">Role</label>
          <select
            value={userRole}
            name="role"
            onChange={(e) => setUserRole(e.target.value)}
            id="role"
            required
          >
            <option value="" disabled>Select Role</option>
            {roles &&
              roles.map((role) => (
                <option key={role.role_id}>{role.role_name}</option>
              ))}
          </select>

          <label htmlFor="name">Full Name</label>
          <input
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Full Name"
            required
          />
          <label htmlFor="username">User Name</label>
          <input
            value={username}
            name="username"
            onChange={(e) => setUserName(e.target.value)}
            id="username"
            placeholder="User Name"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            value={confirmPass}
            onChange={handleConfirmPasswordChange}
            type="password"
            placeholder="********"
            id="confirmPassword"
            name="confirmPassword"
            style={{ borderColor: passwordsMatch ? 'green' : 'red' }}
            required
          />
          <p
            className="error-message"
            style={{ color: passwordsMatch ? 'green' : 'red' }}
          >
            {passwordMatchState}
          </p>
          <div className="d-flex justify-content-center ">
            <Button style={{ width: "inherit" }} type="submit">
              Register
            </Button>
          </div>
        </form>
      )}
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch('login')}
      >
        Already have an account? Login here.
      </button>
    </div>
  );
};
