import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function UpdateMovie ({data, reload, show, handleClose}){ 
    console.log('data:', data);
    const apiUrl_Movie = process.env.REACT_APP_API_URL_MOVIE;
    const [formData, setFormData] = useState(data[0]);

    const handleEdit = (event) => {
      const { id, value } = event.target;
      setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
    };
  
    //model
    const updateMovie = async (formData) => {
        return fetch(`${apiUrl_Movie}/Movie/${formData.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
            .then((response) => response.json())
    }

    //controller
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = getFormData();
        updateMovie(formData)
        .then((data) => {
          reload("re-load parent")
          handleClose();
        })
        .catch((error) => console.error(error));
    }

    //view
    const getFormData  = () => {
        return formData
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
  

export default UpdateMovie;