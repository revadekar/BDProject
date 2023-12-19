import React, { useState,useRef,useEffect } from 'react';
import { styled, useStyletron } from 'baseui';
import logo from './assets/images/cdac1.png';
import SideNavListItem from './SideNavListItem';
import { menuData } from './assets/constants';
import { ChevronLeft, ChevronUp, ChevronDown } from 'baseui/icon';

const Sidebar = ({ open, setOpen, activeMenuItem, setActiveMenuItem,setShowFabar }) => {
  const [css] = useStyletron();
   setShowFabar(false);
   const [showScrollButtons, setShowScrollButtons] = useState(false);
   const sidebarRef = useRef(null);

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

    const handleChevronClick=async()=>{
      setOpen(false);
      setShowFabar(true);
    }

  const handleMenuItemClick = (title) => {
    setActiveMenuItem(title);
    //setOpen(false);
  };

  const handleScrollUp = () => {
    const sidebarElement = sidebarRef.current;
    sidebarElement.scrollTop -= 50; // Adjust the scrolling distance as needed
  };

  const handleScrollDown = () => {
    const sidebarElement = sidebarRef.current;
    sidebarElement.scrollTop += 50; // Adjust the scrolling distance as needed
  };

  useEffect(() => {
    // Check if sidebar content overflows
    const sidebarElement = sidebarRef.current;
    if (sidebarElement.scrollHeight > sidebarElement.clientHeight) {
      setShowScrollButtons(true);
    } else {
      setShowScrollButtons(false);
    }
  }, []);

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
             
 <Logo >
   <div>
     <img
       className={css({
        width: '5vw',
        height: '9vh',
      })}
      src={logo}
      alt="logo"
    />
    </div>
  <div>Business Process Management</div>
</Logo>



      <nav ref={sidebarRef}>
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
      {showScrollButtons && (
        <div className={css({ position: 'absolute', top: '50%', right: '0', transform: 'translateY(-50%)' })}>
          <ChevronUp size="1.5rem" onClick={handleScrollUp} />
          <ChevronDown size="1.5rem" onClick={handleScrollDown} />
        </div>
      )}
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
  position: 'fixed',
  top: '10vh',
  left: '0',
  width: '17vw',
  maxWidth: '250px',
  minWidth: '220px',
  height: '100%',
  maxHeight: '90vh',
  background: '#363740',
  zIndex: '1',
  overflowY: 'hidden', // Hide horizontal scrollbar
  padding: '0.0rem',
  color: 'grey',
  transition: 'left 2s ease, width 1s ease',
});

const Logo = styled('div', {
  marginTop: '2rem',
  marginBottom: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1rem',
  color: 'lightgray',
  fontWeight: 'bold',
  boxSizing: 'border-box',
  background: 'none',
  font: 'small-caption'
});