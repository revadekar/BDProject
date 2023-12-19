import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const FileUpload = ({ editingProject, onClose, onUpload ,setMessage}) => {

    const [showFileAlert,setShowFileAlert]=useState(false);
    const [projectDocument, setProjectDocument] = useState(editingProject.project_document);
    const [errorMessage,setErrorMessage]= useState('');
    const [filePath,setFilePath]=useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);

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
            onClose();
          })
          .catch((error) => {
            console.error('Error:', error); // Handle errors here
            // Display an error message or perform error-related tasks
          });
          onClose();
      };
      

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
                setProjectDocument(file.name);
                setFilePath(result.filePath); // Set the new file path
              })
              .catch((error) => {
                setErrorMessage('server error please try again later !');
                console.error('Error:', error); // Handle errors here
              });
          }

         }
      
      };


    // Handler for file change
    const handleFileChange = (event) => {
        const id=editingProject.Project_id;
        fetch('http://localhost:5000/uploadDocument', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ projectDocument, filePath , id}),
          })
            .then((response) => {
              if (response.ok || response.status === 201 || response.status === 200) {
                return response.json();
              } else if (response.status === 400) {
                return response.json().then((data) => Promise.reject(data)); // Reject with specific data
              } else {
                return response.json().then((data) => Promise.reject(`Unable to add project document: ${data.message}`));
              }
            })
            .then((data) => {
              setMessage(data.message);
              setShowErrorMessage(false);
              onUpload();
              onClose();
            })
            .catch((error) => {
              setShowErrorMessage(true);
              console.error('Error:', error);
            });
    };

    return (
        <div className="container-fluid">
             
             {errorMessage && (<div className='error-message'><p>{errorMessage}</p></div>)}
            <div className="d-flex justify-content-center userform ">
                
                <div className="card col-md-3 form1">
                    <div className="">
                    {showErrorMessage && (
                         <p className='error-message'>
                         Unable to upload document.
                            </p>
                         )}
                   
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
                                accept='.pdf'
                                onChange={(e) => handleFileUpload(e.target.files)}
                            />                            
                           <div className="d-flex justify-content-end"><p className="text-muted">PDF files only</p></div> 
                        </div>
                        {showFileAlert && <div ><p className='error-message'>Invalid file ! Please upload PDF files only </p></div>} 
                        <div className="d-flex justify-content-center mb-2">
                            <Button className="flat-button" onClick={handleFileChange}>Upload</Button>
                            <Button className="flat-button btn-danger" style={{marginLeft:"1rem"}} onClick={handleCancel}>Cancel</Button>

                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
