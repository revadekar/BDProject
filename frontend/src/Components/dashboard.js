import React, { useState } from 'react';
import { styled } from 'baseui';
import { FaBars } from 'react-icons/fa';
import Sidebar from './sidebar';
import CustomersComponent from './Items/customers';
import HomePage from './Items/HomePage';
import ContactDetailsForm from './Items/contactDetailsForm';
import Navbar from './Navbarr';
import { Button } from 'baseui/button';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const renderContent = () => {
    if (activeMenuItem === 'Customers') {
      return <CustomersComponent />;
    } else if (activeMenuItem === 'Contact Details') {
      return <ContactDetailsForm />;
    } else if (activeMenuItem === 'Home') {
      return <HomePage />;
    } else {
      return <HomePage />;
    }
  };

  return (
    <DashboardWrapper open={open}>
      <Navbar />
      <Sidebar open={open} setOpen={setOpen} setActiveMenuItem={setActiveMenuItem} />
      <DashboardContent>
        <FaBars color='black' onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }} />
        {renderContent()}
      </DashboardContent>
    </DashboardWrapper>
  );
};

export default Dashboard;

const DashboardWrapper = styled('section', ({ $theme, $open }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  backgroundColor: 'white',
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  maxWidth: '100vw',
  boxSizing: 'border-box',
  transition: 'margin-left 0.3s ease', // CSS transition for smooth opening/closing
  marginLeft: $open ? '285px' : '0', // Adjusted based on the open state
  '@media (max-width: 768px)': {
    marginLeft: '0',
  },
}));

const DashboardContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  padding: '1rem',
});
