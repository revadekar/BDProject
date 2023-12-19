import React, { useEffect, useState } from "react";
import { FaFilePdf, FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import EditProjectForm from "./EditProjectForm";
import { Button } from "baseui/button";
import { DeleteAlt, Upload } from "baseui/icon";
import AddProjectForm from "./AddProjectForm";
import FileUpload from "./FileUpload";

const ProjectDetails = () => {
    const [projectData, setProjectData] = useState([]);
    const [datainserted, setDataInserted]=useState(false);
    const [dataDeleted, setDataDeleted]=useState(false);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [dataReceived,setDataReceived]=useState(false);
    const [error, setError] = useState(null);
    const [showEditProjectForm,setShowEditProjectForm]=useState(false);
    const [editingProject,setEditingProject]=useState(null);
    const [projectUpdated,setProjectUpdated]=useState(false);
    const [ showProjects,setShowProjects]=useState(true);
    const [showAddProjectForm, setShowAddProjectForm]=useState(false);
    const [ErrorMessage,setErrorMessage]=useState(false);
    const [message, setMessage]=useState('');
    const [showFileUpload,setShowFileUpload]=useState(false);

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
  }, [datainserted, projectUpdated, dataDeleted]);



  useEffect(() => {
    // Use setTimeout to reset dataInserted after a delay
    if (datainserted|| projectUpdated ||dataDeleted) {
      const timeout = setTimeout(() => {
        setDataInserted(false);
        setProjectUpdated(false);
        setDataDeleted(false);
      }, 3000); // Adjust the delay (in milliseconds) as needed
      return () => clearTimeout(timeout); // Cleanup the timeout on unmount
    }
  }, [projectUpdated, dataDeleted,datainserted]);


  const handleFileUpload=(projectId)=>{
console.log('projectId',projectId);
    const selectedProject=projectData.find((project)=>project.Project_id===projectId);
    console.log('selectedProject',selectedProject);
    setEditingProject(selectedProject);
    setShowFileUpload(true);

  }

  const handleEditProject=()=>{
    setProjectUpdated(false);

    const selectedProject = projectData[selectedProjects]; // Accessing value at the given index
    console.log('selectedProject:', selectedProject);
    
    setEditingProject(selectedProject);
    setShowEditProjectForm(true);
    
  }

  const handleClearProjects=()=>{
    setSelectedProjects([]);
    setSelectAllChecked(false);
  }

  const handleDeleteProject=()=>{
    const confirmDelete=window.confirm("Are you sure to delete this customer ?");
    if(confirmDelete){
      deleteSelectedProjects();
    }else{
      setSelectedProjects([]); 
    }
  }
  
  const deleteSelectedProjects = async () => {
    setDataDeleted(false);
    try {
      const selectedProjectIds = selectedProjects.map(
        (index) => projectData[index].Project_id
      );
  
      const response = await fetch('http://localhost:5000/deleteProject', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedProjectIds }),
      });
  
      if (response.ok) {
        setSelectedProjects([]); // Clear selected customers after deletion
        setDataDeleted(true);
      } else {
        setErrorMessage('Unable to delete project');
        setTimeout(() => {
        setErrorMessage('');
      }, 2000);
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      setErrorMessage('Unable to delete project ');
      console.error('Error:', error);
    }
  };
  

 // Function to handle the "Select All" checkbox change
 const handleSelectAllChange = (event) => {
  setSelectAllChecked(event.target.checked);
  // Update the selectedCustomers state based on the "Select All" checkbox
  setSelectedProjects(
    event.target.checked ? [...Array(projectData.length).keys()] : []
  );
  
};

   // Function to handle selection or deselection of customers
   const handleSelectProject = (index) => {
    const isSelected = selectedProjects.includes(index);
    setSelectedProjects((prevSelected) =>
      isSelected
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
  };


  return (
    <div className="container-fluid" >
       {ErrorMessage && 
          <div className='d-flex justify-content-center custom-alert'>
        <p className='error-message'>{ErrorMessage}</p>
        </div>
        }
       {projectUpdated && (
        <div className="d-flex justify-content-center align-items-center">
        <div className='custom-alert success' >
          Project details updated successfully!
        </div>
       </div>
         )}
     {dataDeleted && (
       <div className="d-flex justify-content-center align-items-center">
         <div className='custom-alert success' >
           Project details deleted successfully!
          </div>
         </div>
       )}
  
  {datainserted && (
         <div className="d-flex justify-content-center align-items-center">
         <div className='custom-alert success' >
           {message}
         </div>
       </div>
      )}


      {showAddProjectForm && <AddProjectForm
        setMessage={setMessage}
        onCloseForm={() => {
          setShowAddProjectForm(false);
          setShowProjects(true);
          //setDataInserted(false); // Reset datainserted when closing the form
        }}
        onAddProject={() => {
          setDataInserted(true); // Set datainserted to true when data is successfully inserted
        }}
        
      />} {/* Render the form when showForm is true */}

      {showFileUpload && 
      <div className="popup">
        <FileUpload 
         editingProject={editingProject} 
         setMessage={setMessage}


        onClose={()=>{ 
        setShowFileUpload(false);
        setEditingProject(null);   

       }} 

        onUpload={()=>{ 
          setSelectedProjects([]);
          setShowFileUpload(false);
          setProjectUpdated(true);
        }}
        />
        </div>

      }

      {showProjects && (
        <>
        {error && <p className="error-message">{error}</p>}
      <div className="d-flex justify-content-between align-items-center">
  <div className="d-flex justify-content-start my-2 form1">
    {selectedProjects.length === 1 && (
      <Button className='button' onClick={() => handleEditProject()}>
        <FaPencilAlt />
        <span>&nbsp;</span>
        Edit
      </Button>
    )}
    {selectedProjects.length > 0 && (
      <>
        <Button className='button' style={{ marginLeft: "1rem" }} onClick={handleDeleteProject}>
          <FaTrash />
          <span>&nbsp;</span> Delete
        </Button>
        <Button className='button' type="button" onClick={handleClearProjects} style={{ marginLeft: "1rem" }}>
          <DeleteAlt size={'20px'} />
          <span>&nbsp;</span>
          Clear
        </Button>
      </>
    )}
  </div>
  <div className='d-flex justify-content-center' style={{position:"absolute", marginLeft:"34vw"}}>
  <h3>Project Details</h3>
  </div>
  <div className='d-flex justify-content-end my-2 form1' style={{ marginRight: '1vw' }}>
    <Button className='button' onClick={() => { setShowAddProjectForm(true); setShowProjects(false) }}>
      <FaPlus />
      <span>&nbsp;</span> Add Project
    </Button>
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
            setSelectedProjects([]);
            setProjectUpdated(true); // Set datainserted to true when data is successfully inserted
          }}
          />

      </div>
      )}
           <div className="table-responsive" >
           <table className="table table-bordered table-striped ">
             <thead className="thead-dark">
               <tr>
                 <th className="responsive-font">
                 <div className="form-check">
                 <input
                  id='selectAll'
                  className='form-check-input'
                  type='checkbox'
                  checked={selectAllChecked}
                  onChange={handleSelectAllChange}
                  />
                  <label className="form-check-label" htmlFor="selectAll">
                  </label>
                 </div>
                 </th>
                 <th>S.No.</th>
                 <th className="responsive-font">Project Code</th>
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
                 <tr key={index}>
                   <td className="responsive-font" >
                  <div className="form-check">
                  <input 
                   className='form-check-input' 
                   type='checkbox' 
                   onChange={() => handleSelectProject(index)} 
                   checked={selectedProjects.includes(index)}
                  />
                 </div>
                 </td>
                   <td>{index+1}.</td>
                   <td className="responsive-font">{project.Project_Code}</td>
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
                     {project.project_document ?
                     <a href={`http://localhost:5000/getDocument/${project.project_document}`} target="_blank" rel="noopener noreferrer">
                      <FaFilePdf size={'2rem'} style={{color:"rebeccapurple"}} />
                      <span style={{ display: "block", marginTop: "0.3rem" }}>View PDF</span>
                     </a> :
                     <button className="btn btn-link" onClick={() => handleFileUpload(project.Project_id) }> 
                        <Upload size={'30px'}/><br/>
                        Upload
                    </button>
                     }
                   </td>
                   <td className="responsive-font">{project.Remarks}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
         </>
      )}
    </div>
  );
}

export default ProjectDetails;
