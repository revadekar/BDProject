import { Button } from "baseui/button";
import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { UserForm } from "./UserForm";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState({});
  const[Roles,setRoles]=useState([]);
  const [changedRole,setChangedRole]=useState();
  const [changedRoleId,setChangedRoleId]=useState('');
  const[RoleChanged,setRoleChanged]=useState(false);
  const[userDeleted,setUserDeleted]=useState(false);
  const[showUserForm,setShowUserForm]=useState(false);
  const[userAdded,setUserAdded]=useState(false);
  const[showUsers,setShowUsers]=useState(true);

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
  }, [RoleChanged,userDeleted,userAdded]);


  const handleDeleteClick=(user)=>{
    const shouldDeleteRole = window.confirm('Are you sure to delete this user ?');
    if (shouldDeleteRole) {
      fetch('http://localhost:5000/deleteUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.user_id}),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response if needed
          setUserDeleted(true);
          // setShowPopup(true);

          // // Hide the popup after 1 second
          setTimeout(() => {
            setUserDeleted(false);
          }, 2000);
          
        })
        .catch(error => console.error('Fetch error:', error));
    }
  }

  const handleAddClick=()=>{
    setShowUsers(false);
    setShowUserForm(true);

  }
  const handleEditClick = (user) => {
    setEditingUser(user); // Copy user object to avoid direct mutation
  };

  const handleCancelEdit = () => {
    if (editingUser) {
      setChangedRole(editingUser.role_name);
      setEditingUser({});
    }
  };
  

  const handleSaveEdit = () => {
    setRoleChanged(false);
    const shouldChangeRole = window.confirm('Are you sure to change the role for this user ?');
    
    if (shouldChangeRole) {
      fetch('http://localhost:5000/editUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: editingUser.user_id, changedRoleId }),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response if needed
          setRoleChanged(true);

          // Hide the popup after 1 second
          setTimeout(() => {
            setRoleChanged(false);
          }, 2000);
          
        })
        .catch(error => console.error('Fetch error:', error));
    }
  
    setEditingUser({});
  };
  
  

  useEffect(() => {
    const selectedRole = Roles.find((role) => role.role_name === changedRole);
  
    // Check if selectedRole is defined before accessing its properties
    if (selectedRole) {
      setChangedRoleId(selectedRole.role_id);
    } else {
      // console.error(`Role not found for role_name: ${changedRole}`);
    }
  }, [changedRole, Roles]);

  

  return (
    <div id="user" className="container-fluid mt-4">
      {showUsers &&
      <div>
      <div className="d-flex justify-content-between">
      <div className="d-flex justify-content-start mb-4">
        <h2>Users</h2>
      </div>
      <div className="d-flex justify-content-end mb-4">
        <Button size="compact" style={{backgroundColor:"darkcyan"}} onClick={handleAddClick}>Add User</Button>
      </div>
      </div>
      {RoleChanged && (
        <div className="alert alert-success" style={{ position: "fixed", top: "4rem", width: "50%" }}>
          Role changed successfully!
        </div>
      )}
      {userDeleted && (
        <div className="alert alert-success" style={{ position: "fixed", top: "4rem", width: "50%" }}>
          User deleted successfully!
        </div>
      )}

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
              <td >
               {editingUser === user ? (
               <select
               className="form-select"
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
                    <Button size="compact"  style={{backgroundColor:"green" }} onClick={handleSaveEdit}>Save</Button>
                    <Button size="compact" style={{ marginLeft: "0.3rem" }} onClick={handleCancelEdit}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <FaPencilAlt
                      style={{cursor:"pointer", textDecoration:"underline"}}
                      className="text-primary mx-2"
                      onClick={() => handleEditClick(user)}
                    />
                    <FaTrash
                     style={{cursor:"pointer", textDecoration:"underline"}}
                      className="text-danger mx-2 "
                      onClick={() => handleDeleteClick(user)}
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table> </div>}
      {showUserForm && <UserForm onSubmit={() => { setShowUserForm(false); setUserAdded(true); setShowUsers(true)}} onCancel={() => {setShowUserForm(false); setShowUsers(true)}} />}

    </div>
  );
}

export default Users;
