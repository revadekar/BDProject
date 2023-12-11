import React, { useState } from 'react';
import './assets/login.css';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        localStorage.setItem('ActiveUser', username);
        navigate('/dashboard');
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while logging in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="body" className="container-fluid">
      <div className="row justify-content-center align-items-center vh-100">
        
        <div  id='login-form' className="col-md-3">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form className="login-container" id="login-form" onSubmit={handleSubmit}>
            <h1 className="text-center mb-4">Login</h1>
            <div className="loginForm mb-5">
              <div className="d-flex justify-content-start">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
              </div>
              <div className='col-sm-12'>
              <input 
              className='form-control'      
                      value={username}
                         onChange={(e) => setusername(e.target.value)}
                            type="text"
                            placeholder="Your username"
                            id="username"
                            name="username"
                            required />
              </div>
              
            </div>

            <div className=" loginForm mb-5">
              <div className="d-flex justify-content-start">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
              </div>
              <div className='col-sm-12'>
              <input className="form-control" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="********"
                            id="password"
                            name="password"
                            required />
                    </div>
            </div>

            <Button  id="login-button" type="submit" className="w-100">
              {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
            </Button>

            {/* Uncomment the following lines when you implement these features */}
            {/* <div className="mt-3 d-flex justify-content-between">
              <a href="#" className="link-secondary">
                Forgot Password?
              </a>
              <span>|</span>
              <a href="#" className="link-secondary">
                Create an Account
              </a>
            </div> */}
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
