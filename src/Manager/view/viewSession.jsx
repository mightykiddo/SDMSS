import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import ConfirmModal from "../ConfirmModal";
function ViewSession() {

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL_SESSION;

  const loadData = () => {
    fetch(`${apiUrl}/MovieSession`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));
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
    console.log(query)
    fetch(`${apiUrl}/MovieSession?Movie=${query}`)
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
          <th scope="col">Start</th>
          <th scope="col">End</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody >
      {data.length == 0 ?  (<p className="p-3">No Matching Records</p>) : (
        data?.map((session) => (
          <>
          <tr key={session.id}>
            <td className="p-2">{session.Movie}</td>
            <td className="p-2">{session.Room}</td>
            <td className="p-2">{session.Date}</td>
            <td className="p-2">{session.Start}</td>
            <td className="p-2">{session.End}</td>
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
    const [movies, setMovies] = useState([])
    const [rooms , setRooms] = useState([])

  useEffect(() => { //load data on page load 
      fetch(`${apiUrl_Movie}/Movie`)
      .then(response => response.json())
      .then(data => {
           const extractedMovies = data.map(item => item.Movie);
           setMovies(extractedMovies);
      })
      .catch(error => console.error(error));

      //fetch room too
      fetch(`${apiUrl_Room}/Room`)
      .then(response => response.json())
      .then(data => {
           const extractedRooms = data.map(item => item.Room);
           setRooms(extractedRooms);
      })
      .catch(error => console.error(error));
    }, []);

  const handleEdit = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiUrl_Session}/MovieSession/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setData("reload parent")
        handleClose();
        
      })
      .catch((error) => console.error(error));
     
  }
  return(
    <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
        <div class="form-group">
            <label hmtlfor="Movie" class="col-form-label">Movie:</label>
            <select className="form-select" onChange={handleEdit} value={formData.Movie} id="Movie">
                {movies.map((option) => (
                        <option key={option} value={option}>{option} </option>
                    ))}
            </select>
          </div>
          <div class="form-group">
            <label hmtlfor="Room" class="col-form-label">Room:</label>
            <select className="form-select" onChange={handleEdit} value={formData.Room} id="Room">
                {rooms.map((option) => (
                        <option key={option} value={option}>{option} </option>
                    ))}
            </select>
          </div>
          <div class="form-group">
            <label hmtlfor="Date" class="col-form-label">Date:</label>
            <input type="Date" class="form-control" min={new Date().toISOString().split('T')[0]} onChange={handleEdit} value={formData.Date} id="Date"></input>
          </div>
          <div class="form-group">
            <label hmtlfor="Start" class="col-form-label">Start:</label>
            <input type="time" class="form-control" onChange={handleEdit} value={formData.Start} id="Start"></input>
          </div>
          <div class="form-group">
            <label hmtlfor="End" class="col-form-label">End:</label>
            <input type="time" class="form-control" onChange={handleEdit} value={formData.End} id="End"></input>
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
    
    fetch(`${apiUrl_Session}/MovieSession/${id}`, {
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
     <Modal.Body>
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