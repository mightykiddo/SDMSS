import { useState } from "react";
import SuccessModel from "../../components/SuccessModal";
function CreateRoom() {

     const apiUrl= process.env.REACT_APP_API_URL_ROOM;
     const [showModal, setShowModal] = useState(false);
     const [formData, setFormData] = useState({
               id : "",
               Room : ""
     });

     const handleEdit = (event) => {
          const { id, value } = event.target;
          setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
     };

     const handleCloseModal = () => {
          setShowModal(false); 
     };

     const handleSubmit = (event) =>{
          event.preventDefault();
          console.log(formData)
          fetch(`${apiUrl}/Room`, {
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

     return (
     <>
       <form onSubmit={handleSubmit}  className="CreateRoom text-white bg-dark d-flex-column ">
               <div className="form-group d-flex align-items-center text-left p-3 ">
                    <label class="col-form-label"  style={{width:'100px'}}>Room:</label>
                    <input id="Room" class="form-control" type="text" style={{ width: '400px'}}  onChange={handleEdit} ></input>
               </div>
               <div className="d-flex justify-content-center  p-3">
                    <button onClick={() => setShowModal(true)} type="submit" className="btn btn-danger">Create</button>
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
   
   