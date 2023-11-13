import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.status === 200) {
                localStorage.setItem("ActiveUser",username);
                navigate("/dashboard");
            } else {
                // Handle invalid credentials here
                setErrorMessage('Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while logging in');
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">User Name</label>
                <input
                    className="form-group mb-2"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    type="text"
                    placeholder="Your username"
                    id="username"
                    name="username"
                />
                <label htmlFor="password">Password</label>
                <input
                    className="form-group mb-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                />
                <button type="submit">Log In</button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>
                Don't have an account? Register here.
            </button>
        </div>
    );
}
