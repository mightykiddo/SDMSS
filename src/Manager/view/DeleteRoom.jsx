import { useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteRoom = ({data, reload, show, handleClose}) => {
    const apiUrl_Room = process.env.REACT_APP_API_URL_ROOM;
    const apiUrl_Session = process.env.REACT_APP_API_URL_SESSION;
  
    const id =data[0].id

    //model
    const deleteRoom = async (id) => {
      const res = await fetch(`${apiUrl_Room}/Room/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      res.json();
      const session_res = await fetch(`${apiUrl_Session}/moviesession?movie_id=${id}`)
      const sessionData = await session_res.json();

      const updatedSessions = sessionData.map(session => {
        return { ...session, room_id: null, room: null }
      });

      for (const session of updatedSessions) {
        fetch(`${apiUrl_Session}/moviesession/${session.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(session)
        })
      }
    }
  
    //delete room in movie session // do here instead of in movie sessions
    //controller
    const handleDelete = async (e, id) => {
      e.preventDefault();
      await deleteRoom(id)//call model
      reload("reload");
      handleClose();

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