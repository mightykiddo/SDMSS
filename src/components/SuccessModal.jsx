import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
function SuccessModel({message, show , handleClose}){

     return(
          <>
     <Modal show={show} onHide={handleClose}>
     <Modal.Body className="text-dark">
          {message}
     </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Yes 
        </Button>
      </Modal.Footer>
    </Modal>
          </>
     )
}


export default SuccessModel;