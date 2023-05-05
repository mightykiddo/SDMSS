import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
function ConfirmModal({type,db, data, setData, show, handleClose}) {
  //if(Type == "delete" || Type == "suspend")
  const [id, setId] = useState(data[0].id)
  const apiUrl_Room = process.env.REACT_APP_API_URL_ROOM;
  const apiUrl_Movie = process.env.REACT_APP_API_URL_MOVIE;
  const apiUrl_Session = process.env.REACT_APP_API_URL_SESSION;
  const handleDelete = () => {
    //host 
    var host = ""
    if (db == "Movie") { host =  apiUrl_Movie}
    else if (db == "MovieSession") { host = apiUrl_Session}
    else if (db == "Room") { host = apiUrl_Room};
    
    fetch(`${host}/${db}/${id}`, {
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
  const handleSuspend = () => {
    
  }
  return (
    <Modal show={show} onHide={handleClose}>
     <Modal.Body>
          {type == "delete" ? "Confirm Delete" : "Suspend User?"}
     </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={type === "delete" ? handleDelete : handleSuspend}>
          Yes {/*handle delete/update*/}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;