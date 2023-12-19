import React from 'react';
import { Button } from 'react-bootstrap';

const ReviewForm = ({ formData, onSubmit, onEdit }) => {
    console.log(formData);
  if (!formData || Object.keys(formData).length === 0) {
    return (
      <div className='custom-alert'>
        <p className='error-message'>Data not received</p>
      </div>
    );
  }

  const handleEdit = () => {
    // Go back to the main form for editing
    onEdit(); // Call the onEdit function passed from the parent component
  };

  const handleSubmit = () => {
    // Perform form submission logic
    onSubmit(); // Call the onSubmit function passed from the parent component
  };

  return (
    <div className='container-fluid userform template'>
      <div className='btn-group mb-3'>
        {/* Button to edit */}
        <Button variant='warning' onClick={handleEdit}>
          Edit
        </Button>

        {/* Button to submit */}
        <Button variant='primary' onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <div className='card form1'>
        <form>
          <div className='form-group mb-3'>
            <label className='control-label col-sm-2'>Customer Name</label>
            <span>:&nbsp;&nbsp;&nbsp;{formData.customerName}</span>
          </div>

          <div className='form-group mb-3'>
            <label className='control-label col-sm-2'>Address</label>
            <span>:&nbsp;&nbsp;&nbsp;{formData.address}</span>
          </div>

          <div className='form-group mb-3'>
            <label className='control-label col-sm-2'>End User Name</label>
            <span>:&nbsp;&nbsp;&nbsp;{formData.endUserName}</span>
          </div>

          <div className='form-group mb-3'>
            <label className='control-label col-sm-2'>Designation</label>
            <span>:&nbsp;&nbsp;&nbsp;{formData.designation}</span>
          </div>

          <div className='form-group mb-3'>
            <label className='control-label col-sm-2'>Tel No</label>
            <span>:&nbsp;&nbsp;&nbsp;{formData.telNo}</span>
          </div>

          <div className='form-group mb-3'>
            <label className='control-label col-sm-2'>Invoice No</label>
            <span>:&nbsp;&nbsp;&nbsp;{formData.invoiceNo}</span>
          </div>

          <div className='form-group mb-3'>
            <label className='control-label col-sm-2'>Training from Date</label>
            <span>:&nbsp;&nbsp;&nbsp;{formData.fromDate}</span>
          </div>

          <div className='form-group mb-4'>
            <label className='control-label col-sm-2'>To Date</label>
            <span>:&nbsp;&nbsp;&nbsp;{formData.toDate}</span>
          </div>

          {/* Table data */}
          <div className='form-group mb-5'>
            <table className='table table-bordered table-sm'>
              <thead>
                <tr>
                  <th>Sl. No</th>
                  <th>Product Name with Configuration</th>
                  <th>Product Serial No</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {formData.tableData.map((data) => (
                  <tr key={data.id}>
                    <td>{data.slNo}</td>
                    <td>{data.productName}</td>
                    <td>{data.productSerialNo}</td>
                    <td>{data.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='form-group mb-3'>
            <label className='control-label col-sm-6'>TRAINING HAS BEEN COMPLETED UPTO CUSTOMER SATISFACTION</label>
            <span>:&nbsp;&nbsp;&nbsp;{formData.satisfied}</span>
          </div>


          <div className='form-group mb-3'>
            <label className='control-label col-sm-4'>SIGNATURE OF HEAD OF THE DEPARTMENT:</label>
            <span>{formData.HeadSignature && <img src={URL.createObjectURL(formData.HeadSignature)} alt="signature" width={'200px' } height={'100px'} />}</span>
          </div>

          <div className='form-group mb-3'>
            <label className='control-label col-sm-4'>SIGNATURE OF THE ENGINEER:</label>
            <span>{formData.EngineerSignature && <img src={URL.createObjectURL(formData.EngineerSignature)} alt="signature" width={'200px' } height={'100px'}/>}</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
