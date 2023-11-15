import React, { useState } from "react";
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
//import CustomerTable from "./Components/Items/customers";
import { Route, Routes } from "react-router-dom";
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
//import { useStyletron } from 'styletron-react';
import Dashboard from './Components/dashboard';
//import Profile from "./Components/Items/Profile";
//import Navbar from './Components/navbar';

const engine = new Styletron();

function App() {
  //const [css] = useStyletron();

  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login onFormSwitch={toggleForm} />} />
            <Route path="/register" element={<Register onFormSwitch={toggleForm} />} />
            <Route index element={currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />} />
          </Routes>
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
