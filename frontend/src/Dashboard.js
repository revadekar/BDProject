import React from 'react';
import SidebarComponent from './sidebars/sidebar';
import NavBar from './navbars/navbar';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="">
          <header className="">
            <h2>Dashboard</h2>
            <div className="dropdown position-relative">
              <button className="btn btn-bd-primary" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                User Menu
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a className="dropdown-item" >Profile</a></li>
                <li><a className="dropdown-item" >Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" >Sign out</a></li>
              </ul>
            </div>
          </header>
          <div className="">
            <div className="">
              {<SidebarComponent/>}
            </div>
            <div className="">
              {/* Add content for the right side of the dashboard */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
