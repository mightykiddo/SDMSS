import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const SuspendUserAccount = ({type, data, reload, show , handleClose}) => {
    const apiUrl_User = process.env.REACT_APP_API_URL_USERACC;
  
    const updateStatus = async (data, type) => { //void
      await fetch(`${apiUrl_User}/user/${data[0].id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {...data[0], status : type}),
      })
      return true
    }
  
  
    const handleSuspend = async (e) =>{
      e.preventDefault();
      const data = getFormData();
      if (type === "unsuspend"){
        const state = await updateStatus(data, 'Active')//call model
        reload(state)
        handleClose()
      }
      else if (type === "suspend") {
        const state = await updateStatus(data, 'Suspended')//call model
        reload(state)
        handleClose()
      }
    } 
  
    //view function
    const getFormData = () => {
        return data
    }
      
    return(
      <>
      <Modal show={show} onHide={handleClose}>
       <Modal.Body className="text-dark">
            {type === "suspend" ?  "Confirm Suspend User ?" : "Confirm Unsuspend User ?"}
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => handleSuspend(e)}>
            Yes {/*handle delete/update*/}
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    )
  }

export default SuspendUserAccount;