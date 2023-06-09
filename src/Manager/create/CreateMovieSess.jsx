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
          movie_id:  "",
          movie: "",
          room_id: "",
          room: "",
          timeslot: "",
          seats :  [
               {
                 "seat" : "A1",
                 "occupy" : "no",
                 "id" : 1
               },
               {
                 "seat" : "A2",
                 "occupy" : "no",
                 "id" : 2
               },
               {
                 "seat" : "A3",
                 "occupy" : "no",
                 "id" : 3
               },
               {
                 "seat" : "B1",
                 "occupy" : "no",
                 "id" : 4
               },
               {
                 "seat" : "B2",
                 "occupy" : "no",
                 "id" : 5
               },
               {
                 "seat" : "B3",
                 "occupy" : "no",
                 "id" : 6
               },
               {
                 "seat" : "C1",
                 "occupy" : "no",
                 "id" : 7
               },
               {
                 "seat" : "C2",
                 "occupy" : "no",
                 "id" : 8
               },
               {
                 "seat" : "C3",
                 "occupy" : "no",
                 "id" : 9
               }
             ]
     });

     
     //model
     const loadMoviesnRooms = async () => {
          const [movieResponse, roomResponse] = await Promise.all([
               fetch(`${apiUrl_Movie}/Movie`),
               fetch(`${apiUrl_Room}/Room`)
             ]);
          const movieData = await movieResponse.json();
          const roomData = await roomResponse.json();
         
          return [movieData, roomData]; //return movie and room
          
     }
      
     const createMovieSession = async (formData, movie,room) => {
          await fetch(`${apiUrl_Session}/moviesession`, {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify({...formData, movie: movie.Movie, room : room.Name }),
             })
             return true;
     }


     useEffect(() => {
          loadMoviesnRooms()
               .then(([moviesData, roomsData]) => {
               const extractedMovies = moviesData.map(item => ({
                    Movie: item.Movie,
                    id: item.id
               }));
               const extractedRooms = roomsData.map(item => ({
                    Name: item.Name,
                    id: item.id
               }));
               setMovies(extractedMovies);
               setRooms(extractedRooms);
               })
               .catch(error => console.error(error));
          }, []);



     const handleCloseModal = () => {
          setShowModal(false); 
     };
          
     const handleEdit = (e) => {
          const { id, value } = e.target;
          setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
     }



     const handleSubmit = async (e) =>{
          e.preventDefault();
          const formData = getFormData()
          const movie = movies.find(movie => movie.id === parseInt(formData.movie_id));
          const room = rooms.find(room => room.id === parseInt(formData.room_id));
          const state = await createMovieSession(formData,movie,room)
          setShowModal(state);
     }


     //view function
     const getFormData = () => {
          return formData
     }
     return (
          <>
          <form onSubmit={(e) => handleSubmit(e)} className="CreateMovie text-white bg-dark d-flex-column ">
          
          <div className="form-group d-flex p-3">
               <p class="col-form-label" style={{width:'100px'}}>Movie</p>
               <select id="movie_id" className="form-select text-wrap" style={{ width: '400px'}} onChange={(e) => handleEdit(e)}>
                    {/* got data then use map to populate the dd */}
                    {movies.map((option) => (
                         <option key={option.id} value={option.id}>{option.Movie} </option>
                    ))}
               </select>
          </div>

          <div className="form-group d-flex align-items-center text-left p-3 ">
               <p class="col-form-label"  style={{width:'100px'}}>Room:</p>
               <select id="room_id" className="form-select text-wrap" style={{ width: '400px'}} onChange={(e) => handleEdit(e)}>
                    {/* got data then use map to populate the dd */}
                    {rooms.map((option) => (
                         <option key={option.id} value={option.id}>{option.Name} </option>
                    ))}
               </select>
          </div>

          <div className="form-group d-flex p-3">
               <p  style={{width:'100px'}}>Date</p>
               <input min={new Date().toISOString().split('T')[0]} type="date" id="date" class="form-control" style={{ width: '400px'}} onChange={(e) => handleEdit(e)}  ></input>
          </div>

          <div className="form-group d-flex align-items-center text-left p-3 ">
               <label class="col-form-label"  style={{width:'100px'}}>From:</label>
               <input id= "timeslot" class="form-control" type="text" style={{ width: '400px'}}  onChange={(e) => handleEdit(e)} ></input>
          </div>

          <div className="d-flex justify-content-center  p-3">
               <button type="submit" className="btn btn-danger">Create</button>
          </div>
     </form>
          <SuccessModel 
               message = "Movie Session Successfully Created !" 
               show = {showModal}
               handleClose={handleCloseModal}
          />
  </>
     );
   }
   
   export default CreateMovieSession;
   