import React, { useEffect, useState } from "react";

const Profile = () => {
    const [profile, setProfile] = useState('');

    useEffect(() => {
        const ActiveUser = localStorage.getItem('ActiveUser');

        fetch('http://localhost:5000/getUserProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ActiveUser }),
        })
            .then(response => response.json())
            .then(data => {
                setProfile(data[0]);
            })
            .catch(error => console.error('Fetch error:', error));
    }, []);

    return (
        <div id="profile" className="container mt-4">
            <div className="d-flex justify-content-start mb-4">
                <h2>Profile</h2>
            </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                       <form className="form-horizontal">
                        <div className='form-group row'>
                        <label htmlFor='name' className='control-label col-sm-4'> Name:</label>
                        <div className='col-sm-4' style={{textAlign:"left"}}>
                        <p className="card-text">{profile.name}</p>
                         </div>
                       </div>
                       <div className='form-group row' >
                        <label htmlFor='UserName' className='control-label col-sm-4'> User Name:</label>
                        <div className='col-sm-4'  style={{textAlign:"left"}}>
                        <p className="card-text">{profile.user_name}</p>
                         </div>
                       </div>
                       <div className='form-group row'>
                        <label htmlFor='UserRole' className='control-label col-sm-4'> Role:</label>
                        <div className='col-sm-4'  style={{textAlign:"left"}}>
                        <p className="card-text">{profile.role_name}</p>
                         </div>
                       </div>
                       </form>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Profile;
