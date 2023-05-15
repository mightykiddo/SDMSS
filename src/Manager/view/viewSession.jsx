import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
function ViewSession() {

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');
  const apiUrl_Session = process.env.REACT_APP_API_URL_SESSION;
  const apiUrl_Movie = process.env.REACT_APP_API_URL_MOVIE;
  const apiUrl_Room = process.env.REACT_APP_API_URL_ROOM;

  const loadData = () => {

    fetch(`${apiUrl_Session}/moviesession`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(SessionError => console.error(SessionError))
  }
  

  const handleChange = event => {
    setQuery(event.target.value);
  };
  
  const handleCloseModal = () => {
    setShowModal(false); 
    setConfirmModal(false);
  };
  useEffect(() => { //load data on page load 
    loadData()
  }, [filteredData, query]);

  const handleUpdate = (id) => { //filter by id and pass to modal
    setFilteredData(data.filter((sessionData) => sessionData.id === id));
    // filteredData will now contain an array with only the movie data objects that match the given id
    setShowModal(true);
  };


  const confirmModal = (id) => {
    setFilteredData(data.filter((sessionData) => sessionData.id === id));
    //delete modal
    setConfirmModal(true); 
  }


  const handleSubmit = (e)=> {//rename
    e.preventDefault();
    fetch(`${apiUrl_Session}/moviesession?movie=${query}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <form className="input-group p-3" style={{width : "350px"}}   onSubmit={handleSubmit}>
          <input class="form-control border " type={"text"} value={query} onChange={handleChange} ></input>
        <button  className="btn btn-light" type="submit">search</button>
        </form>
    </div>
    <table className="text-black" style={{backgroundColor : "whitesmoke", width : '1000px'}}>
      <thead>
        <tr className="d-flex-column" style={{backgroundColor : "orange"}}>
        <th scope="col" className="p-3">Movie</th>
          <th scope="col">Room</th>
          <th scope="col">Date</th>
          <th scope="col">Timeslot</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody >
      {data.length == 0 ?  (<p className="p-3">No Matching Records</p>) : (
        data?.map((session) => (
          <>
          <tr key={session.id}>
            <td className="p-2">{session.movie === null ? "Nil" : session.movie}</td>
            <td className="p-2">{session.room === null ? "Nil" : session.room}</td>
            <td className="p-2">{session.date}</td>
            <td className="p-2">{session.timeslot}</td>
            <td>
               <div className="d-flex align-items-center justify-content-end"> 
                    <button type="button" className="btn text-white m-1 " style={{backgroundColor : "royalblue"}} onClick={() => handleUpdate(session.id)}>Update</button>
                    <button type="button" className="btn text-white m-1" style={{backgroundColor : "red"}} onClick={() => confirmModal(session.id)}>Delete</button>
               </div>
               
            </td>
          </tr>
          <tr>
              <td colSpan="6" className="border-bottom"></td>
          </tr>
          </>
        )))}
      </tbody>
    </table>
    {showModal === true &&          
          <UpdateSession
          data={filteredData}
          setData = {setFilteredData} //setData to reload parent
          show={showModal}
          handleClose={handleCloseModal}
        />}
    {showConfirmModal == true &&
        <DeleteSession
        data={filteredData}
        setData = {setFilteredData}
        show={showConfirmModal}
        handleClose={handleCloseModal}/>
    }
</>
  );
}

export default ViewSession;


const UpdateSession = ({data, setData, show, handleClose}) => {
  
    const apiUrl_Room = process.env.REACT_APP_API_URL_ROOM;
    const apiUrl_Movie = process.env.REACT_APP_API_URL_MOVIE;
    const apiUrl_Session = process.env.REACT_APP_API_URL_SESSION;
    const [formData, setFormData] = useState(data[0]);
    const [movies, setMovies] = useState()
    const [rooms , setRooms] = useState()

    useEffect(() => { //load data on page load 
      fetch(`${apiUrl_Movie}/Movie`)
      .then(response => response.json())
      .then(data => {
           setMovies(data);
      })
      .catch(error => console.error(error));

      //fetch room too
      fetch(`${apiUrl_Room}/Room`)
      .then(response => response.json())
      .then(data => {
           setRooms(data);
      })
      .catch(error => console.error(error));
    }, []);

  const handleEdit = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    console.log(formData)
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

    fetch(`${apiUrl_Session}/moviesession/${formData.id}`, {
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
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setData("reload parent")
        handleClose();
        
      })
      .catch((error) => console.error(error));

    //when submit need to update movie based on movie_id
      /*
    fetch(`${apiUrl_Movie}/Movie`)
    .then(movieResponse => movieResponse.json())
    .then(movieData => {
      const matchingMovie = movieData.find(movie => movie.Movie === formData.Movie);
      const movieId = matchingMovie ? matchingMovie.id : null;
      // Update the movie_id field of the movie_session item using the fetched movieId
      fetch(`${apiUrl_Session}/MovieSession/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, Movie_id: movieId }),
      })
        .then((response) => response.json())
        .then((data) => {
          setData("reload parent")
          handleClose();
        })
        .catch((error) => console.error(error));
    })
    .catch(movieError => console.error(movieError))
      */  
  }
  return(
    <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
        <div class="form-group">
            <label hmtlfor="movie" class="col-form-label text-dark">Movie:</label>
            <select className="form-select" onChange={handleEdit} value={formData.movie_id} id="movie_id">
                {movies?.map((option) => (
                        <option key={option.id} value={option.id}>{option.Movie} </option>
                    ))}
            </select>
          </div>
          <div class="form-group">
            <label hmtlfor="room" class="col-form-label text-dark">Room:</label>
            <select className="form-select" onChange={handleEdit} value={formData.room_id} id="room_id">
                {rooms?.map((option) => (
                        <option key={option.id} value={option.id}>{option.Name}</option>
                    ))}
            </select>
          </div>
          <div class="form-group">
            <label hmtlfor="Date" class="col-form-label text-dark">Date:</label>
            <input type="date" class="form-control" min={new Date().toISOString().split('T')[0]} onChange={handleEdit} value={formData.Date} id="Date"></input>
          </div>
          <div class="form-group">
            <label hmtlfor="Start" class="col-form-label text-dark">Timeslot:</label>
            <input type="text" class="form-control" onChange={handleEdit} value={formData.Start} id="timeslot"></input>
          </div>
          <button type="submit">update</button>
        </form>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

const DeleteSession = ({data, setData, show, handleClose}) => {
  const [id, setId] = useState(data[0].id)
  const apiUrl_Room = process.env.REACT_APP_API_URL_ROOM;
  const apiUrl_Movie = process.env.REACT_APP_API_URL_MOVIE;
  const apiUrl_Session = process.env.REACT_APP_API_URL_SESSION;

  const handleDelete = () => {
    
    fetch(`${apiUrl_Session}/moviesession/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => 
        setData("reload"))
      .catch(error => console.error(error))

    handleClose()
  }

  return(
    <>
    <Modal show={show} onHide={handleClose}>
     <Modal.Body className="text-dark">
          Confirm Delete Movie Session ? 
     </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDelete}>
          Yes {/*handle delete/update*/}
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

    /*
    fetch(`${apiUrl_Movie}/Movie`)
      .then(movieResponse => movieResponse.json())
      .then(movieData => {
        fetch(`${apiUrl_Session}/MovieSession`)
          .then(sessionResponse => sessionResponse.json())
          .then(sessionData => {
            fetch(`${apiUrl_Room}/Room`) // fetch room data
              .then(roomResponse => roomResponse.json())
              .then(roomData => {
                // Join the movie, movie_session, and room arrays based on their id/movie_id/room_id fields
                const joinedData = sessionData.map(session => {
                  const movie = movieData.find(movie => movie.id === parseInt(session.Movie_id));
                  const movieTitle = movie ? movie.Movie: "Nil";
                  const room = roomData.find(room => room.id === parseInt(session.Room_id));
                  const roomName = room ? room.Name : "Nil";
                  return { ...session, Movie: movieTitle, Room: roomName };
                });
               
                setData(joinedData); // set the state variable to the joined data
              })
              .catch(roomError => console.error(roomError));
          })
          .catch(sessionError => console.error(sessionError));
      })
      .catch(movieError => console.error(movieError));
      */