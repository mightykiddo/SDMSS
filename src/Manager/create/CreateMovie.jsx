import { useState } from "react";
import SuccessModel from "../../components/SuccessModal";
function CreateMovie() {
     const apiUrl = process.env.REACT_APP_API_URL_MOVIE;
     const [showModal, setShowModal] = useState(false);
     const [formData, setFormData] = useState({
               id : "",
               Movie : "",
               Duration : "",
               Synopsis : "",
               AgeRating : ""   });
     
     const handleCloseModal = () => {
          setShowModal(false); 
     };
          
     const handleEdit = (e) => {
          const { id, value } = e.target;
          setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
     };
      

     const postMovie = async (formData) => {
          await fetch(`${apiUrl}/Movie`, { //RETURN VOID
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify(formData),
             })

             return true;
     }

     const handleSubmit = async (e) =>{
          e.preventDefault();
          const data = getFormData();
          const state =  await postMovie(data)
          setShowModal(state);
     }


     //view function
     const getFormData = () => {
          return formData
     }
     return (
          <>
       <form onSubmit={(e) => handleSubmit(e)} className="CreateMovie text-white bg-dark d-flex-column " style={{height : "1000px"}}>
               <div className="form-group d-flex align-items-center text-left p-3 ">
                    <label class="col-form-label"  style={{width:'100px'}}>Movie:</label>
                    <input id="Movie" class="form-control" type="text" style={{ width: '400px'}}  onChange={(e) => handleEdit(e)} ></input>
               </div>
               <div className="form-group d-flex align-items-center text-left p-3 ">
                    <p class="col-form-label"  style={{width:'100px'}}>Duration:</p>
                    <input id="Duration" class="form-control" type="text" style={{ width: '400px'}} onChange={(e) => handleEdit(e)} ></input>
               </div>
               <div className="form-group d-flex p-3">
                    <p  style={{width:'100px' , height: '150px'}}>Synopsis</p>
                    <input id="Synopsis" class="form-control"type="text" style={{ width: '400px'}} onChange={(e) => handleEdit(e)} ></input>
               </div>
               <div className="form-group d-flex p-3">
                    <p class="col-form-label" style={{width:'100px'}}>Age Rating </p>
                    <select id="AgeRating" className="form-select text-wrap" style={{ width: '400px'}} onChange={(e) => handleEdit(e)}>
                         {/* got data then use map to populate the dd */}
                         <option value="PG">PG</option>
                         <option value="PG13">PG-13</option>
                         <option value="R21">R21</option>
                    </select>
               </div>
               <div className="d-flex justify-content-center  p-3">
                    <button type="submit" className="btn btn-danger">Create</button>
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
   
   export default CreateMovie;
   