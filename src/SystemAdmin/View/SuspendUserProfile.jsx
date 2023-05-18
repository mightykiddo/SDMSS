import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const SuspendUserProfile = ({type, data, reload, show , handleClose}) => {

    const apiUrl_UserProf = process.env.REACT_APP_API_URL_USEPROFILE;

    //modal
      const updateStatus = async(data, type) => {
        fetch(`${apiUrl_UserProf}/userprofile/${data[0].id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( {...data[0], status :type}),
        })
          .then(response => response.json())
      }
      
      //controller
        const handleSuspend = (e) =>{
          const data = getFormData(); //get from view
          if (type === "unsuspend"){
            updateStatus(data, "Active") //call model
              .then(() => 
                reload("reload"))
                handleClose()
              .catch(error => console.error(error))
      
          }
          else if (type === "suspend") {
            updateStatus(data, "Suspended") //call model
              .then(() => 
                reload("reload"))
                handleClose()
              .catch(error => console.error(error))
          }
        } 

    const getFormData = () => {
          return data
      }
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body className="text-black">
            Confirm Suspend User Profile?
          </Modal.Body>
          <Modal.Footer>
            <Button variant = "secondary" onClick={(e) => handleSuspend(e)}>
              Yes {/*handle Delete / update */}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}
 
export default SuspendUserProfile;