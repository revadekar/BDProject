import React, { useState } from 'react';
import { styled, useStyletron } from 'baseui';
import Sidebar from './sidebar';
import DashboardHeader from './dashboardHeader';
import CustomersComponent from './Items/customers';
import HomePage from './Items/HomePage';
import ContactDetails from './Items/ContactDetails';
import Navbar from './Navbarr';
import { Button } from 'baseui/button';
import { FaBars } from 'react-icons/fa';

const Dashboard = () => {
  const [open, setOpen] = React.useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const[showFabar, setShowFabar]=useState(false);

  const [css] = useStyletron();

  const renderContent = () => {
    if (activeMenuItem === 'Customers') {
      return <CustomersComponent />;
    } else if (activeMenuItem === 'Contact Details') {
      return <ContactDetails />;
    } else if (activeMenuItem === 'Home') {
      return <HomePage />;
    } else {
      return <HomePage />;
    }
  };

  return (
    <DashboardWrapper className={ css({ paddingLeft: open ? '285px' : '0' })}>
      <Navbar />
      {open && <div ><Sidebar  open={open} setOpen={setOpen} setActiveMenuItem={setActiveMenuItem} setShowFabar={setShowFabar} /></div> }
      {showFabar &&<Button style={{position:"fixed"}} variant='outline-primary' onClick={() => setOpen(!open) }>
        <FaBars />
      </Button>}
      <DashboardHeader open={open} setOpen={setOpen} />
      {renderContent()}
    </DashboardWrapper>
  );
};

export default Dashboard;

const DashboardWrapper = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  backgroundColor: 'white',
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  maxWidth: '100vw',
  boxSizing: 'border-box',
  '@media (max-width: 768px)': {
    paddingLeft: '0',
  },
  paddingTop: '4rem',
  transition: 'padding-left 0.3s ease, margin-left 0.3s ease, width 0.3s ease', // Add transitions for other properties
});
