import { useEffect, useState } from "react";
import SuccessModel from "../../components/SuccessModal";
function CreateMovieSession() {
     const apiUrl_Movie = process.env.REACT_APP_API_URL_MOVIE;
     const apiUrl_Room = process.env.REACT_APP_API_URL_ROOM;
     const apiUrl_Session = process.env.REACT_APP_API_URL_SESSION;

     const [showModal, setShowModal] = useState(false);
     const [movies, setMovies] = useState([])
     const [rooms , setRooms] = useState([])
     const [formData, setFormData] = useState({
          id: "",
          Movie_id:  "",
          Movie: "",
          Room_id: "",
          Room: "",
          Date: "",
          Start: "",
          End: "" });

     const loadMoviesnRooms = () => {
          // read the data from the JSON file when the component mounts
          fetch(`${apiUrl_Movie}/Movie`)
          .then(response => response.json())
          .then(data => {
               const extractedMovies = data.map(item => ({
                    Movie: item.Movie,
                    id: item.id
                  }));
               setMovies(extractedMovies);
               
          })
          .catch(error => console.error(error));
          //fetch room too
          fetch(`${apiUrl_Room}/Room`)
          .then(response => response.json())
          .then(data => {
               const extractedRooms = data.map(item => ({
                    Name: item.Name,
                    id: item.id
                  }));
               setRooms(extractedRooms);
          })
          .catch(error => console.error(error));
     }

     
     //on page load
     useEffect(() => {
          loadMoviesnRooms()
     }, []);


     const handleCloseModal = () => {
          setShowModal(false); 
     };
          
     const handleEdit = (event) => {
          const { id, value } = event.target;
          setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
             
     }
      
     const handleSubmit = (event) =>{
          event.preventDefault();
          console.log(formData)
          const movie = movies.find(movie => movie.id === parseInt(formData.Movie_id));
          const room = rooms.find(room => room.id === parseInt(formData.Room_id));
          console.log(movie)
          fetch(`${apiUrl_Session}/MovieSession`, {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify({...formData, Movie: movie.Movie, Room : room.Name }),
             })
               .then((response) => response.json())
               .then((data) => console.log(data))
               .catch((error) => console.error(error));
     }

     return (
          <>
          <form onSubmit={handleSubmit} className="CreateMovie text-white bg-dark d-flex-column ">
          
          <div className="form-group d-flex p-3">
               <p class="col-form-label" style={{width:'100px'}}>Movie</p>
               <select id="Movie_id" className="form-select text-wrap" style={{ width: '400px'}} onChange={handleEdit}>
                    {/* got data then use map to populate the dd */}
                    {movies.map((option) => (
                         <option key={option.id} value={option.id}>{option.Movie} </option>
                    ))}
               </select>
          </div>

          <div className="form-group d-flex align-items-center text-left p-3 ">
               <p class="col-form-label"  style={{width:'100px'}}>Room:</p>
               <select id="Room_id" className="form-select text-wrap" style={{ width: '400px'}} onChange={handleEdit}>
                    {/* got data then use map to populate the dd */}
                    {rooms.map((option) => (
                         <option key={option.id} value={option.id}>{option.Name} </option>
                    ))}
               </select>
          </div>

          <div className="form-group d-flex p-3">
               <p  style={{width:'100px'}}>Date</p>
               <input min={new Date().toISOString().split('T')[0]} type="date" id="Date" class="form-control" style={{ width: '400px'}} onChange={handleEdit}  ></input>
          </div>

          <div className="form-group d-flex align-items-center text-left p-3 ">
               <label class="col-form-label"  style={{width:'100px'}}>From:</label>
               <input id= "Start" class="form-control" type="time" style={{ width: '400px'}}  onChange={handleEdit} ></input>
          </div>

          <div className="form-group d-flex align-items-center text-left p-3 ">
               <label class="col-form-label"  style={{width:'100px'}}>To:</label>
               <input id= "End" class="form-control" type="time" style={{ width: '400px'}}  onChange={handleEdit} ></input>
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
   
   export default CreateMovieSession;
   