import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const UpdateUserProfile = ({data, reload, show, handleClose}) => {
    const apiUrl_UserProf = process.env.REACT_APP_API_URL_USEPROFILE;
    const [formData, setFormData] = useState(data[0]);


    const updateProfileByID = async (formData) => {
      return fetch(`${apiUrl_UserProf}/Userprofile/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
    }

    const handleEdit = (e) => {
        const {id,value} = e.target;
        setFormData((prevFormData) => ({...prevFormData, [id]: value}));
    }

    const handleSubmit = e => {
        e.preventDefault();
        const formData = getFormData();
        updateProfileByID(formData)
        .then(() => {
          reload("re-load parent")//call view to reload to reflect change
          handleClose();})
        .catch((error) => console.error(error));
    }


    const getFormData = () => {
      return formData
  }
    return (
        <>
            <Modal show={show} onHide = {handleClose}>
                <Modal.Body>
                    <form onSubmit={(e) => handleSubmit(e)}>
                    <div class="form-group">
                        <label hmtlfor="UserProfile"  class="col-form-label text-black">User Profile:</label>
                        <input type="text" onChange={(e) => handleEdit(e)}  value={formData.UserProfile} class="form-control" id="UserProfile"></input>
                    </div>
                    <button type="submit">Update</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UpdateUserProfile;