import { Button } from "baseui/button";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const[Roles,setRoles]=useState([]);
  const [changedRole,setChangedRole]=useState();
  const [changedRoleId,setChangedRoleId]=useState('');

  useEffect(()=>{
    console.log(Roles);
  },[Roles]);
  useEffect(() => {
    
    fetch('http://localhost:5000/getRoles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setRoles(data);
    })
    .catch(error => console.error('Fetch error:', error));
    
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
    fetch('http://localhost:5000/editUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: editingUser.user_id, changedRoleId }),
    })
      .then(response => response.json())
      .then(data => {
        const activeUser = localStorage.getItem("ActiveUser");
        const filteredUsers = data.filter(user => user.user_name !== activeUser);
        setUsers(filteredUsers);
      })
      .catch(error => console.error('Fetch error:', error));
    setEditingUser(null);
  };
  

  useEffect(() => {
    console.log("Editing User after update:", editingUser);
    const selectedRole = Roles.find((role) => role.role_name === changedRole);
  
    // Check if selectedRole is defined before accessing its properties
    if (selectedRole) {
      setChangedRoleId(selectedRole.role_id);
      editingUser.role_name = changedRole;
    } else {
      console.error(`Role not found for role_name: ${changedRole}`);
    }
  }, [changedRole]);
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Editing User before update:", editingUser);
    setEditingUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
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
              <td>{user.name}</td>
              <td>{user.user_name}</td>
              <td>
               {editingUser === user ? (
               <select
               name="role_name"
               value={changedRole}
               onChange={(e) => setChangedRole(e.target.value)}
             >
              <option value='' disabled selected>Select Role</option>
               {Roles.map((role) => (
                 <option key={role.role_id} value={role.role_name}>
                   {role.role_name}
                 </option>
               ))}
             </select>
             ) : (user.role_name)}
             </td>
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
