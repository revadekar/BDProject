import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const AddProjectForm = () => {
  const [newProject, setNewProject] = useState({
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
    status_name: null,
    Group_Name: null,
    Cust_name: null,
    Employee_Name: null,
    Catgory_name: null,
  });

  return (
    <div className='container-fluid'>
        <div className='d-flex justify-content-start mb-3 form1'>
          <Button type='submit' className='flat-button'>
                  Save
            </Button>
        </div>
      <div className='d-flex justify-content-start'>
         <div className='col-md-8'>
          <div className='card userform'>
            <div className='card-body'>
              <form className='form-inline'>
                <div className="form-group row mb-3">
                  <div className='col-md-6'>
                    <label htmlFor='Project_Name' className='control-label'>Project Name:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='Project_Name'
                      name='Project_Name'
                      value={newProject.Project_Name || ''}
                      onChange={(e) =>
                        setNewProject({ ...newProject, Project_Name: e.target.value })
                      }
                    />
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='Project_Description'>Project Description:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='Project_Description'
                      name='Project_Description'
                      value={newProject.Project_Description || ''}
                      onChange={(e) =>
                        setNewProject({ ...newProject, Project_Description: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="form-group row mb-3">
                   <div className='col-md-6'>
                    <label htmlFor='Product_Description'>Product Description:</label>
                    <input
                    type='text'
                    className='form-control'
                    id='Product_Description'
                    name='Product_Description'
                    value={newProject.Product_Description || ''}
                    onChange={(e) =>
                      setNewProject({ ...newProject, Product_Description: e.target.value })
                    }
                    />
                  </div>
                  <div className='col-md-6'>
                  <label htmlFor='status_id'>Status:</label>
                  <select
                    className='form-select'
                    id='status_id'
                    name='status_id'
                    value={newProject.status_id || ''}
                    onChange={(e) =>
                      setNewProject({ ...newProject, status_id: e.target.value })
                    }
                  >
                    <option value='' disabled>
                      Select Status
                    </option>
                  </select>
                </div>
                </div>
                <div className="form-group row mb-3">
                   <div className='col-md-6'>
                    <label htmlFor='Cust_id'>Company Name:</label>
                    <select
                    className='form-select'
                    id='Cust_id'
                    name='Cust_id'
                    value={newProject.Cust_id || ''}
                    onChange={(e) =>
                      setNewProject({ ...newProject, Cust_id: e.target.value })
                    }
                    >
                        <option>Select Company</option>
                    </select>
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='group_id'>Group Name:</label>
                    <select
                    className='form-select'
                    id='group_id'
                    name='group_id'
                    value={newProject.group_id || ''}
                    onChange={(e) =>
                      setNewProject({ ...newProject, group_id: e.target.value })
                    }
                    >
                        <option>Select Group</option>
                    </select>
                  </div>
                </div>
                <div className='form-group row mb-3'>
                  <div className='col-md-6'>
                    <label htmlFor='Emp_id'>Employee Name:</label>
                    <select
                    className='form-select'
                    id='Emp_id'
                    name='Emp_id'
                    value={newProject.Emp_id || ''}
                    onChange={(e) =>
                      setNewProject({ ...newProject, Emp_id: e.target.value })
                    }
                    >
                        <option>Select Employee</option>
                    </select>
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='Cat_id'>Category:</label>
                    <select
                    className='form-select'
                    id='Cat_id'
                    name='Cat_id'
                    value={newProject.Cat_id || ''}
                    onChange={(e) =>
                      setNewProject({ ...newProject, Cat_id: e.target.value })
                    }
                    >
                        <option>Select Category</option>
                    </select>
                  </div>
                  </div>

                  <div className="form-group row mb-3">
                   <div className='col-md-4'>
                    <label htmlFor='Purchase_order' className='control-label'>Purchase Order:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='Purchase_order'
                      name='Purchase_order'
                      value={newProject.Purchase_order || ''}
                      onChange={(e) =>
                        setNewProject({ ...newProject, Purchase_order: e.target.value })
                      }
                    />
                   </div>
                   <div className='col-md-8'>
                    <label htmlFor='Remarks'>Remarks:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='Remarks'
                      name='Remarks'
                      value={newProject.Remarks || ''}
                      onChange={(e) =>
                        setNewProject({ ...newProject, Remarks: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="form-group row mb-3">
                    <div>
                        <input type='file'></input>
                    </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectForm;
