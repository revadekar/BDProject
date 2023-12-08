import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const FileUpload = ({ editingProject, onClose, onUpload }) => {
    const [projectDocument, setProjectDocument] = useState('');

    useEffect(() => {
        if (editingProject) {
            setProjectDocument(editingProject.project_document);
        }
    }, [editingProject]);

    if (!editingProject) {
        return (
            <div className="error-message">
                <p className="custom-alert">Project not selected</p>
            </div>
        );
    }

    // Handler for file change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Handle file upload logic
        // You can use 'onUpload' function to handle file upload process
        // For example:
        // onUpload(file);
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center userform popup">
                <div className="card col-md-3 form1">
                    <div className="">
                    <form>
                        <div className="form-group mb-3">
                            <label className="mb-2">Project Name:</label>
                            <input
                                className="form-control"
                                value={editingProject.Project_Name}
                                disabled
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label className="mb-2">Upload Document:</label>
                            <input
                                className="form-control"
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                            />                            
                           <div className="d-flex justify-content-end"><p className="text-muted">PDF files only</p></div> 
                        </div>
                        <div className="d-flex justify-content-center mb-2">

                            <Button className="flat-button">Upload</Button>
                            <Button className="flat-button btn-danger" style={{marginLeft:"1rem"}} onClick={()=>{onClose()}}>Cancel</Button>

                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
