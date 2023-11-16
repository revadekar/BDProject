import { Button } from "baseui/button";
import React, { useEffect, useState } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/getUsers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setUsers(data);
        })
        .catch(error => console.error('Fetch error:', error));
    }, []);

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
                            <td>{user.role_name}</td>
                            <td>
                                <Button size="compact">Edit</Button> 
                                <Button size="compact" style={{ backgroundColor: 'darkred',marginLeft:"0.3rem" }} >Delete</Button>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
