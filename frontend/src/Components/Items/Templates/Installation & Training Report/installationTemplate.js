import React, { useState } from 'react';
import { Form, Button, Table, Tooltip , OverlayTrigger } from 'react-bootstrap';
import ReviewForm from './ReviewForm'; // Import the ReviewForm component
import { FaPlus, FaTrash } from 'react-icons/fa';
import generatePDF from '../generatePdf';
import GeneratePDF2 from '../GeneratePDF2';
import InstallationAndTrainingReportPDF from './InstallationAndTrainingReportPDF';

const InstallationTrainingReportForm = ({ onCancel }) => {

  const [reviewMode, setReviewMode] = useState(false); // State to control review/edit modes
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [PDFGenerated, setPDFGenerated] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    endUserName: '',
    designation: '',
    telNo: '',
    invoiceNo: '',
    fromDate: '',
    toDate: '',
    satisfied: '' ,
    HeadSignature: null,
    EngineerSignature: null,
    tableData: [{ id: 1, slNo: '', productName: '', productSerialNo: '', remarks: '' }],

});


  const handleInputChange = (e, id) => {

    const { name, value } = e.target;
    const updatedTableData = formData.tableData.map((row) =>
      row.id === id ? { ...row, [name]: value } : row
    );
    setFormData({ ...formData, tableData: updatedTableData });

  };

  const handleHeadSignature = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, HeadSignature: file });
  };

  const handleEngineerSignature = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, EngineerSignature: file });
  };

  const addTableRow = () => {
    const newId = formData.tableData.length + 1;
    setFormData({
      ...formData,
      tableData: [
        ...formData.tableData,
        { id: newId, slNo: '', productName: '', productSerialNo: '', remarks: '' },
      ],
    });
  };

  const deleteTableRow = (id) => {
    const updatedTableData = formData.tableData.filter((row) => row.id !== id);
    setFormData({ ...formData, tableData: updatedTableData });
  };

  const handleCancel = () =>{
    onCancel();
    
  }

  const handleReview = () => {
    const formattedFromDate = formData.fromDate ? new Date(formData.fromDate).toLocaleDateString('en-GB') : ''; // Check for empty string before formatting
    const formattedToDate = formData.toDate ? new Date(formData.toDate).toLocaleDateString('en-GB') : ''; // Check for empty string before formatting
  
    setFormData({ ...formData, fromDate: formattedFromDate, toDate: formattedToDate });
  
    if (formData.customerName !== '') {
      setShowForm(false);
      setReviewMode(true);
      setMessage('');
      return;
    }
    setMessage('Please fill in the form');
  };
  

  const handleEdit = () => {
    // Allow users to edit the form again
    setReviewMode(false); // Switch back to edit mode
    setShowForm(true);
  };

  const handlePDFDownload = () => {
    //  generatePDF(formData, InstallationAndTrainingReportTemplate);
    // generatePDF2(formData);
    setFormSubmitted(false);
    setPDFGenerated(true);
    setCountdown(5); // Initialize countdown to 5 seconds
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1); // Decrement countdown
    }, 1000); // Update countdown every second
  
    setTimeout(() => {
      clearInterval(countdownInterval); // Clear the interval when countdown is complete
      setPDFGenerated(false);
      onCancel();
    }, 5000); // After 5 seconds, clear interval and perform other actions
  };

  const handleSubmit = () => {
    //generatePDF(formData, InstallationAndTrainingReportTemplate);
    setReviewMode(false);
    setFormSubmitted(true);
    console.log(formData);
  };
  
  
  return (
 <div className='container-fluid'>
    {PDFGenerated && 
    <div className='d-flex justify-content-center'>
        <div className='alert alert-success col-md-6'>
        <span>PDF has been generated successfully. <br></br> Redirecting to templates in {countdown} seconds</span>
      </div>
    </div>
     }
   {formSubmitted && (
     <div>
      <div className='d-flex justify-content-start form1'>
        <Button className='button' onClick={handleCancel}>Go Back</Button>
        </div>

        <div className='d-flex justify-content-center'>
         <div className='alert alert-success col-md-6'>
          <span>Form has been submitted successfully.</span><br></br>
          <GeneratePDF2 formData={formData} Template={InstallationAndTrainingReportPDF} FileName = 'Installation And Training Report.pdf'/>
          <p>
            {/* <a href='#'  onClick={handlePDFDownload}>
              Click here 
            </a>  to download PDF */}
          </p>
        </div>
       </div>
      </div>

    )}

     {reviewMode && // Conditionally render the review form
         <ReviewForm formData={formData} onSubmit={handleSubmit} onEdit={handleEdit} />}

   {showForm && 
   <>
  {message && (<div className='custom-alert'><p className='error-message'> {message} </p> </div>)}
   <div className='d-flex justify-content-start mb-3 form1'>
    <div className='btn-group'>
     <Button className='flat-button' variant='primary'  onClick={handleReview}>
            Save & Review
          </Button>
          <Button className='flat-button' variant='danger' onClick={handleCancel}>
           Cancel
          </Button>
      </div>
    </div>
   <div className='d-flex justify-content-center'>
     <div className='card col-md-12 '>
      <div className='card-body '>
      <Form id="InstallationForm">
       <div className='userform'>
        <div className='d-flex justify-content-center'>
        <h4>Installation & Training Report </h4>
        </div>

      </div>
  <div className=' userform'>
      <Form.Group controlId="customerName" className='mb-3'>
        <Form.Label>Name of the Customer:</Form.Label>
        <Form.Control
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
        />
      </Form.Group>

      <Form.Group controlId="address" className='mb-3'>
        <Form.Label>Address:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </Form.Group>

      <Form.Group controlId="endUserName" className='mb-3'> 
        <Form.Label>End User Name:</Form.Label>
        <Form.Control
          type="text"
          name="endUserName"
          value={formData.endUserName}
          onChange={(e) => setFormData({ ...formData, endUserName: e.target.value })}
        />
      </Form.Group>

      <Form.Group controlId="designation" className='mb-3'>
        <Form.Label>Designation:</Form.Label>
        <Form.Control
          type="text"
          name="designation"
          value={formData.designation}
          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="telNo" className='mb-3'>
        <Form.Label>Tel No:</Form.Label>
        <Form.Control
          type="text"
          name="telNo"
          value={formData.telNo}
          onChange={(e) => setFormData({ ...formData, telNo: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="invoiceNo" className='mb-3'>
        <Form.Label>Invoice No:</Form.Label>
        <Form.Control
          type="text"
          name="invoiceNo"
          value={formData.invoiceNo}
          onChange={(e) => setFormData({ ...formData, invoiceNo: e.target.value })}
        />
      </Form.Group>
      <div className='d-flex justify-content-start '>
        <div className='col-sm-4 ' style={{ marginRight:"5rem"}}>
        <Form.Group  controlId="fromDate" className='mb-3'>
        <Form.Label>Training from Date:</Form.Label>
        <Form.Control
          type="date"
          name="fromDate"
          value={formData.fromDate}
          onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
        />
      </Form.Group>
        </div>
        <div className='col-sm-4'>
        <Form.Group controlId="toDate" className='mb-3'>
        <Form.Label>To Date:</Form.Label>
        <Form.Control
          type="date"
          name="toDate"
          value={formData.toDate}
          onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
        />
      </Form.Group>
        </div>
      </div>
 
      </div>
      <span className='d-flex justify-content-end' >
                    <OverlayTrigger
                placement='top'
                   overlay={<Tooltip id='tooltip-add-row'>Add Row</Tooltip>}
                    >
                    <div style={{ display: 'inline-block' ,  textAlign: 'end'}} >
                      <FaPlus onClick={addTableRow} style={{ cursor: 'pointer' }} />
                     </div>
                   </OverlayTrigger>
                    </span>
      <Table striped  className='mb-4'>
        
        <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Product name with Configuration</th>
                  <th>Product Serial No</th>
                  <th>Remarks</th>
                  <th>Action</th>
                </tr>
                
              </thead>
              
              <tbody>
                {formData.tableData.map((data,index) => (
                     <>
                  <tr key={data.id}>
                    <td>
                        { data.slNo= `${index + 1}.` }
                    </td>
                    <td>
                    <Form.Control
                        type='text'
                        name='productName'
                        value={data.productName}
                        onChange={(e) => handleInputChange(e, data.id)}
                      />

                    </td>
                    <td>
                    <Form.Control
                        type='text'
                        name='productSerialNo'
                        value={data.productSerialNo}
                        onChange={(e) => handleInputChange(e, data.id)}
                      />

                    </td>
                    <td>
                    <Form.Control
                        type='text'
                        name='remarks'
                        value={data.remarks}
                        onChange={(e) => handleInputChange(e, data.id)}
                      />

                    </td>
                    <td>
                    <div className='d-flex justify-content-center form1'>
                      <OverlayTrigger
                       placement='top'
                         overlay={<Tooltip id={`tooltip-delete-${index}`}>Delete Row</Tooltip>}
                           >
                      <Button className='flat-button btn-danger'>
                      <FaTrash onClick={() => deleteTableRow(data.id)} />
                     </Button>
                    </OverlayTrigger>
                     </div>
                    </td>
                  </tr>
                  </>

                ))}
              </tbody>
            </Table>
        <div className='userform mb-3'>
            <Form.Group  controlId="satisfied" className='mb-3'>
            <div className='d-flex justify-content-start'>
                <div className='col-sm-6'>
                  <Form.Label>TRAINING HAS BEEN COMPLETED UPTO CUSTOMER SATISFACTION:</Form.Label>
                </div>
                <div className='col-sm-4'>
                <Form.Select
                    name="satisfied"
                   value={formData.satisfied}
                onChange={(e) => setFormData({ ...formData, satisfied: e.target.value })}
              >
            <option value="">Select</option>
               <option value='YES'>Yes</option>
           <option value='NO'>No</option>
           </Form.Select>
                </div>
                </div>
         </Form.Group>
             
      </div>
      

            
         <div className='userform mb-3'>
            <div className='mb-4'>
            <Form.Group   controlId='signature' className='mb-3'>
            <div className='row '>
                <div className='col-sm-4'>
                <Form.Label >Signature of Head:</Form.Label>
                </div>
                <div className='col-sm-6'>
                <Form.Control
                type='file'
                name='signature'
              accept='image/*' // Allow only image files
               onChange={handleHeadSignature}
                />
                 </div>
            </div>
        </Form.Group>
            </div>

        <Form.Group controlId='signature' className='mb-3'>
        <div className='row '>
        <div className='col-sm-4'>
        <Form.Label>Signature of Engineer :</Form.Label>
         </div>
          <div className='col-sm-6'>
          <Form.Control
            type='file'
            name='signature'
            accept='image/*' // Allow only image files
            onChange={handleEngineerSignature}
          />
         </div>
        </div>
        </Form.Group>
         </div>
         </Form>
        </div>
      
     </div>
    </div>
    </>
    }
   </div>
  );
};

export default InstallationTrainingReportForm;
