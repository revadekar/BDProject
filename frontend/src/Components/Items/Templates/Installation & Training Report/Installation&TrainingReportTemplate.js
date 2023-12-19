import React from "react";


const  InstallationAndTrainingReportTemplate = ({formData})=>{
    console.log(formData); // Logging the formData object
    return (
        <div className=" container-fluid template">
        <div className="d-flex justify-content-end ">
            <img className="d-flex justify-content-end " src="./cdacFavicon2.png" alt="logo" width='200px'></img>
          </div>
          <div className=' p-4'>
      <div className=" ">
          <div className="d-flex justify-content-center mb-3">
            <h2>INSTALLATION & TRAINING REPORT</h2>
          </div>
          <div className='d-flex justify-content-start mb-4'>
            <p>
              Centre for Development of Advanced computing
            <br />
              C-DAC Knowledge Park, No.1 Old madras Road,
             <br />
              Byappanahalli, Bangalore - 560038
              <br />
               Ph: 080 -25244059 / 66116400
            </p>
        </div>
        <form>
         <div className='form-group mb-4'>
            <div className='d-flex justify-content-start'>
              <label className='control-label col-sm-3'>Name of the Customer</label>
              <span className="col-sm-1">:</span>
              <span>{formData && formData.customerName }</span>
            </div>
          </div>

        <div className='form-group mb-4'>
        <div className='d-flex justify-content-start '>
         <label className='control-label col-sm-3'>Address</label>
         <span className="col-sm-1">:</span>
          <span className="">
            {formData && formData.address}
           </span>
        </div>
        </div>

     <div className='form-group row mb-4'>
       <div className='d-flex justify-content-start  col-sm-6'>
         <label className='control-label col-sm-6'>End User Name</label>
         <span className="col-sm-1">&nbsp;:</span>
          <span>{formData && formData.endUserName}</span>
       </div>
       <div className='d-flex justify-content-start  col-sm-6'>
         <label className='control-label col-sm-6'>Designation</label>
         <span className="col-sm-1">&nbsp;:</span>
          <span>{formData && formData.designation}</span>
       </div>
     </div>


     <div className='form-group row mb-4'>
        <div className='d-flex justify-content-start  col-sm-6'>
           <label className='control-label col-sm-6'>Tel No</label>
           <span className="col-sm-1">&nbsp;:</span>
           <span>{formData && formData.telNo}</span>
        </div>
        <div className='d-flex justify-content-start  col-sm-6'>
          <label className='control-label col-sm-6'>Invoice No</label>
          <span className="col-sm-1">&nbsp;:</span>
         <span>{formData && formData.invoiceNo}</span>
        </div>
     </div>


     <div className='form-group row mb-4'>
        <div className='d-flex justify-content-start  col-sm-6'> 
          <label className='control-label col-sm-6'>Training from Date</label>
          <span className="col-sm-1">&nbsp;:</span>
          <span>{formData && formData.fromDate}</span>
        </div>
       <div className='d-flex justify-content-start col-sm-6'>
         <label className='control-label col-sm-6'>To Date</label>
         <span className="col-sm-1">&nbsp;:</span>
         <span>{formData && formData.toDate}</span>
       </div>

     </div>

     {/* Table data */}
     <div className='form-group'>
       <table className='table table-bordered table-sm'>
         <thead className="thead-light">
           <tr>
             <th>Sl. No</th>
             <th>Product Name with Configuration</th>
             <th>Product Serial No</th>
             <th>Remarks</th>
           </tr>
         </thead>
         <tbody>
            {formData && formData.tableData.map((data) => (
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
     <div className="mb-4">
        <p className="mb-4">The above mentioned products are installed successfully and are working satisfactorily.</p>
        <div className="d-flex justify-content-start" >
           <p className="col-sm-9">TRAINING HAS BEEN COMPLETED UPTO CUSTOMER SATISFACTION </p>
           <span className="col-sm-1">:</span>
           <span className=""> {formData &&  formData.satisfied  }</span>
        </div>
     </div>
     <div className="d-flex justify-content-between mt-0" >
      <div className='d-flex justify-content-start ' style={{display: 'flex', flexDirection:"column"}}>
       <span>{formData && formData.HeadSignature!==null && <img src={URL.createObjectURL(formData.HeadSignature)} alt="signature" width={'200px'} height={'100px'} />}</span>
       <label className='control-label col-sm-2' style={{ whiteSpace: 'nowrap' }}><b>SIGNATURE OF HEAD OF THE DEPARTMENT <br/> WITH SEAL</b></label>
    </div>
  <div className='d-flex justify-content-end ' style={{display: 'flex', flexDirection:"column"}}>
   <span>{ formData && formData.EngineerSignature!==null && <img src={URL.createObjectURL(formData.EngineerSignature)} alt="signature" width={'200px'}  height={'100px'}/>}</span>
    <label className='control-label col-sm-2' style={{ whiteSpace: 'nowrap'}}><b>SIGNATURE OF THE ENGINEER<br></br>&nbsp;</b></label>
  </div>
</div>
   </form>
</div>
 </div>
</div>
)
};


export default InstallationAndTrainingReportTemplate;