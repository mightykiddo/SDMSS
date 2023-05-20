import { useState } from "react";


import SuccessModel from "../../components/SuccessModal";
function CreateUserProfile(){

     const [showModal, setShowModal] = useState(false);
     const [formData, setFormData] = useState({
          id: "",
          UserProfile:"",
          status : "Active"
     });
     const apiUrl = process.env.REACT_APP_API_URL_USEPROFILE;

     //model
     const PostUserProfile = async (data) => {
          await fetch(`${apiUrl}/Userprofile`, {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify(data),
             })
     }

     //controller
     const handleSubmit = async (e) =>{
          e.preventDefault();
          const data = getFormData();
          await PostUserProfile(data)
          setShowModal(true)
     }

     const handleEdit = e => {
          const { id, value } = e.target;
          setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
       }

       const handleCloseModal = () => {
          setShowModal(false); 
     };
       //view function
       const getFormData = () => {
            return formData
       }
  
     return(
          <>
          <form onSubmit={(e) => handleSubmit(e)} className="CreateMovie text-white bg-dark d-flex-column " style={{height : "1000px"}}>
               <div className="form-group d-flex align-items-center text-left p-3 ">
                    <label class="col-form-label"  style={{width:'100px'}}>User Profile:</label>
                    <input id="UserProfile" class="form-control" type="text" style={{ width: '400px'}}  onChange={(e) => handleEdit(e)} ></input>
               </div>
               <div className="d-flex justify-content-center  p-3">
                    <button type="submit" className="btn btn-danger">Create</button>
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