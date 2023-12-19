import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const AddProjectForm = ({onCloseForm, onAddProject, setMessage}) => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [showFileAlert,setShowFileAlert]=useState(false);
  const [statusData, setStatusData]=useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [GroupData,setGroupData]=useState([]);
  const [employeeData, setEmployeeData]=useState([]);
  const [categoryData,setCategoryData]=useState([]);
  const [filePath,setFilePath]=useState('');
  const [errorMessage,setErrorMessage]= useState('');

  const [newProject, setNewProject] = useState({
    Project_Code: null,
    Project_Name: null,
    Project_Description: null,
    Product_Description: null,
    status_id: null,
    Cust_id: null,
    Emp_id: null,
    group_id: null,
    Purchase_order: null,
    Cat_id: null,
    project_document: null,
    Remarks: null,
  });

  const handleFileUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
     // Check if there's a previous file path
     if (filePath) {
      // If a previous file exists, send a request to delete it
      fetch('http://localhost:5000/deleteTempFile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result.message); // Log the deletion message
        })
        .catch((error) => {
          console.error('Error deleting previous file:', error);
        });
    }

     if(file){
      if (file.type !== 'application/pdf') {
        setShowFileAlert(true);
      } else {
        setShowFileAlert(false);
        const formData = new FormData();
        formData.append('file', file);
    
        // Proceed with uploading the new file
        fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              return response.json(); // Parse response as JSON
            } else {
              throw new Error('File upload failed');
            }
          })
          .then((result) => {
            console.log(result); // Log the server response
            setNewProject({ ...newProject, project_document: file.name });
            setFilePath(result.filePath); // Set the new file path
          })
          .catch((error) => {
            setErrorMessage('server error please try again later !');
            console.error('Error:', error); // Handle errors here
          });
      }

    }
  };

  const handleCancel = () => {
    console.log('filePath', filePath);
  
    // Send a request to the server to delete the temporary file
    fetch('http://localhost:5000/deleteTempFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filePath }), // Send the temp file path
    })
      .then((response) => {
        // Handle server response
        if (response.ok) {
          return response.json(); // Parse response as JSON
        } else {
          throw new Error('File deletion failed');
        }
      })
      .then((result) => {
        console.log(result.message); // Log the server response message
        // Additional handling after successful deletion
        onCloseForm();
      })
      .catch((error) => {
        console.error('Error:', error); // Handle errors here
        // Display an error message or perform error-related tasks
      });
      onCloseForm();
  };
  
  
  useEffect(() => {
    fetch("http://localhost:5000/getCustomers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomerData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch cities based on selected state
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
    
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/getGroups", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGroupData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/getCategories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategoryData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch cities based on selected state
    if (newProject.group_id) {
      const group_id=newProject.group_id;
      fetch('http://localhost:5000/getEmployeesByGroupId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ group_id }),
      })
        .then((response) => response.json())
        .then((data) => {
          setEmployeeData(data);
        })
        .catch((error) => {
          console.error('Error fetching cities:', error);
        });
    }
  }, [newProject.group_id]);


  const handleAddProject = () => {
    console.log("newProject", newProject);
    fetch('http://localhost:5000/addProject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newProject, filePath }),
    })
      .then((response) => {
        if (response.ok || response.status === 201 || response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          return response.json().then((data) => Promise.reject(data)); // Reject with specific data
        } else {
          return response.json().then((data) => Promise.reject(`Unable to add project details: ${data.message}`));
        }
      })
      .then((data) => {
        setMessage(data.message);
        setShowErrorMessage(false);
        onAddProject();
        onCloseForm();
      })
      .catch((error) => {
        setShowFileAlert(false);
        setShowErrorMessage(true);
        console.error('Error:', error);
      });
  };
  
  



  return (
    <div className='container-fluid'>
        {showErrorMessage && (
          <div className="custom-alert">
            <p className='error-message'>
              Unable to add project details.
            </p>
          </div>
        )}
        {errorMessage && (<div className='error-message'><p className='custom-alert'>{errorMessage}</p></div>)}
        <div className='d-flex justify-content-start mb-4 form1'>
          <div className='btn-group'>
          <Button type='button' className='flat-button' onClick={handleAddProject}>
                  Save
            </Button>
            <Button type='button' className='flat-button btn-danger' onClick={handleCancel}>
                  Cancel
            </Button>
          </div>
        </div>
        {showFileAlert && <div className='custom-alert'><p className='error-message'>Invalid file ! Please upload PDF files only </p></div>} 
      <div className='d-flex justify-content-start'>
         <div className='col-md-8 ' style={{marginRight: "1rem"}}>
          <div className='card userform'>
            <div className='card-body form1'>
              <form className='form-inline'>
              <div className="form-group row mb-4">
              <div className='col-md-6'>
                    <label htmlFor='Project_Code' className='control-label mb-2'>Project Code:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='Project_Code'
                      name='Project_Code'
                      value={newProject.Project_Code || ''}
                      onChange={(e) =>
                        setNewProject({ ...newProject, Project_Code: e.target.value })
                      }
                      placeholder='Enter Project Name'
                    />
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='Project_Name' className='control-label mb-2'>Project Name:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='Project_Name'
                      name='Project_Name'
                      value={newProject.Project_Name || ''}
                      onChange={(e) =>
                        setNewProject({ ...newProject, Project_Name: e.target.value })
                      }
                      placeholder='Enter Project Name'
                    />
                  </div>
                 
                </div>
                <div className="form-group row mb-4">
                <div className='col-md-6'>
                    <label htmlFor='Project_Description' className='control-label mb-2'>Project Description:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='Project_Description'
                      name='Project_Description'
                      value={newProject.Project_Description || ''}
                      onChange={(e) =>
                        setNewProject({ ...newProject, Project_Description: e.target.value })
                      }
                      placeholder='Enter Project Description'
                    />
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='Product_Description' className='control-label mb-2'>Product Description:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='Product_Description'
                      name='Product_Description'
                      value={newProject.Product_Description || ''}
                      onChange={(e) =>
                        setNewProject({ ...newProject, Product_Description: e.target.value })
                      }
                      placeholder='Enter Product Description'
                    />
                  </div>
                </div>
                <div className="form-group row mb-4">
                <div className='col-md-6'>
                    <label htmlFor='status_id' className='control-label mb-2'>Status:</label>
                    <select
                      className='form-select'
                      id='status_id'
                      name='status_id'
                      value={newProject.status_id || ''}
                      onChange={(e) =>
                        setNewProject({ ...newProject, status_id: e.target.value })
                      }
                    >
                      <option value='' disabled>Select Status</option>
                      {statusData && statusData.map((status)=>(
                            <option value={status.status_id}>{status.status_name}</option>
                        ))}
                    </select>
                  </div>
                   <div className='col-md-6'>
                    <label htmlFor='Cust_id' className='control-label mb-2'>Company Name:</label>
                    <select
                    className='form-select'
                    id='Cust_id'
                    name='Cust_id'
                    value={newProject.Cust_id || ''}
                    onChange={(e) =>
                      setNewProject({ ...newProject, Cust_id: e.target.value })
                    }
                    >
                        <option value='' disabled>Select Company</option>
                        {customerData.map((customer, index) => (
                        <option
                          key={index}
                          value={customer.Cust_id}
                        >
                          {customer.Cust_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='form-group row mb-4'>
                
                  <div className='col-md-6'>
                    <label htmlFor='Cat_id' className='control-label mb-2'>Category:</label>
                    <select
                    className='form-select'
                    id='Cat_id'
                    name='Cat_id'
                    value={newProject.Cat_id || ''}
                    onChange={(e) =>
                      setNewProject({ ...newProject, Cat_id: e.target.value })
                    }
                    >
                      <option value='' disabled>Select Category</option>
                      {categoryData.map((Cat, index) => (
                        <option
                          key={index}
                          value={Cat.Cat_id}
                        >
                          {Cat.Catgory_name}
                        </option>
                      ))}
                    </select>
                   </div>
                   <div className='col-md-6'>
                    <label htmlFor='Purchase_order' className='control-label mb-2'>Purchase Order:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='Purchase_order'
                      name='Purchase_order'
                      value={newProject.Purchase_order || ''}
                      onChange={(e) =>
                        setNewProject({ ...newProject, Purchase_order: e.target.value })
                      }
                      placeholder='Purchase order no'
                    />
                   </div>
                  </div>

                   <div className="form-group row mb-0">
                   <div className='col-md-6'>
                 <label htmlFor='Remarks' className='control-label mb-2'>Remarks:</label>
                 <input
                 type='text'
                  className='form-control'
                         id='Remarks'
                       name='Remarks'
                      value={newProject.Remarks || ''}
                   onChange={(e) =>
           setNewProject({ ...newProject, Remarks: e.target.value })
                      }
                      placeholder='Enter remarks'
                       />
                    </div>
                   <div className='col-md-6'>
                   <label htmlFor='project_document' className='control-label mb-2'>Project Document:</label>
                    {/* Message indicating accepted file types */}
                    {/* <p className='mb-1 text-muted'>Only PDF files are allowed.</p> */}
                    <input
                     className="form-control"
                      type="file"
                      accept='.pdf'
                      onChange={(e) => handleFileUpload(e.target.files)}
                    />
                       <div className="d-flex justify-content-end "><p className="text-muted">PDF files only</p></div> 
                     </div>

                </div>
                <div className="form-group row mb-4">

                  </div>

              </form>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card userform'>
            <div className='card-body '>
              <div className="form-group row ">
                <div className='mb-3'>
                    <label htmlFor='group_id' className='control-label mb-2'>Group Name:</label>
                    <select
                    className='form-select'
                    id='group_id'
                    name='group_id'
                    value={newProject.group_id || ''}
                    onChange={(e) =>
                      setNewProject({ ...newProject, group_id: e.target.value })
                    }
                    >
                        <option value='' disabled> Select Group</option>
                        {GroupData.map((Group, index) => (
                        <option
                          key={index}
                          value={Group.Group_id}
                        >
                          {Group.Group_Name}
                        </option>
                      ))}
                    </select>
                  </div>
                <div className='mb-2'>
                    <label htmlFor='Emp_id' className='control-label mb-2'>Employee Name:</label>
                    <select
                    className='form-select'
                    id='Emp_id'
                    name='Emp_id'
                    value={newProject.Emp_id || ''}
                    onChange={(e) =>
                      setNewProject({ ...newProject, Emp_id: e.target.value })
                    }
                    >
                       <option value='' disabled>Select Employee</option>
                       {employeeData.map((emp, index) => (
                        <option
                          key={index}
                          value={emp.Emp_id}
                        >
                          {emp.Employee_Name}
                        </option>
                      ))}
                    </select>
                    </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectForm;
