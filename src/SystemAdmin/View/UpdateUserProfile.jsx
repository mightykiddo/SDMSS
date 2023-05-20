import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const UpdateUserProfile = ({data, reload, show, handleClose}) => {
    const apiUrl_UserProf = process.env.REACT_APP_API_URL_USEPROFILE;
    const [formData, setFormData] = useState(data[0]);


    const updateProfileByID = async (data) => {
      await fetch(`${apiUrl_UserProf}/Userprofile/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    }

    const handleEdit = (e) => {
        const {id,value} = e.target;
        setFormData((prevFormData) => ({...prevFormData, [id]: value}));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = getFormData();
        await updateProfileByID(data)
        reload("re-load parent")   //call view to reload to reflect change
        handleClose();
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