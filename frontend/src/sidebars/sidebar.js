import React, { Component } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true, // Initially, the sidebar is open
    };
  }

  toggleSidebar = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { isOpen } = this.state;
    const sidebarClass = isOpen ? 'sidebar-container d-block' : 'sidebar-container d-none';

    return (
      <div className={sidebarClass}>
        <button className="toggle-button" onClick={this.toggleSidebar}>
          {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
        </button>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/customer" className="nav-link">
              Customer
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-link">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default SidebarComponent;
