import React, { useState } from "react";

export const Login = (props) => {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
       // console.log(email);
        try {
            console.log('response recived:' ,username,password);
            const response = await fetch('http://localhost:5000/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
            });
            // Handle the response from your server
          } catch (error) {
            console.error('Error:', error);
          }
          
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">User Name</label>
                <input value={username} onChange={(e) => setusername(e.target.value)}type="text" placeholder="your username" id="username" name="username" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}