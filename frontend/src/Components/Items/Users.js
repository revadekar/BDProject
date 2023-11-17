import { Button } from "baseui/button";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/getUsers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      const activeUser = localStorage.getItem("ActiveUser");
      const filteredUsers = data.filter(user => user.user_name !== activeUser);
      setUsers(filteredUsers);
    })
    .catch(error => console.error('Fetch error:', error));
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user); // Copy user object to avoid direct mutation
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleSaveEdit = () => {
    // Implement your logic to save the edited user data
    // For example, make a request to update the user on the server
    // After saving, setEditingUser(null) to exit the edit mode
    setEditingUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Editing User before update:", editingUser);
    // setEditingUser((prevUser) => ({
    //   ...prevUser,
    //   [name]: value,
    // }));
    console.log("Editing User after update:", editingUser);
  };
  
  

  return (
    <div id="user" className="container mt-4">
      <div className="d-flex justify-content-start mb-4">
        <h2>Users</h2>
      </div>

      <table className="table table-bordered table-striped table-lg">
        <thead>
          <tr>
            <th>Name</th>
            <th>User Name</th>
            <th>Role Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.user_id}>
              <td>{editingUser === user ? <input type="text" name="name" value={editingUser ? editingUser.name : ''} onChange={handleInputChange} /> : user.name}</td>
              <td>{editingUser === user ? <input type="text" name="user_name" value={editingUser ? editingUser.user_name : ''} onChange={handleInputChange} /> : user.user_name}</td>
              <td>{editingUser === user ?<input type="text" name="role_name" value={editingUser ? editingUser.role_name : ''} onChange={handleInputChange} /> : user.role_name}</td>
              <td>
                {editingUser === user ? (
                  <>
                    <Button size="compact" onClick={handleSaveEdit}>Save</Button>
                    <Button size="compact" onClick={handleCancelEdit}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button size="compact" onClick={() => handleEditClick(user)}>Edit</Button>
                    <Button size="compact" style={{ backgroundColor: 'darkred', marginLeft: "0.3rem" }}>Delete</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
