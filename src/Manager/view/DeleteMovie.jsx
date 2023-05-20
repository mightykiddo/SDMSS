import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteMovie = ({data, reload, show, handleClose}) => {
    const apiUrl_Movie = process.env.REACT_APP_API_URL_MOVIE;
    const apiUrl_Session = process.env.REACT_APP_API_URL_SESSION;
  
    const id =data[0].id


    //model
    const deleteMovie = async (id) => {
      const res = await fetch(`${apiUrl_Movie}/Movie/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      res.json();

      const session_res = await fetch(`${apiUrl_Session}/moviesession?movie_id=${id}`)
      const sessionData = await session_res.json();

      const updatedSessions = sessionData.map(session => {
        return { ...session, movie_id: null, movie: null }
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


    //controller
    const handleDelete = async (e, id) => {
          e.preventDefault();
          await deleteMovie(id) //call model
          reload("reload");
          handleClose();
    };
  

    
    return(
      <>
      <Modal show={show} onHide={handleClose}>
       <Modal.Body className="text-dark">
            Confirm Delete Movie ?
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

export default DeleteMovie;
  
  