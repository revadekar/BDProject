import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const EditProjectForm=({onEditProject, onCloseForm, editingProject})=>{
    const[statusData, setStatusData]=useState([]);
    const [updatedProjectData, setUpdatedProjectData] = useState(editingProject);

    console.log(editingProject);
    
  useEffect(() => {
    if (editingProject) {
      fetch('http://localhost:5000/getStatus', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      })
        .then((response) => response.json())
        .then((data) => {
          setStatusData(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [editingProject]);

    if (!editingProject) {
        // Handle the case where editingProject is undefined
        return <div className="d-flex justify-content-center "><span className="alert alert-danger">Some Error occurred </span><span className="d-flex justify-content-center" onClick={()=>onCloseForm()}style={{fontSize: "x-large",color:"white", cursor:"pointer"}}>&times;</span></div>; // or any other placeholder or message
      }else{

        const handleEditProject=()=>{
            const status_id= updatedProjectData.status_id=statusData.find((status)=>status.status_name===updatedProjectData.status_name).status_id;
            const Project_id=updatedProjectData.Project_id;
            fetch('http://localhost:5000/editProject', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({status_id, Project_id}),
              })
                .then((response) => response.json())
                .then((data) => {
                  // Handle the response from your server, you can update your state or perform any necessary actions
                  // For example, you can call `onAddCustomer` to add the new customer to your state
                 //onAddCustomer();
                 //setDataInserted(true);
                // onCloseForm();
                  onCloseForm();
                  onEditProject();
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
        }

    return(
        <div className="container-fluid userform">
            <div className="d-flex justify-content-center align-items-center">
            <div className="card col-sm-4 form1">
              <form className='form-horizontal'>
                <div className="form-group row mb-3">
                    <label  htmlFor='Project_Name' className='control-label col-sm-4 '>Project Name:</label>
                    <div className="col-sm-8">
                    <input className="form-control" value={editingProject.Project_Name} disabled></input>
                    </div>
                    
                </div>
                <div className="form-group row mb-3">
                    <label  htmlFor='Company_Name' className='control-label col-sm-4 '>Company Name:</label>
                    <div className="col-sm-8">
                    <input className="form-control" value={editingProject.Cust_name} disabled></input>
                    </div>
                    
                </div>
                <div className="form-group row mb-3">
                    <label  htmlFor='Group_Name' className='control-label col-sm-4 '>Group Name:</label>
                    <div className="col-sm-8">
                    <input className="form-control" value={editingProject.Group_Name} disabled ></input>
                    </div>
                    
                </div>
                <div className="form-group row mb-3">
                    <label  htmlFor='status_name' className='control-label col-sm-4 '>Status:</label>
                    <div className="col-sm-8">
                    <select className="form-select" 
                    value={updatedProjectData.status_name} 
                    onChange={(e) =>
                    setUpdatedProjectData({ ...updatedProjectData, status_name: e.target.value })}>
                        <option value={""} disabled>Select Status</option>
                        {statusData && statusData.map((status)=>(
                            <option value={status.status_name}>{status.status_name}</option>
                        ))}
                    </select>
                    </div>
                    
                </div>
                <div className="d-flex justify-content-center">
                    <Button type="button"  className=" flat-button" onClick={()=>handleEditProject()}>
                        Save
                    </Button>
                    <Button type="button" className="flat-button btn btn-danger"  style={{marginLeft:"1rem"}} onClick={()=>onCloseForm()}>
                        Cancel
                    </Button>
                </div>
              </form>
            </div>
            </div>
        </div>
    );
}
}

export default EditProjectForm;