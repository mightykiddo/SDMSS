import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UpdateSession = ({data, reload, show, handleClose}) => {
  
    const apiUrl_Room = process.env.REACT_APP_API_URL_ROOM;
    const apiUrl_Movie = process.env.REACT_APP_API_URL_MOVIE;
    const apiUrl_Session = process.env.REACT_APP_API_URL_SESSION;
    const [formData, setFormData] = useState(data[0]);
    const [movies, setMovies] = useState()
    const [rooms , setRooms] = useState()

    //modal
    const getRoomMovie = async () => {
      const [movieResponse, roomResponse] = await Promise.all([
        fetch(`${apiUrl_Movie}/Movie`),
        fetch(`${apiUrl_Room}/Room`)
      ]);
      const movieData = await movieResponse.json();
      const roomData = await roomResponse.json();
     
      return [movieData, roomData]; //return movie and room
    }

    const updateMovieSession = async (formData, movie, room) => {
        await fetch(`${apiUrl_Session}/moviesession/${formData.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...formData, 
              movie : movie,
              room : room,
              room_id : parseInt(formData.room_id),
              movie_id : parseInt(formData.movie_id)
            }),
          })
    }
    //controller
    useEffect(() => {
        getRoomMovie()
            .then(([moviesData, roomsData]) => {
              setMovies(moviesData);
              setRooms(roomsData);
            })
            .catch(error => console.error(error));
    }, []);

  const handleEdit = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    var movie = null;
    var room = null;
    if(formData.Movie_id !== null ){   
        movie = movies.find(movie => movie.id == formData.movie_id) //will return undefined and break
        movie = movie.Movie
      }
    if(formData.room_id !== null){
      room = rooms.find(room => room.id == formData.room_id)
      room = room.Name
    }
    updateMovieSession(formData, movie, room)
    reload("reload parent")
    handleClose();

  }


  return(
    <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Body>
        <form onSubmit={(e) => handleSubmit(e)}>
        <div class="form-group">
            <label hmtlfor="movie" class="col-form-label text-dark">Movie:</label>
            <select className="form-select" onChange={(e) => handleEdit(e)} value={formData.movie_id} id="movie_id">
                {movies?.map((option) => (
                        <option key={option.id} value={option.id}>{option.Movie} </option>
                    ))}
            </select>
          </div>
          <div class="form-group">
            <label hmtlfor="room" class="col-form-label text-dark">Room:</label>
            <select className="form-select" onChange={(e) => handleEdit(e)} value={formData.room_id} id="room_id">
                {rooms?.map((option) => (
                        <option key={option.id} value={option.id}>{option.Name}</option>
                    ))}
            </select>
          </div>
          <div class="form-group">
            <label hmtlfor="Date" class="col-form-label text-dark">Date:</label>
            <input type="date" class="form-control" min={new Date().toISOString().split('T')[0]} onChange={(e) => handleEdit(e)} value={formData.Date} id="date"></input>
          </div>
          <div class="form-group">
            <label hmtlfor="Start" class="col-form-label text-dark">Timeslot:</label>
            <input type="text" class="form-control" onChange={(e) => handleEdit(e)} value={formData.Start} id="timeslot"></input>
          </div>
          <button type="submit">update</button>
        </form>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default UpdateSession;