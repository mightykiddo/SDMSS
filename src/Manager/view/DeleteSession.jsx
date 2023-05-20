import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteSession = ({data, reload, show, handleClose}) => {
    const [id, setId] = useState(data[0].id)
    const apiUrl_Session = process.env.REACT_APP_API_URL_SESSION;

    //model
    const deleteMovieSession = async (id) => {
        await fetch(`${apiUrl_Session}/moviesession/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
    }

    //controller
    const handleDelete = async (e, id) => {
        e.preventDefault();
        await deleteMovieSession(id)
        reload("reload")
        handleClose()
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