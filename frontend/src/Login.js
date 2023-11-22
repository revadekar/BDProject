import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "baseui/button";

export const Login = (props) => {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
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
                localStorage.setItem("ActiveUser", username);
                navigate("/dashboard");
            } else {
                setErrorMessage('Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while logging in');
        }
    }

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center">
                <div className="auth-form-container col-md-8 col-lg-5">
                    <h2>Login</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="username">User Name</label>
                        <input
                            className="form-group mb-5 form-control"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            type="text"
                            placeholder="Your username"
                            id="username"
                            name="username"
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-group mb-5 form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="********"
                            id="password"
                            name="password"
                            required
                        />
                        <div className="d-flex justify-content-center ">
                            <Button style={{width:"inherit"}} type="submit">Log In</Button>
                        </div>
                    </form>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}
