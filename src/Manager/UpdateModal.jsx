import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

function UpdateModal({type,  data, setData, show, handleClose}) {
  const apiUrl_Room = process.env.REACT_APP_API_URL_ROOM;
  const apiUrl_Movie = process.env.REACT_APP_API_URL_MOVIE;
  const apiUrl_Session = process.env.REACT_APP_API_URL_SESSION;
  const [formData, setFormData] = useState(data[0]);
  const [movies, setMovies] = useState([])
  const [rooms , setRooms] = useState([])
  
  useEffect(() => { //load data on page load 

    if(type === "ViewMovieSession" || type ==="ViewMovies"){
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
    }



  }, []);

  //view Movies
  if(type === "ViewMovies"){

  //changing movie name should change the name in session also
  
    
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
     
      
      /* 
      console.log(data[0].Movie)
      fetch(`http://localhost:4001/Movie?Movie=darkknight`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({Movie: "apple" }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          // Handle the response data
        })
        .catch((error) => console.error(error));*/
  }

    return (
      <Modal show={show} onHide={handleClose}>
      <Modal.Body>
      <form  onSubmit={handleSubmit}>
          <div class="form-group">
            <label hmtlfor="id"  class="col-form-label">id:</label>
            <input type="text" disabled onChange={handleEdit}  value={formData.id} class="form-control" id="id"></input>
          </div>
          <div class="form-group">
            <label hmtlfor="Movie" class="col-form-label">Movie:</label>
            <textarea class="form-control" onChange={handleEdit} value={formData.Movie} id="Movie"></textarea>
          </div>
          <div class="form-group">
            <label hmtlfor="Duration" class="col-form-label">Duration:</label>
            <textarea class="form-control" onChange={handleEdit} value={formData.Duration} id="Duration"></textarea>
          </div>
          <div class="form-group">
            <label hmtlfor="Synopsis" class="col-form-label">Synopsis:</label>
            <textarea class="form-control" onChange={handleEdit} value={formData.Synopsis} id="Synopsis"></textarea>
          </div>
          <div class="form-group">
            <label hmtlfor="AgeRating" class="col-form-label">Age Rating:</label>
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
    );
  }

  else if (type == "ViewRoom"){
    
    const handleEdit = (event) => {
      const { id, value } = event.target;
      setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`${apiUrl_Room}/Room/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
            //window.location.reload();
            setData("re-load parent")
            handleClose()
        })
        .catch((error) => console.error(error));
       
    }
    return (
    
        <Modal show={show} onHide={handleClose}>
     <Modal.Body>
     <form  onSubmit={handleSubmit}>
          <div  class="form-group">
            <label hmtlfor="Room"  class="col-form-label">Room:</label>
            <input type="Room" onChange={handleEdit}  value={formData.Room} class="form-control" id="Room"></input>
          </div>
          <button type="submit">Update</button>
        </form>
        </Modal.Body>
      </Modal>
      
    )
  }

  else if (type == "ViewMovieSession"){

   // console.log(movies,rooms)
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
          console.log("reload")
          setData("reload parent")
          handleClose();
          
        })
        .catch((error) => console.error(error));
       
    }
    return (
    
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
      
    )
  }
}
export default UpdateModal;

