import { useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";

const UpdateRoom = ({data, reload, show, handleClose}) => {
    const apiUrl_Room = process.env.REACT_APP_API_URL_ROOM;
    const [formData, setFormData] = useState(data[0]);
  
    //model
    const updateRoom = async(formData) =>{
        await fetch(`${apiUrl_Room}/Room/${formData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())

        return true;
        
    }

    //controller
    const handleEdit = (e) => {
      const { id, value } = e.target;
      setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = getFormData();
        const state = await updateRoom(formData)//call model
        reload(state)
        handleClose();
    }

    const getFormData = () => {
        return formData
    }
    
    return(
      <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Body>
        <form  onSubmit={(e) => handleSubmit(e)}>
            <div class="form-group">
              <label hmtlfor="Name"  class="col-form-label text-dark">Room Name:</label>
              <input type="text" onChange={(e) => handleEdit(e)}  value={formData.Name} class="form-control" id="Name"></input>
            </div>
            <button type="submit">Update</button>
          </form>
          </Modal.Body>
        </Modal>
      </>
    )
  }
  
export default UpdateRoom;