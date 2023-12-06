import React from 'react';
import { styled, useStyletron } from 'baseui';
import logo from './assets/images/cdac1.png';
import SideNavListItem from './SideNavListItem';
import { menuData } from './assets/constants';
import { ChevronLeft } from 'baseui/icon';

const Sidebar = ({ open, setOpen, activeMenuItem, setActiveMenuItem,setShowFabar }) => {
  const [css] = useStyletron();
 setShowFabar(false);
  const menuItemStyles = (title) =>
    css({
      padding: '5px',
      display: 'block',
      cursor: 'pointer',
      backgroundColor: activeMenuItem === title ? '#444' : 'transparent',
      // ':hover': {
      //   backgroundColor: '#444',
      // },
    });

    const handleChevronClick=(async)=>{
      setOpen(false);
      setShowFabar(true);
    }

  const handleMenuItemClick = (title) => {
    setActiveMenuItem(title);
    //setOpen(false);
  };

  return (
    <SidebarWrapper
      className={css({
        '@media (max-width: 768px)': {
          display: open ? 'block' : 'none',
           transition: 'left 0.3s ease, width 0.3s ease'
        },
      })}
    >
      <div
        className={css({
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          background: 'rgba(0, 0, 0, 0.5)',
          height: '100vh',
          zIndex: '-1',
          display: 'none',
          '@media (max-width: 768px)': {
            display: open ? 'block' : 'none',
          },
        })}
        onClick={() => {
          setActiveMenuItem(null);
          setOpen(false);
        }}
      />
      <Logo>
       
        <img
          className={css({
            width: '5rem',
            height: '4rem',
            marginRight: '0.5rem',
          })}
          src={logo}
          alt="logo"
        />
       P & SO Dashboard
      </Logo>
      <nav>
        <ul className={css({ listStyle: 'none', padding: 0,})}>
          {menuData.map(({ icon, title }, index) => (
            <li key={index}>
              <SideNavListItem >
                {icon}
                <div
                  className={menuItemStyles(title)}
                  onClick={() => handleMenuItemClick(title)}
                >
                  {title}
                </div>
              </SideNavListItem>
            </li>
          ))}
        </ul>
      </nav>
      <div
        className={css({
          position: 'absolute', // Position the icon absolutely
          top: '1rem', // Adjust top position as needed
          right: '1rem', // Adjust right position as needed
          cursor: 'pointer',
          //backgroundColor:"lightgray",
          boxShadow: "10px",
          color:"wheat",
          font:"caption",
        })}
        onClick={() => {
          //setActiveMenuItem(null);
          handleChevronClick();
          // setOpen(false);
          // setShowFabar(true);
        }}
      >
        <ChevronLeft size="1.5rem"  />
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled('section', {
  paddingTop:'2rem',
  position: 'fixed',
  top: '10vh',
  left: '0',
  width: '100%',
  maxWidth: '17vw',
  height: '100%',
  maxHeight:'91vh',
  background: '#363740',
  zIndex: '1',
  overflowX: 'auto',
  padding: '0.6rem',
  color: 'grey',
  transition: 'left 2s ease, width 1s ease'
});

const Logo = styled('div', {
  margin:'2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1rem',
  color: 'lightgray',
  fontWeight: 'bold',
  boxSizing: 'border-box',
  background: 'none',
});
