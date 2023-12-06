import React, { useState } from 'react';
import { styled, useStyletron } from 'baseui';
import Sidebar from './sidebar';
import DashboardHeader from './dashboardHeader';
import CustomersComponent from './Items/Customer/customers';
import HomePage from './Items/HomePage';
import ContactDetails from './Items/Contact/ContactDetails';
import Navbar from './Navbarr';
import { Button } from 'baseui/button';
import { FaBars } from 'react-icons/fa';
import Profile from './Items/User/Profile';
import Users from './Items/User/Users';
import EmployeeDetails from './Items/Employee/EmployeeDetails';
import ProjectDetails from './Items/Project/ProjectDetails';
import {Client as Styletron} from 'styletron-engine-atomic'
import {Provider as StyletronProvider} from 'styletron-react';
import { ChevronRight } from 'baseui/icon';

const Dashboard = () => {
  const [open, setOpen] = React.useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const[showFabar, setShowFabar]=useState(false);
  const engine = new Styletron();
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
    }else{
      return <HomePage></HomePage>
    }
  };

  return (

     <DashboardWrapper className={`Dashboard ${css({ paddingLeft: open ? '285px' : '0' })}`}>
      <Navbar setActiveMenuItem={setActiveMenuItem} />
      {open && <div ><Sidebar  open={open} setOpen={setOpen} setActiveMenuItem={setActiveMenuItem} setShowFabar={setShowFabar} /></div> }
      {showFabar &&
      <div className='showSidebar'>
         <ChevronRight  style={{position:"fixed"}} size='1.5vw'  onClick={() => setOpen(!open) } cursor={'pointer'} />
         </div>
         }
      <DashboardHeader open={open} setOpen={setOpen} />
      <div className='container-fluid'>
      {renderContent()}
      </div>

    </DashboardWrapper>
    
  );
};

export default Dashboard;

const DashboardWrapper = styled('section', {
  display: 'flex',
  background: 'rgb(14, 151, 105)', // Set your desired background color here
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
