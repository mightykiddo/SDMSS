import { useState } from "react";
import SuccessModel from "../../components/SuccessModal";
function CreateUserAcc() {

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
     id : "",
     name : "",
     email : "",
     password : "",
     status: "Active",
     acctype : ""});
  const apiUrl = process.env.REACT_APP_API_URL_USERACC;

  const handleSubmit = e =>{
     e.preventDefault();
     fetch(`${apiUrl}/User`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
  }

  const handleEdit = e => {
     const { id, value } = e.target;
     setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  }

  const handleCloseModal = () => {
     setShowModal(false); 
};
     return (
          <>
          <form onSubmit={handleSubmit} className="CreateMovie text-white bg-dark d-flex-column " style={{height : "1000px"}}>
          <div className="form-group d-flex align-items-center text-left p-3 ">
               <label class="col-form-label"  style={{width:'100px'}}>Name:</label>
               <input id="Name" class="form-control" type="text" style={{ width: '400px'}}  onChange={handleEdit} ></input>
          </div>
          <div className="form-group d-flex align-items-center text-left p-3 ">
               <label class="col-form-label"  style={{width:'100px'}}>Email:</label>
               <input id="Email" class="form-control" type="text" style={{ width: '400px'}}  onChange={handleEdit} ></input>
          </div>
          <div className="form-group d-flex align-items-center text-left p-3 ">
               <p class="col-form-label"  style={{width:'100px'}}>Password:</p>
               <input id="Password" class="form-control" type="text" style={{ width: '400px'}} onChange={handleEdit} ></input>
          </div>
          <div className="form-group d-flex p-3">
               <p class="col-form-label" style={{width:'100px'}}>Age Rating </p>
               <select id="AgeRating" className="form-select text-wrap" style={{ width: '400px'}} onChange={handleEdit}>
                    {/* got data then use map to populate the dd */}
                    <option value="Customer">Customer</option>
                    <option value="System Admin">System Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Staff">Staff</option>
               </select>
          </div>
          <div className="d-flex justify-content-center  p-3">
               <button type="submit" onClick={()=>setShowModal(true)} className="btn btn-danger">Create</button>
          </div>
  </form>
       
       <SuccessModel 
       message = "Movie Successfully Created !" 
       show = {showModal}
       handleClose={handleCloseModal}
  />
       </>
     );
   }
   
   export default CreateUserAcc;
   