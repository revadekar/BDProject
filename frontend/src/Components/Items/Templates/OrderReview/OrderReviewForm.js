import React, { useState } from 'react';
import { Form, Button, Table, Tooltip , OverlayTrigger } from 'react-bootstrap';
import { FaPlus, FaTrash } from 'react-icons/fa';
import generatePDF from '../generatePdf';
import GeneratePDF2 from '../GeneratePDF2';
import OrderReviewFormPdf from './OrderReviewFormPdf';
import ConfirmSubmission from './ConfirmSubmission';

const OrderReviewForm = ({ onCancel }) => {

  const [reviewMode, setReviewMode] = useState(false); // State to control review/edit modes
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [PDFGenerated, setPDFGenerated] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [formData, setFormData] = useState({
    customerName : '',
    scope : '',
    purchaseOrderNo : '',
    deliverySchedule : '',
    Date : '',
    value : '',
    discount: '',

   // MARKETING & SALES DIVISION
    quotationNo: '',
    quotationDate: '',
    verified: '' ,
    warranty: '',
    contactPerson: '',
    phone : '' ,
    canAcceptOrder: '',
    remarksMarketingAndSales: '',

   // CUSTOMER SUPPORT DIVISION
    verifiedTheSpecification: '' ,
    installationReportNo: '' ,
    installationReportDate: '',
    inspectionRequired: '', 
    inspectionRequiredDates: '',
    remarksCustomerSupport: '',

  //  MATERIALS MANAGEMENT GROUP
   expectedDateOfShipment: '',
   isOctroiOrRoadPermitRequired: '',
   procurementCost: '',
   sellingPrice: '',
   contribution: '',
   remarksMANAGEMENT : '',



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
          <GeneratePDF2 formData={formData} Template={ OrderReviewFormPdf } FileName = 'Order Review.pdf'/>
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
         <ConfirmSubmission formData={formData} onSubmit={handleSubmit} onEdit={handleEdit} />}

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
<div style={{display : 'flex', flexDirection : 'column' }} >
  <div className=' mb-3 ' style={ {display : 'flex', flexDirection : 'row'}} >
     <div className='card col-md-6 ' style={{marginRight: '1rem'}}>
      <div className='card-body '>
       <Form id="InstallationForm">
       <div className='userform'>
        <div className='d-flex justify-content-center'>
        <h4>Order Review</h4>
        </div>

      </div>
       <div className=' userform'>
        <div className='row mb-4'>
        <Form.Group controlId="customerName"  >
        <Form.Label>Customer :</Form.Label>
        <Form.Control
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
        />
        </Form.Group>
        </div>

        <div className='row mb-4'>
        <Form.Group controlId="scope" >
        <Form.Label>Scope of the Project :</Form.Label>
        <Form.Control
          type="text"
          name="scope"
          value={formData.scope}
          onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
        />
      </Form.Group>
        </div>

      <div className='row mb-4'>
        <div className='col-sm-6 ' >
          <Form.Group controlId="purchaseOrderNo" > 
          <Form.Label>Purchase Order No : </Form.Label>
          <Form.Control
             className='form-control'
             type="text"
             name="purchaseOrderNo"
             value={formData.purchaseOrderNo}
             onChange={(e) => setFormData({ ...formData, purchaseOrderNo: e.target.value })}
            />
            </Form.Group>
        </div>
        <div className='col-sm-6 ' >
            <Form.Group controlId="deliverySchedule" >
            <Form.Label>Delivery Schedule : </Form.Label>
            <Form.Control
             className='form-control'
             type="text"
             name="deliverySchedule"
             value={formData.deliverySchedule}
             onChange={(e) => setFormData({ ...formData, deliverySchedule: e.target.value })}
             />
          </Form.Group>
        </div>
      </div>

      <div className='row mb-4'>
        <div className='col-sm-6 ' >
         <Form.Group controlId="Date" >
          <Form.Label>Date :</Form.Label>
          <Form.Control
            type="date"
            name="Date"
            value={formData.Date}
            onChange={(e) => setFormData({ ...formData, Date: e.target.value })}
             />
          </Form.Group>
            
        </div>
        <div className='col-sm-6 ' >
          <Form.Group controlId="value" className='mb-3'>
          <Form.Label>Value of the Order :</Form.Label>
          <Form.Control
           type="text"
           name="value"
           value={formData.value}
           onChange={(e) => setFormData({ ...formData, value: e.target.value })}
           />
           </Form.Group>
        </div>
      </div>

      <div className='row mb-4'>
        <div className='col-sm-12 ' >
        <Form.Group  controlId="discount" >
        <Form.Label>Discounts (if any) : </Form.Label>
        <Form.Control
          type="text"
          name="discount"
          value={formData.discount}
          onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
        />
      </Form.Group>
        </div>
      </div>
      </div>
      </Form>
     </div>
   </div>
    <div className='card col-md-6'>
       <div className='card-body'>
           <div className='d-flex justify-content-start mb-3'>
              <h6>Customer Support Division</h6>
            </div>
           <div className='userform mb-3'>
              <div className='row mb-4'>
                  <Form.Group controlId="verifiedTheSpecification" >
                    <div className='row'>
                       <div className='col-sm-7 ' >
                       <Form.Label>Verified the specification and Part Nos / BOQ of the order, any amendments required :</Form.Label>
                      </div>
                      <div className='col-sm-5 ' >
                      <Form.Select
                       name="verifiedTheSpecification"
                       value={formData.verifiedTheSpecification}
                      onChange={(e) => setFormData({ ...formData, verifiedTheSpecification: e.target.value })}
                        >
                      <option value='' disabled>Please specify</option>
                       <option value='YES'>YES</option>
                       <option value='NO'>NO</option>
                    </Form.Select>
                      </div>
                    </div>
                  </Form.Group>
              </div>
            <div className='row mb-4'>
              <div className='col-sm-7'>
                <Form.Group controlId="installationReportNo" >
                <Form.Label>Installation Report No :</Form.Label>
                <Form.Control
                  type="text"
                   name="installationReportNo"
                  value={formData.installationReportNo}
                  onChange={(e) => setFormData({ ...formData, installationReportNo: e.target.value })}
                    />
                   </Form.Group>
               </div>
                <div className='col-sm-5 ' >
                   <Form.Group controlId="installationReportDate" >
                   <Form.Label>Date :</Form.Label>
                     <Form.Control
                      type="date"
                      name="installationReportDate"
                      value={formData.installationReportDate}
                      onChange={(e) => setFormData({ ...formData, installationReportDate: e.target.value })}
                     />
                  </Form.Group>
               </div>
             </div>
             <div className='row mb-4'>
                  <Form.Group controlId="inspectionRequired" >
                    <div className='row'>
                       <div className='col-sm-7 ' >
                       <Form.Label>Inspection by the Customer required  :</Form.Label>
                      </div>
                      <div className='col-sm-5 ' >
                      <Form.Select
                       name="inspectionRequired"
                       value={formData.inspectionRequired}
                      onChange={(e) => setFormData({ ...formData, inspectionRequired: e.target.value })}
                        >
                      <option value='' disabled>Please specify</option>
                       <option value='YES'>YES</option>
                       <option value='NO'>NO</option>
                    </Form.Select>
                      </div>
                    </div>
                  </Form.Group>
              </div>
              { formData.inspectionRequired==='YES' && <div className='row mb-4'>
               <div className='col-sm-12'>
                <Form.Group controlId="inspectionRequiredDates" >
                <Form.Label>if required, mention the dates. :</Form.Label>
                <Form.Control
                  type="text"
                   name="inspectionRequiredDates"
                  value={formData.inspectionRequiredDates}
                  onChange={(e) => setFormData({ ...formData, inspectionRequiredDates: e.target.value })}
                    />
                   </Form.Group>
               </div>
             </div>}
             <div className='row mb-4'>
              <div className='col-sm-12'>
                <Form.Group controlId="remarksCustomerSupport" >
                <Form.Label>Remarks :</Form.Label>
                <Form.Control
                  type="text"
                   name="remarksCustomerSupport"
                  value={formData.remarksCustomerSupport}
                  onChange={(e) => setFormData({ ...formData, remarksCustomerSupport: e.target.value })}
                    />
                   </Form.Group>
               </div>
             </div>
          </div>
        </div>
      </div>
 </div>
    <div className='' style={ {display : 'flex', flexDirection : 'row'}}>
        <div className='card col-md-6' style={{marginRight : '1rem'}}>
          <div className='card-body'>
            <div className='d-flex justify-content-start mb-3'>
              <h6>Marketing & Sales Division</h6>
            </div>
 
        <div className='userform mb-3'>
            <div className='row mb-4'>
              <div className='col-sm-6'>
                <Form.Group controlId="quotationNo" >
                 <Form.Label>Quotation No. :</Form.Label>
                 <Form.Control
                   type="text"
                   name="quotationNo"
                   value={formData.quotationNo}
                    onChange={(e) => setFormData({ ...formData, quotationNo: e.target.value })}
                 />
                  </Form.Group>
             </div>
               <div className='col-sm-6 ' >
                  <Form.Group controlId="quotationDate" >
                   <Form.Label>Date :</Form.Label>
                     <Form.Control
                      type="date"
                      name="quotationDate"
                      value={formData.quotationDate}
                      onChange={(e) => setFormData({ ...formData, quotationDate: e.target.value })}
                     />
                  </Form.Group>
            
               </div>
             </div>

               <Form.Group controlId="verified" >
                <div className=' row mb-4'>
                 <div className='col-sm-6'>
                    <Form.Label>Order verified as per our quotation:</Form.Label>
                 </div>
                  <div className='col-sm-6'>
                  <Form.Select
                   name="verified"
                   value={formData.verified}
                   onChange={(e) => setFormData({ ...formData, verified: e.target.value })}
                    >
                    <option value='' disabled>Please specify</option>
                     <option value='Found correct'>Found correct</option>
                     <option value='Changes required'>Changes required</option>
                    </Form.Select>
                  </div>
                </div>
                </Form.Group>
                <div className='row mb-4'>
                 <div className='col-sm-12 ' >
                     <Form.Group controlId="warranty" >
                      <Form.Label>Warranty :</Form.Label>
                       <Form.Control
                         type="text"
                         name="warranty"
                         value={formData.warranty}
                         onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                       />
                    </Form.Group>
            
                  </div>
               </div>
              <div className='row mb-4'>
               <div className='col-sm-6 ' >
                     <Form.Group controlId="contactPerson" >
                      <Form.Label>Contact Person :</Form.Label>
                       <Form.Control
                         type="text"
                         name="contactPerson"
                         value={formData.contactPerson}
                         onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                       />
                    </Form.Group>
            
                  </div>
                 <div className='col-sm-6 ' >
                     <Form.Group controlId="phone" >
                      <Form.Label>Phone :</Form.Label>
                       <Form.Control
                         type="tel"
                         name="phone"
                         value={formData.phone}
                         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                       />
                     </Form.Group>
            
                    </div>
               </div>
               <div className='row mb-4'>
                  <Form.Group controlId="canAcceptOrder" >
                    <div className='row'>
                       <div className='col-sm-5 ' >
                       <Form.Label>Order can be accepted :</Form.Label>
                      </div>
                      <div className='col-sm-7 ' >
                      <Form.Select
                       name="canAcceptOrder"
                       value={formData.canAcceptOrder}
                      onChange={(e) => setFormData({ ...formData, canAcceptOrder: e.target.value })}
                        >
                      <option value='' disabled>Please specify</option>
                       <option value='YES'>YES</option>
                       <option value='NO'>NO</option>
                    </Form.Select>
                      </div>
                    </div>
                  </Form.Group>
                </div>
                <div className='row mb-4'>
                  <div className='col-sm-12 ' >
                     <Form.Group controlId="contactPerson" >
                      <Form.Label>Remarks :</Form.Label>
                       <Form.Control
                         type="text"
                         name="contactPerson"
                         value={formData.contactPerson}
                         onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                       />
                    </Form.Group>
                   </div>
                 </div>
             </div>
          </div>
        </div>

        <div className='card ' >
          <div className='card-body'>
            <div className='d-flex justify-content-start mb-3'>
               <h6>MATERIALS MANAGEMENT GROUP</h6>
              </div>
           <div className='userform mb-3'>
           <div className=' row mb-4'>
              <div className='col-sm-6'>
                <Form.Group controlId="quotationNo" >
                 <Form.Label>Quotation No. :</Form.Label>
                 <Form.Control
                   type="text"
                   name="quotationNo"
                   value={formData.quotationNo}
                    onChange={(e) => setFormData({ ...formData, quotationNo: e.target.value })}
                 />
                  </Form.Group>
             </div>
               <div className='col-sm-6 ' >
                  <Form.Group controlId="quotationDate" >
                   <Form.Label>Date :</Form.Label>
                     <Form.Control
                      type="date"
                      name="quotationDate"
                      value={formData.quotationDate}
                      onChange={(e) => setFormData({ ...formData, quotationDate: e.target.value })}
                     />
                  </Form.Group>
            
               </div>
             </div>
           </div>
          </div>
        </div>
      </div>
   </div>

      </>
    }
   </div>
  );
};

export default OrderReviewForm;
