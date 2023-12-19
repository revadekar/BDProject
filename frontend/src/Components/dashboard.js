import React, { useState } from 'react';
import { styled, useStyletron } from 'baseui';
import Sidebar from './sidebar';
import DashboardHeader from './dashboardHeader';
import CustomersComponent from './Items/Customer/customers';
import HomePage from './Items/HomePage';
import ContactDetails from './Items/Contact/ContactDetails';
import Navbar from './Navbarr';
import Profile from './Items/User/Profile';
import Users from './Items/User/Users';
import EmployeeDetails from './Items/Employee/EmployeeDetails';
import ProjectDetails from './Items/Project/ProjectDetails';
import { ChevronRight } from 'baseui/icon';
import Templates from './Items/Templates/Template';

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
    } else if(activeMenuItem === 'Profile') {
      return <Profile />;
    }else if(activeMenuItem === 'Users'){
      return <Users/>
    }else if (activeMenuItem === 'Employee Details') {
      return <EmployeeDetails />;
    }else if (activeMenuItem === 'Project Details') {
      return <ProjectDetails/>;
    }else if (activeMenuItem === 'Templates') {
      return <Templates/>;
    }else{
      return <HomePage></HomePage>
    }
  };

  return (
    <DashboardWrapper className={`Dashboard ${css({  paddingLeft: open ? '285px' : '0' })}`}>
              <Navbar setActiveMenuItem={setActiveMenuItem} />
              {showFabar && (
          <ChevronRight
            style={{ position: 'fixed', top: '4rem' }}
            size='1.5vw'
            onClick={() => setOpen(!open)}
            cursor={'pointer'}
          />
        )}

            {open && <Sidebar open={open} setOpen={setOpen} setActiveMenuItem={setActiveMenuItem} setShowFabar={setShowFabar} />}
            <DashboardHeader open={open} setOpen={setOpen} />
            <div className=' dashboardContent'>
              {renderContent()}
            </div>
            
    </DashboardWrapper>
  );
};

export default Dashboard;

const DashboardWrapper = styled('section', {
  display: 'flex', 
  flexDirection: 'column',
  alignItems: 'flex-start',
  backgroundColor: '',
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  maxWidth: '100vw',
  boxSizing: 'border-box',
  '@media (max-width: 768px)': {
    paddingLeft: '0',
  },
  // paddingTop: '3rem',
  transition: 'padding-left 0.3s ease, margin-left 0.3s ease, width 0.3s ease', // Add transitions for other properties
});