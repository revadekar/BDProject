import React, { useEffect, useState } from 'react';
import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import { Layer } from 'baseui/layer';
import { ChevronDown, Delete, Overflow, Upload } from 'baseui/icon';
import { AppNavBar, setItemActive } from 'baseui/app-nav-bar';
import { useNavigate } from 'react-router-dom';
import { LightTheme,DarkTheme, ThemeProvider } from 'baseui';
import { createTheme } from 'baseui';

const primitives = {
  accent: '#F127E4', // hot pink
  accent700: '#600F5B',
};

const customTheme = createTheme(primitives);
export default function Example() {
  const [css] = useStyletron();
  const [activeUser, setActiveUser] = useState('');
  const Navigate = useNavigate();
  const THEME = {
    light: 'light',
    dark: 'dark',
  };
  const [theme, setTheme] = React.useState(THEME.light);  
  useEffect(() => {
    // Fetch the active user from localStorage when the component mounts
    setActiveUser(localStorage.getItem('ActiveUser'));
  }, []); // Empty dependency array ensures this effect runs only once

  const LogoutIcon = () => (
    <img
      src={require('./assets/images/logout.png')}
      alt="Logout"
      style={{ width: '24px', height: '24px' }} // Adjust the size as needed
    />
  );
  const [mainItems, setMainItems] = React.useState([
    { icon: Upload, label: 'Primary A' },
    { icon: Upload, label: 'Primary B' },
    {
      icon: ChevronDown,
      label: 'Primary C',
      navExitIcon: Delete,
      children: [
        { icon: Upload, label: 'Secondary A' },
        { icon: Upload, label: 'Secondary B' },
        { icon: Upload, label: 'Secondary C' },
        { icon: Upload, label: 'Secondary D' },
      ],
    },
    {
      icon: ChevronDown,
      label: 'Primary D',
      navExitIcon: Delete,
      children: [
        {
          icon: ChevronDown,
          label: 'Secondary E',
          children: [
            { icon: Upload, label: 'Tertiary A' },
            { icon: Upload, label: 'Tertiary B' },
          ],
        },
        { icon: Upload, label: 'Secondary F' },
      ],
    },
  ]);
  const userItems = [
    {
      icon: Overflow,
      label: 'Account item1',
    },
    {
      icon: LogoutIcon,
      label: 'Log Out',
      onClick: () => {
        // Add the logic to clear user session or perform any other necessary actions
        // and then navigate to the login page
         console.log('Logout clicked');  // Check if this log appears in the console
        localStorage.removeItem('ActiveUser');
         Navigate("/");
      },
    },
  ];
  const [isNavVisible, setIsNavVisible] = React.useState(false);

  function handleMainItemSelect(item) {
    setMainItems((prev) => setItemActive(prev, item));
  }

  return (
    <>
      <Button onClick={() => setIsNavVisible((prev) => !prev)}>
        {isNavVisible ? 'Hide' : 'Show'} navigation bar
      </Button>
      { (
        <Layer>
          <div
            className={css({
              boxSizing: 'border-box',
              width: '100vw',
              position: 'fixed',
              top: '0',
              left: '0',
            })}
          >
           
           <ThemeProvider theme={customTheme}>
            <AppNavBar
              title="Dashboard"
              mainItems={mainItems}
              userItems={userItems}
              onMainItemSelect={handleMainItemSelect}
              onUserItemSelect={(item) => item.onClick()}
              username={activeUser}
              usernameSubtitle={activeUser}
              userImgUrl=""
            />
      {/* <Button onClick={() => setTheme(theme === THEME.light ? THEME.dark : THEME.light)}>
        Toggle light/dark theme!
      </Button> */}
    </ThemeProvider>
          </div>
        </Layer>
      )}
    </>
  );
}
