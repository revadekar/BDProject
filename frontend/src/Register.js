import React, { useState } from "react";

export const Register = (props) => {
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [name, setName] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [passwordMatchState, setPasswordMatchState] = useState(''); // Use the useState hook
  const[username, setUserName]=useState('');
  

  const handleConfirmPasswordChange = (e) => {
    const newPassword = e.target.value;
    setConfirmPass(newPassword);

    // Check if the passwords match and update the state
    const match = pass === newPassword;
    setPasswordsMatch(match);

    // Update the password match state message
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
        body: JSON.stringify({ name, username, pass }),
      });

      if (response.status === 200) {
        setRegistrationSuccess(true);
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      {registrationSuccess ? (
        <p className="success-message">Registration successful!</p>
      ) : (
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name"  required/> 
          <label htmlFor="username">User Name</label>
          <input value={username} name="username" onChange={(e) => setUserName(e.target.value)} id="username" placeholder="UserName"  required/> 
          <label htmlFor="password">Password</label>
          <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" required />
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
          { <p className="error-message" style={{ color: passwordsMatch ? 'green' : 'red' }}>{passwordMatchState}</p>}
          <button type="submit">Register</button>
        </form>
      )}
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
  );
}
