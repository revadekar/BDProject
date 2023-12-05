import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const EditCustomerForm=({onEditCustomer, onCloseForm, editingCustomer})=>{
    const [updatedCustomerData, setUpdatedCustomerData] = useState(editingCustomer);
    const[selectedCountry,setSelectedCountry]=useState('');
    const[selectedState,setSelectedState]=useState('');
    const[states,setStates]=useState([]);
    const[cities,setCities]=useState([]);
    const [ErrorMessage,setErrorMessage]=useState(false);

    console.log(editingCustomer);
    
      useEffect(()=>{
        setSelectedCountry(updatedCustomerData.country);
      },[updatedCustomerData.country]);

      useEffect(()=>{
        setSelectedState(updatedCustomerData.State);
      },[updatedCustomerData.State]);

       useEffect(()=>{
        const country_name=selectedCountry;
        fetch('http://localhost:5000/getStates',{
          method:'Post',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({country_name}),
        })
        .then((response) => response.json())
        .then((data) => {setStates(data)})
        .catch((error)=>{
          console.error('Error:', error);
        })
       },[selectedCountry]);

       useEffect(() => {
        // Fetch cities based on selected state
        if (selectedState) {
          const state_name=selectedState;
          fetch('http://localhost:5000/getCities', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ state_name }),
          })
            .then((response) => response.json())
            .then((data) => {
              setCities(data);
            })
            .catch((error) => {
              console.error('Error fetching cities:', error);
            });
        }
      }, [selectedState]);

    if (!editingCustomer) {
        // Handle the case where editingProject is undefined
        return <div className="d-flex justify-content-center "><span className="alert alert-danger">Some Error occurred </span><span className="d-flex justify-content-center" onClick={()=>onCloseForm()}style={{fontSize: "x-large",color:"white", cursor:"pointer"}}>&times;</span></div>; // or any other placeholder or message
      }else{

        const handleEditCustomer=()=>{
            fetch('http://localhost:5000/editCustomer', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({updatedCustomerData}),
              })
                .then((response) => response.json())
                .then((data) => {
                  // Handle the response from your server, you can update your state or perform any necessary actions
                  // For example, you can call `onAddCustomer` to add the new customer to your state
                 //onAddCustomer();
                 //setDataInserted(true);
                // onCloseForm();
                onEditCustomer();
                  onCloseForm();
                })
                .catch((error) => {
                  setErrorMessage('Unable to edit customer');
                  console.error('Error:', error);
                });
        }

    return(
        <div className="container-fluid userform">
             {ErrorMessage && 
          <div className='d-flex justify-content-center'>
        <p className='error-message'>{ErrorMessage}</p>
        </div>
        }

            <div className="d-flex justify-content-center align-items-center">
            <div className=" card col-sm-6 form1">
                <div className="d-flex justify-content-center mb-3">
                <h4>Edit Customer</h4>
                </div>
              <form className='form-horizontal'>
                <div className="form-group col-sm-12 row mb-3">
                    <label  htmlFor='Cust_name' className='control-label col-sm-4 '><span className='text-danger'>*</span>Company Name:</label>
                    <div className="col-sm-8">
                    <input id="Cust_name" className="form-control" value={updatedCustomerData.Cust_name} disabled></input>
                    </div>
                    
                </div>
                <div className="form-group col-sm-12 row mb-3">
                    <label  htmlFor='Address' className='control-label col-sm-4 '><span className='text-danger'>*</span> Company Address:</label>
                    <div className="col-sm-8">
                    <input id="Address" className="form-control" 
                    onChange={(e) =>
                    setUpdatedCustomerData({ ...updatedCustomerData, Address: e.target.value })}
                    value={updatedCustomerData.Address} ></input>
                    </div>
                    
                </div>
                <div className='form-group row col-sm-12 mb-3' >
                <label htmlFor='Website' className='control-label col-sm-4'>
                <span className='text-danger'>*</span>
                 Company Website:
                  </label>
                  <div className='col-sm-8'>
                  <input
                   type='text'
                     id='Website'
                   className='form-control'
                   value={ `${updatedCustomerData.Website}`}
                onChange={(e) =>{
                 setUpdatedCustomerData({ ...updatedCustomerData, Website: e.target.value })
                   }
              
                   }
                 />
             </div>
             </div>
           <div className='form-group row col-sm-12 mb-3'>
        <label htmlFor='country' className='control-label col-sm-4'>
        <span className='text-danger'>*</span>
          Country:
        </label>
        <div className='col-sm-8'>
        <select
           id='country'
           className='form-select'
           value={updatedCustomerData.country}
           onChange={(e) => {
          setSelectedCountry(e.target.value);
          setUpdatedCustomerData({ ...updatedCustomerData, country: e.target.value });
          }}
          >
  <option disabled value=''>Select Country</option>
  <option value='India'>India</option>
</select>

        </div>
      </div>
      <div className='form-group row col-sm-12 mb-3' >
        <label htmlFor='state' className='control-label col-sm-4'>
        <span className='text-danger'>*</span>
          State:
        </label>
        <div className='col-sm-8'>
        <select
  id='state'
  className='form-select'
  value={updatedCustomerData.State}
  onChange={(e) =>{
    setSelectedState(e.target.value);
    setUpdatedCustomerData({ ...updatedCustomerData, State: e.target.value ,City_name: ''})
  }}
>
  <option disabled value=''>Select State</option>
  {states.map((state) => (
    <option key={state.id} value={state.name}>
      {state.name}
    </option>
  ))}
</select>


        </div>
      </div>
      <div className='form-group row col-sm-12 mb-4'>
      <label htmlFor='city' className='control-label col-sm-4'>
      <span className='text-danger'>*</span>
        City:
      </label>
      <div className='col-sm-8'>
        <select
          id='city'
          className='form-select'
          value={updatedCustomerData.City_name}
          onChange={(e) =>
            setUpdatedCustomerData({ ...updatedCustomerData, City_name: e.target.value })
          }
        >
          <option disabled value='' >
            Select City
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.City_name}>
              {city.City_name}
            </option>
          ))}
        </select>
      </div>
    </div>
                <div className="d-flex justify-content-center">
                    <Button className="flat-button" type="button"  onClick={()=>handleEditCustomer()}>
                        Save
                    </Button>
                    <Button className="flat-button btn btn-danger" type="button"  style={{marginLeft:"1rem"}} onClick={()=>onCloseForm()}>
                        Cancel
                    </Button>
                </div>
              </form>
            </div>
            </div>
        </div>
    );
}
}

export default EditCustomerForm;