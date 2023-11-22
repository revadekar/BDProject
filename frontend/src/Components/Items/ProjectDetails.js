import React, { useEffect, useState } from "react";
import { FaFile, FaFilePdf } from "react-icons/fa";

const ProjectDetails = () => {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/getProjects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProjectData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-start mb-3">
        <h2>Project Details</h2>
      </div>
      <div className="table-responsive" style={{margin:"0.5rem"}}>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              {/* Add a custom class to style the font */}
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
          <tbody>
            {projectData.map((project) => (
              <tr key={project.Project_id}>
                <td className="responsive-font">{project.Project_Name}</td>
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
