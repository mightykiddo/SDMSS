import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const UpdateUserAccount = ({data, reload, show, handleClose}) => {
    const apiUrl_User = process.env.REACT_APP_API_URL_USERACC;
    const apiUrl_profile =  process.env.REACT_APP_API_URL_USEPROFILE;
    const [profile, setProfile] = useState()
    const [formData, setFormData] = useState(data[0]);
  
    //modal
    const getUserProfile = async () => {
        return fetch(`${apiUrl_profile}/Userprofile`)
        .then((response) => response.json())
    }
  
    const updateUserById = async (formData) => {
      return fetch(`${apiUrl_User}/user/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
    }
  
    //controller
    useEffect(() => {
      getUserProfile()
          .then((data) => setProfile(data))
          .catch((error) => console.error(error));
    } , [])
  
    const handleEdit = (e) => {
      const { id, value } = e.target;
      setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
    };
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = getFormData();
      updateUserById(formData)
        .then((data) => {
          reload("re-load parent")
          handleClose();})
        .catch((error) => console.error(error));
    }
  
    //view function
    const getFormData = () => {
        return formData
    }
      
    return(
      <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Body>
        <form  onSubmit={(e) => handleSubmit(e)}>
            <div class="form-group">
              <label hmtlfor="username"  class="col-form-label text-dark">username:</label>
              <input type="text" onChange={(e) => handleEdit(e)}  value={formData.username} class="form-control " id="username"></input>
            </div>
            <div class="form-group">
              <label hmtlfor="Email"  class="col-form-label text-dark">Email:</label>
              <input type="text" disabled onChange={(e) => handleEdit(e)}  value={formData.email} class="form-control" id="email"></input>
            </div>
            <div class="form-group">
              <label hmtlfor="Status" class="col-form-label text-dark">Status:</label>
              <select class="form-control" disabled onChange={(e) => handleEdit(e)} value={formData.status} id="status">
                <option value="Suspend">Suspend</option>
                <option value="Active">Active</option>
              </select>
            </div>
            <div class="form-group">
              <label hmtlfor="Type" class="col-form-label text-dark">Type</label>
              <select className="form-select" onChange={(e) => handleEdit(e)} value={formData.acctype} id="acctype">
                      {profile?.map((item) => (
                           <>
                                <option value={item.UserProfile} key={item.id}>{item.UserProfile}</option>
                           </>
                      ))}
              </select>
            </div>
            <button type="submit">Update</button>
         </form>
        </Modal.Body>
        </Modal>
  
      </>
    )
  }
  

export default UpdateUserAccount;