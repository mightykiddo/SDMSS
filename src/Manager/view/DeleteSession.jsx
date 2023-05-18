import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteSession = ({data, reload, show, handleClose}) => {
    const [id, setId] = useState(data[0].id)
    const apiUrl_Session = process.env.REACT_APP_API_URL_SESSION;

    //model
    const deleteMovieSession = async (id) => {
        return fetch(`${apiUrl_Session}/moviesession/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
    }

    //controller
    const handleDelete = (e, id) => {
        e.preventDefault();
      deleteMovieSession(id)
        .then(() => {
          reload("reload")
          handleClose()})
        .catch(error => console.error(error))
    }
  
    return(
      <>
      <Modal show={show} onHide={handleClose}>
       <Modal.Body className="text-dark">
            Confirm Delete Movie Session ? 
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => handleDelete(e,id)}>
            Yes {/*handle delete/update*/}
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    )
  }
  
export default DeleteSession;