import React from 'react';
import { styled, useStyletron } from 'baseui';
import logo from './assets/images/cdac1.png';

const Navbar = () => {
  const [css] = useStyletron();

  return (
    <NavbarWrapper>
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
      <NavLinks>
        <NavLink>Home</NavLink>
        <NavLink>About</NavLink>
        <NavLink>Contact</NavLink>
      </NavLinks>
    </NavbarWrapper>
  );
};

export default Navbar;

const NavbarWrapper = styled('nav', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  background: '#363740',
  color: '#f2f2f2',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  zIndex: '2',
  position: 'fixed', // Make the navbar fixed
  top: '0', // Stick it to the top
  width: '100%',
});

const Logo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.25rem',
  fontWeight: 'bold',
});

const NavLinks = styled('ul', {
  listStyle: 'none',
  display: 'flex',
  gap: '1rem',
});

const NavLink = styled('li', {
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer',
  ':hover': {
    color: 'lightblue',
  },
  margin: '0', // Reset margin
  padding: '0', // Reset padding
});
