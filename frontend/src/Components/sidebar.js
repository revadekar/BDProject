import React from 'react';
import { styled, useStyletron } from 'baseui';
import logo from './assets/images/cdac1.png';
import SideNavListItem from './SideNavListItem';
import { menuData } from './assets/constants';

const Sidebar = ({ open, setOpen, activeMenuItem, setActiveMenuItem }) => {
  const [css] = useStyletron();

  const menuItemStyles = (title) =>
    css({
      padding: '10px 20px',
      display: 'block',
      cursor: 'pointer',
      backgroundColor: activeMenuItem === title ? '#444' : 'transparent',
      // ':hover': {
      //   backgroundColor: '#444',
      // },
    });

  const handleMenuItemClick = (title) => {
    setActiveMenuItem(title);
    setOpen(false);
  };

  return (
    <SidebarWrapper
      className={css({
        '@media (max-width: 768px)': {
          display: open ? 'block' : 'none',
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
            width: '4rem',
            height: '4rem',
            marginRight: '0.5rem',
          })}
          src={logo}
          alt="logo"
        />
        Dashboard
      </Logo>
      <nav>
        <ul className={css({ listStyle: 'none', padding: 0 })}>
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
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled('section', {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  maxWidth: '255px',
  height: '100vh',
  background: '#363740',
  zIndex: '1',
  overflowX: 'hidden',
  padding: '1rem',
  color: 'grey',
});

const Logo = styled('div', {
  padding: '2.5rem 2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.25rem',
  color: '#f2f2f2',
  fontWeight: 'bold',
  boxSizing: 'border-box',
  background: 'none',
});
