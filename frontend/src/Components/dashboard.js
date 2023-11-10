import React, { useState } from 'react';
import { styled, useStyletron } from 'baseui';
import Sidebar from './sidebar';
import DashboardHeader from './dashboardHeader';
//import DashboardContent from './DashboardContent';
//import Navbar from './navbar';
import CustomersComponent from './Items/customers'; // Import the CustomersComponent
//import UsersComponent from './UsersComponent'; // Import the UsersComponent
import HomePage from './Items/HomePage';
import ContactDetailsForm from './Items/contactDetailsForm';

const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null); // Track active menu item

  const [css] = useStyletron();

  // Define a rendering function based on the active menu item
  const renderContent = () => {
    if (activeMenuItem === 'Customers') {
      return <CustomersComponent />;
    } else if (activeMenuItem === 'Contact Details') {
      return <ContactDetailsForm />;
    }else if(activeMenuItem === 'Home'){
        return <HomePage />;
    }else{
        return <HomePage />;
    }
    // Add more menu items as needed
    
  };

  return (
    <DashboardWrapper>
      {/* <Navbar
        className={css({
          zIndex: 2,
        })}
      /> */}
      <Sidebar open={open} setOpen={setOpen} setActiveMenuItem={setActiveMenuItem} /> {/* Pass setActiveMenuItem function to Sidebar */}
      <DashboardHeader open={open} setOpen={setOpen} />
      {renderContent()} {/* Render the content based on the active menu item */}
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
  paddingLeft: '285px',
  paddingRight: '2rem',
  width: '100%',
  minHeight: '100vh',
  maxWidth: '100vw',
  boxSizing: 'border-box',
  '@media (max-width: 768px)': {
    paddingLeft: '0',
  },
//   paddingTop: '6rem',
});
