import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteMovie = ({data, reload, show, handleClose}) => {
    const apiUrl_Movie = process.env.REACT_APP_API_URL_MOVIE;
    const apiUrl_Session = process.env.REACT_APP_API_URL_SESSION;
  
    const id =data[0].id
  
    //delete room in movie session // do here instead of in movie sessions

    const deleteMovie = async (id) => {
        
    }
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
              });
            })
            .catch(sessionError => console.error(sessionError));
    
          reload("reload");
          handleClose();
        })
        .catch(error => console.error(error));
    };
  

    
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

export default DeleteMovie;
  
  