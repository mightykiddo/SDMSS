import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function ViewUserProfile() {
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setConfirmModal] = useState(false);
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [query, setQuery] = useState('');
    const [type, setType] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL_USEPROFILE;

    const loadData = () => {
        fetch(`${apiUrl}/UserProfile`)
        .then(response => response.json())
        .then(data => {
          setData(data)
          
        })
        .catch(error => console.error(error));
      }
    
    useEffect(() => { //load data on page load 
        loadData()
        }, [filteredData, query]);

    const handleUpdate = (id) => { //filter by id and pass to modal
        setFilteredData(data.filter((userData) => userData.id === id));
        // filteredData will now contain an array with only the movie data objects that match the given id
        setShowModal(true);
      };

      const handleChange = event => {
        setQuery(event.target.value);
      };
    
      const handleCloseModal = () => {
        setShowModal(false); 
        setConfirmModal(false);
        setType('');
      };

      const confirmModal = (id) => {
        setFilteredData(data.filter((userData) => userData.id === id));
        setType("delete");
        setConfirmModal(true); 
      };

      const handleSubmit = (e)=> {
        e.preventDefault();
        fetch(`${apiUrl}/Userprofile?UserProfile=${query}`)
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error(error));
      };

      return (
        <>
        <div className="d-flex justify-content-end">
            <form className="input-group p-3" style={{width : "350px"}}   onSubmit={handleSubmit}>
                <input class="form-control border " type={"text"} value={query} onChange={handleChange} ></input>
                <button  className="btn btn-light" type="submit">Search</button>
            </form>
        </div>
      <table className="text-black" style={{backgroundColor : "whitesmoke", width : '1000px'}}>
      <thead>
        <tr className="d-flex-column" style={{backgroundColor : "orange"}}>
            <th scope="col">User Profile</th>
            <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {data.length == 0 ?  (<p className="p-3">No Matching Records</p>) : (
            data?.map((userprof) => (
                <>
                <tr key={userprof.UserProfile}>
                    <td className="p-2">{userprof.UserProfile}</td>
                    <td>
                        <div className="d-flex align-items-center justify-content-end"> 
                            <button type="button" className="btn text-white m-1 " style={{backgroundColor : "royalblue"}}
                                onClick={() => handleUpdate(userprof.id)}>
                                Update
                            </button>
                            <button type="button" className="btn text-white m-1" style={{backgroundColor : "red"}} onClick={()=> confirmModal(userprof.id, "delete")}>Delete</button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan="6" className="border-bottom"></td>
                </tr>
                </>    
            )))}
      </tbody>
      </table>
      {showModal === true &&
        <UpdateUserProfile 
            data = {filteredData}
            setData = {setFilteredData}
            show = {showModal}
            handleClose = {handleCloseModal}/>
      }
      {showConfirmModal === true && type === "delete" &&
        <DeleteUserProfile
            data =  {filteredData}
            setData = {setFilteredData}
            show =  {showConfirmModal}
            handleClose = {handleCloseModal}/>
      }  
      </>
      );
}

export default ViewUserProfile;

const UpdateUserProfile = ({data, setData, show, handleClose}) => {
    const apiUrl_UserProf = process.env.REACT_APP_API_URL_USEPROFILE;
    const [formData, setFormData] = useState(data[0]);

    const handleEdit = (event) => {
        const {id,value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [id]: value}));
    }

    const handleSubmit = e => {
        e.preventDefault();
    

    fetch(`${apiUrl_UserProf}/Userprofile/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setData("re-load parent")
          handleClose();
          
        })
        .catch((error) => console.error(error));
    }
    return (
        <>
            <Modal show={show} onHide = {handleClose}>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label hmtlfor="UserProfile"  class="col-form-label">User Profile:</label>
                        <input type="text" onChange={handleEdit}  value={formData.Userprofile} class="form-control" id="UserProfile"></input>
                    </div>
                    <button type="submit">Update</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
    }

const DeleteUserProfile = ({data, setData, show , handleClose}) => {
    const apiUrl_UserProf = process.env.REACT_APP_API_URL_USEPROFILE;
    const handleDelete = e => {
        fetch(`${apiUrl_UserProf}/Userprofile/${data[0].id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
        }})
            .then((response) => response.json())
            .then(data => {
              setData("reload")
            .catch((error) => console.error(error));
        
        handleClose()
        })

        }
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            Confirm Delete User Profile?
          </Modal.Body>
          <Modal.Footer>
            <Button variant = "secondary" onClick={handleDelete}>
              Yes {/*handle Delete / update */}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}
 
