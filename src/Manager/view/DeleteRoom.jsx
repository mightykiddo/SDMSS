import { useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteRoom = ({data, reload, show, handleClose}) => {
    const apiUrl_Room = process.env.REACT_APP_API_URL_ROOM;
    const apiUrl_Session = process.env.REACT_APP_API_URL_SESSION;
  
    const id =data[0].id

    //model
    const deleteRoom = async (id) => {
      return  fetch(`${apiUrl_Room}/Room/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(deletedRoom => {
          console.log(`Deleted room with id ${id}`);
    
          // Find all movie sessions with the deleted room's id and set the room_id and Room fields to null
          fetch(`${apiUrl_Session}/moviesession?room_id=${id}`)
            .then(sessionResponse => sessionResponse.json())
            .then(sessionData => {
              const updatedSessions = sessionData.map(session => {
                return { ...session, room_id: null, room: null }
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
                  .catch(error => console.error(error));
              });
            })
            .catch(sessionError => console.error(sessionError));
          })
    }
  
    //delete room in movie session // do here instead of in movie sessions
    //controller
    const handleDelete = (e, id) => {
      e.preventDefault();
      deleteRoom(id)//call model
      .then(() => { 
          reload("reload");
          handleClose();
      })
      .catch(error => console.error(error));
    };
    
  
    return(
      <>
      <Modal show={show} onHide={handleClose}>
       <Modal.Body className="text-dark">
            Confirm Delete Room ?
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => handleDelete(e, id)}>
            Yes {/*handle delete/update*/}
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    )
  }
  

export default DeleteRoom;