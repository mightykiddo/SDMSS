import { useState } from "react";
import SuccessModel from "../../components/SuccessModal";
function CreateRoom() {

     const apiUrl= process.env.REACT_APP_API_URL_ROOM;
     const [showModal, setShowModal] = useState(false);
     const [formData, setFormData] = useState({
               id : "",
               Name : ""
     });

     //modal
     const postRoom = async (formData) => {
          return fetch(`${apiUrl}/Room`, {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify(formData),
             }) .then((response) => response.json()) 
     }

     const handleEdit = (e) => {
          const { id, value } = e.target;
          setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
     };

     const handleCloseModal = () => {
          setShowModal(false); 
     };

     const handleSubmit = (e) =>{
          e.preventDefault();
          const formData = getFormData();
          postRoom(formData)
               .then(() => setShowModal(true))
               .catch((error) => console.error(error));
     }

     //view function
     const getFormData = () => {
          return formData
     }

     return (
     <>
       <form onSubmit={(e) => handleSubmit(e)}  className="CreateRoom text-white bg-dark d-flex-column ">
               <div className="form-group d-flex align-items-center text-left p-3 ">
                    <label class="col-form-label"  style={{width:'100px'}}>Room:</label>
                    <input id="Name" class="form-control" type="text" style={{ width: '400px'}}  onChange={(e) => handleEdit(e)} ></input>
               </div>
               <div className="d-flex justify-content-center  p-3">
                    <button type="submit" className="btn btn-danger">Create</button>
               </div>
       </form >
               <SuccessModel 
               message = "Room Successfully Created !" 
               show = {showModal}
               handleClose={handleCloseModal}
          />
       </>
     );
   }
   
   export default CreateRoom;
   
   