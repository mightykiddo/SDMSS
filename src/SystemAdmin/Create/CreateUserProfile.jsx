import { useState } from "react";
import SuccessModel from "../../components/SuccessModal";
function CreateUserProfile(){
     
     const [showModal, setShowModal] = useState(false);
     const [formData, setFormData] = useState({
          id: "",
          UserProfile:""
     });
     const apiUrl = process.env.REACT_APP_API_URL_USEPROFILE;

     const handleSubmit = e =>{
          e.preventDefault();
          console.log(formData)
          fetch(`${apiUrl}/Userprofile`, {
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
     
     return(
          <>
          <form onSubmit={handleSubmit} className="CreateMovie text-white bg-dark d-flex-column " style={{height : "1000px"}}>
               <div className="form-group d-flex align-items-center text-left p-3 ">
                    <label class="col-form-label"  style={{width:'100px'}}>User Profile:</label>
                    <input id="UserProfile" class="form-control" type="text" style={{ width: '400px'}}  onChange={handleEdit} ></input>
               </div>
               <div className="d-flex justify-content-center  p-3">
                    <button type="submit" onClick={()=>setShowModal(true)} className="btn btn-danger">Create</button>
               </div>
          </form>

          <SuccessModel
          message="New User Profile Successfully Created"
          show = {showModal}
          handleClose={handleCloseModal}
          />

          </>
     );
}
export default CreateUserProfile;