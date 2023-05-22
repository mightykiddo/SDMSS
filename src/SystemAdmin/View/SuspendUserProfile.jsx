import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const SuspendUserProfile = ({type, data, reload, show , handleClose}) => {

    const apiUrl_UserProf = process.env.REACT_APP_API_URL_USEPROFILE;

    //modal
      const updateStatus = async(data, type) => {
        await fetch(`${apiUrl_UserProf}/userprofile/${data[0].id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( {...data[0], status :type}),
        })
        return true;
      }
      
      //controller
        const handleSuspend = async (e) =>{
          e.preventDefault();
          const data = getFormData(); //get from view
          if (type === "unsuspend"){
            const state = await updateStatus(data, 'Active')//call model
            reload(state)
            handleClose()

          }
          else if (type === "suspend") {
            const state = await updateStatus(data, "Suspended")//call model
            reload(state)
            handleClose()

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