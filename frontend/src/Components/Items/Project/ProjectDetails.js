import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import EditProjectForm from "./EditProjectForm";
import { Button } from "baseui/button";

const ProjectDetails = () => {
    const [projectData, setProjectData] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [checkboxStates, setCheckboxStates] = useState({});
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [dataReceived,setDataReceived]=useState(false);
    const [error, setError] = useState(null);
    const[showEditProjectForm,setShowEditProjectForm]=useState(false);
    const [editingProject,setEditingProject]=useState(null);
    const[projectUpdated,setProjectUpdated]=useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/getProjects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjectData(data);
          setDataReceived(true);
        } else {
          console.log(data);
          console.error('Invalid data format. Expected an array.');
          setError('An error occurred while fetching data. Please try again later.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred while fetching data. Please try again later.');
      })
      
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred while fetching data. Please try again later.');
      });
  }, [projectUpdated]);

  useEffect(() => {
    // When projectData changes, update checkbox states
    const newCheckboxStates = {};
    projectData.forEach((project) => {
      newCheckboxStates[project.Project_id] = selectAllChecked;
    });
    setCheckboxStates(newCheckboxStates);
  }, [selectAllChecked, projectData]);

  useEffect(()=>{
    console.log('editingProject',editingProject);
  },[editingProject])

  const handleEdit = (projectId) => {
  // Logic to handle the edit action for the project with the given ID (projectId)
  projectId = Number(projectId); // Convert projectId to a number explicitly
  console.log('projectId:', projectId);

  console.log('projectData:', projectData);

  const foundProject = projectData.find((project) => project.Project_id === projectId);
  console.log('foundProject:', foundProject);

  setEditingProject(foundProject);
  setShowEditProjectForm(true);
};
  
  const handleDelete = () => {
    // Logic to handle the delete action for the selected projects
    // You can use the selectedProjects state to identify the projects to delete
    // Make sure to handle the deletion according to your backend or data management system
  };
  

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    const checkboxId = event.target.id;

    if (checkboxId === "selectAll") {
      setSelectAllChecked(checked);
    } else {
      setCheckboxStates({
        ...checkboxStates,
        [checkboxId]: checked,
      });

      // Update the selected projects list
      if (checked) {
        setSelectedProjects((prevSelectedProjects) => [
          ...prevSelectedProjects,
          checkboxId,
        ]);
      } else {
        setSelectedProjects((prevSelectedProjects) =>
          prevSelectedProjects.filter((id) => id !== checkboxId)
        );
      }
    }
  };

  const showEditDeleteOptions = selectedProjects.length === 1;
  const showDeleteOption = selectedProjects.length > 0;

  return (
    <div className="container-fluid" >
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex justify-content-start">
        <h2>Project Details</h2>
        </div>
        <div className="d-flex justify-content-end">
        {showEditDeleteOptions && (
          <Button size="compact" onClick={() => handleEdit(selectedProjects[0])}>
            Edit
          </Button>
        )}
        {showDeleteOption && (
          <Button size="compact" style={{marginLeft:"1rem"}} onClick={handleDelete}>Delete</Button>
        )}
        </div>
      </div>
      {showEditProjectForm && ( 
      <div className="popup">
        <EditProjectForm 
          editingProject={editingProject}
          onCloseForm={() => {
            setShowEditProjectForm(false);
            setEditingProject(null); // Reset editingContact when closing the form
          }}
          onEditProject={()=>{
            setShowEditProjectForm(false);
            setEditingProject(null); // Reset editingContact when closing the form
            setProjectUpdated(true); // Set datainserted to true when data is successfully inserted
          }}
          />

      </div>
      )}
     
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="table-responsive" >
        <table className="table table-bordered table-striped table-sm ">
          <thead className="thead-dark">
            <tr>
              <th className="responsive-font">
              <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="selectAll"
                checked={selectAllChecked}
                onChange={handleCheckboxChange}
              />
               <label className="form-check-label" htmlFor="selectAll">
               </label>
              </div>
              </th>
              <th>S.No.</th>
              <th className="responsive-font">Project Name</th>
              <th className="responsive-font">Project Description</th>
              <th className="responsive-font">Product Description</th>
              <th className="responsive-font">Status</th>
              <th className="responsive-font">Customer Name</th>
              <th className="responsive-font">Employee Name</th>
              <th className="responsive-font">Group Name</th>
              <th className="responsive-font">Purchase Order</th>
              <th className="responsive-font">Category</th>
              <th className="responsive-font">Project Document</th>
              <th className="responsive-font">Remarks</th>
             
            </tr>
          </thead>
          <tbody >
            {dataReceived && projectData.map((project,index) => (
              <tr key={project.Project_id}>
                <td className="responsive-font" >
               <div className="form-check">
              <input
               className="form-check-input"
               type="checkbox"
               id={`${project.Project_id}`} // Unique ID for each checkbox
               checked={checkboxStates[project.Project_id]} // Ensure it's not undefined
               onChange={handleCheckboxChange}
               />
              </div>
              </td>
                <td>{index+1}.</td>
                <td className="responsive-font" >{project.Project_Name}</td>
                <td className="responsive-font">{project.Project_Description}</td>
                <td className="responsive-font">{project.Product_Description}</td>
                <td className="responsive-font">{project.status_name}</td>
                <td className="responsive-font">{project.Cust_name}</td>
                <td className="responsive-font">{project.Employee_Name}</td>
                <td className="responsive-font">{project.Group_Name}</td>
                <td className="responsive-font">{project.Purchase_order}</td>
                <td className="responsive-font">{project.Catgory_name}</td>
                <td className="responsive-font" style={{textAlign:"center"}}>
                  {/* Show a link to the project document */}
                   <a href={`http://localhost:5000/getDocument/${project.project_document}`} target="_blank" rel="noopener noreferrer">
                   <FaFilePdf size={'2rem'} style={{color:"rebeccapurple"}} />
                   <span style={{ display: "block", marginTop: "0.3rem" }}>View PDF</span>
                  </a>
                </td>
                <td className="responsive-font">{project.Remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectDetails;
