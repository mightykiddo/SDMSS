import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
function ViewMovie() {

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL_MOVIE;

  const loadData = () => {
    fetch(`${apiUrl}/Movie`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));
  }
  
  useEffect(() => { //load data on page load 
    loadData()
  }, [filteredData,query]);

  const handleUpdate = (id) => { //filter by id and pass to modal
    setFilteredData(data.filter((movieData) => movieData.id === id));
    // filteredData will now contain an array with only the movie data objects that match the given id
    setShowModal(true);
  };


  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false); 
    setConfirmModal(false);
  };

  const confirmModal = (id) => {
    setFilteredData(data.filter((movieData) => movieData.id === id));
    //delete modal
    setConfirmModal(true); 
  }

  const handleSearch = (e)=> {
    e.preventDefault();
    fetch(`${apiUrl}/Movie?Movie=${query}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  };

  return (
    <> 
      <div className="d-flex justify-content-end">
        <form className="input-group p-3" style={{width : "350px"}}   onSubmit={handleSearch}>
          <input class="form-control border " type={"text"} value={query} onChange={handleChange} ></input>
        <button  className="btn btn-light" type="submit">search</button>
        </form>
      </div>
    <table className="text-black" style={{backgroundColor : "whitesmoke", width : '1000px'}}>
      <thead>
        <tr className="d-flex-column" style={{backgroundColor : "orange"}}>
          <th scope="col" className="p-3">Id</th>
          <th scope="col">Movie</th>
          <th scope="col">Duration</th>
          <th scope="col">Synopsis</th>
          <th scope="col" className="text-nowrap">Age Rating</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody >
      {data.length == 0 ?  (<p className="p-3">No Matching Records</p>) : (
        data?.map((movie) => (
          <>
          <tr key={movie.id}>
            <td className="p-2">{movie.id}</td>
            <td className="p-2">{movie.Movie}</td>
            <td className="p-2">{movie.Duration}</td>
            <td className="p-2">{movie.Synopsis}</td>
            <td className="p-2">{movie.AgeRating}</td>
            <td>
              <div className="d-flex align-items-center justify-content-end"> 
                    <button type="button" className="btn text-white m-1 " style={{backgroundColor : "royalblue"}}
                        onClick={() => handleUpdate(movie.id)}>
                        Update {/*pass id instead handleupdate(id)*/}
                      </button>
                    <button type="button" className="btn text-white m-1" style={{backgroundColor : "red"}} onClick={() => confirmModal(movie.id)}>Delete</button>
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
          <UpdateMovie
          data={filteredData}
          setData = {setFilteredData} //setData to reload parent
          show={showModal}
          handleClose={handleCloseModal}
        />}
    {showConfirmModal == true &&
        <DeleteMovie
        data={filteredData}
        setData ={setFilteredData}
        show={showConfirmModal}
        handleClose={handleCloseModal}/>
    }
    </>
  );
}

export default ViewMovie;

const UpdateMovie = ({data, setData, show, handleClose}) => {
  const apiUrl_Room = process.env.REACT_APP_API_URL_ROOM;
  const apiUrl_Movie = process.env.REACT_APP_API_URL_MOVIE;
  const [formData, setFormData] = useState(data[0]);

  const handleEdit = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiUrl_Movie}/Movie/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setData("re-load parent")
        handleClose();
      })
      .catch((error) => console.error(error));
  }
  return(
    <>
      <Modal show={show} onHide={handleClose}>
      <Modal.Body>
      <form  onSubmit={handleSubmit}>
          <div class="form-group">
            <label hmtlfor="id"  class="col-form-label text-dark">id:</label>
            <input type="text" disabled onChange={handleEdit}  value={formData.id} class="form-control" id="id"></input>
          </div>
          <div class="form-group">
            <label hmtlfor="Movie" class="col-form-label text-dark">Movie:</label>
            <textarea class="form-control" onChange={handleEdit} value={formData.Movie} id="Movie"></textarea>
          </div>
          <div class="form-group">
            <label hmtlfor="Duration" class="col-form-label text-dark">Duration:</label>
            <textarea class="form-control" onChange={handleEdit} value={formData.Duration} id="Duration"></textarea>
          </div>
          <div class="form-group">
            <label hmtlfor="Synopsis" class="col-form-label text-dark">Synopsis:</label>
            <textarea class="form-control" onChange={handleEdit} value={formData.Synopsis} id="Synopsis"></textarea>
          </div>
          <div class="form-group">
            <label hmtlfor="AgeRating" class="col-form-label text-dark">Age Rating:</label>
            <select className="form-select" onChange={handleEdit} value={formData.AgeRating} id="AgeRating">
                  <option value="PG-13">PG-12</option>
                  <option value="PG">PG</option>
                  <option value="R21">R21</option>
            </select>
          </div>
          <button type="submit">Update</button>
        </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

const DeleteMovie = ({data, setData, show, handleClose}) => {
  const apiUrl_Movie = process.env.REACT_APP_API_URL_MOVIE;
  const apiUrl_Session = process.env.REACT_APP_API_URL_SESSION;

  const id =data[0].id

  //delete room in movie session // do here instead of in movie sessions
  const handleDelete = () => {
    fetch(`${apiUrl_Movie}/Movie/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(deletedMovie => {
        console.log(`Deleted Movie with id ${id}`);
  
        // Find all movie sessions with the deleted room's id and set the room_id and Room fields to null
        fetch(`${apiUrl_Session}/moviesession?movie_id=${id}`)
          .then(sessionResponse => sessionResponse.json())
          .then(sessionData => {
            const updatedSessions = sessionData.map(session => {
              return { ...session, movie_id: null, movie: null }
            });
            console.log("Updated sessions: ", updatedSessions);
  
            // Send a PUT request to update the MovieSession data on the server for each updated session
            updatedSessions.forEach(session => {
              fetch(`${apiUrl_Session}/moviesession/${session.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(session)
              })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
            });
          })
          .catch(sessionError => console.error(sessionError));
  
        setData("reload");
        handleClose();
      })
      .catch(error => console.error(error));
  };

  /*
  const handleDelete = () => {
    fetch(`${apiUrl_Movie}/Movie/${id}`, {
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
*/
  
  return(
    <>
    <Modal show={show} onHide={handleClose}>
     <Modal.Body className="text-dark">
          Confirm Delete Movie ?
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

