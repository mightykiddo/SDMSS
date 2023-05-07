import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function ViewUserAcc(){
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL_USERACC;

  const loadData = () => {
    fetch(`${apiUrl}/User`)
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

  const confirmModal = (id, status) => {
    setFilteredData(data.filter((userData) => userData.id === id));
    //delete modal
    if (status === "Active") {
      setType("suspend")
    }
    else {
      setType("unsuspend")
    }
    setConfirmModal(true); 
  }

  const handleSubmit = (e)=> {
    e.preventDefault();
    fetch(`${apiUrl}/User?Email=${query}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  };

   console.log(data)
     return(
      <>
       <div className="d-flex justify-content-end">
        <form className="input-group p-3" style={{width : "350px"}}   onSubmit={handleSubmit}>
          <input class="form-control border " type={"text"} value={query} onChange={handleChange} ></input>
        <button  className="btn btn-light" type="submit">search</button>
        </form>
      </div>
      <table className="text-black" style={{backgroundColor : "whitesmoke", width : '1000px'}}>
      <thead>
        <tr className="d-flex-column" style={{backgroundColor : "orange"}}>
          <th scope="col">Email</th>
          <th scope="col">Account Type</th>
          <th scope="col">Status</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {data.length == 0 ?  (<p className="p-3">No Matching Records</p>) : (
        data?.map((acc) => (
          <>
          <tr key={acc.Email}>
            <td className="p-2">{acc.Email}</td>
            <td className="p-2">{acc.Type}</td>
            <td className='p-2' style={{ color: acc.Status === "Active" ? "royalblue" : "red"}}>{acc.Status}</td>
            <td>
              <div className="d-flex align-items-center justify-content-end"> 
                    <button type="button" className="btn text-white m-1 " style={{backgroundColor : "royalblue"}}
                        onClick={() => handleUpdate(acc.id)}>
                        Update
                      </button>
                  <button type="button" className="btn text-white m-1" style={{backgroundColor : "red"}} onClick={()=> confirmModal(acc.id, "delete")}>Delete</button>
                    <button type="button" className="btn text-white m-1" style={{backgroundColor : "red"}} onClick={()=> confirmModal(acc.id, acc.Status)}>{acc.Status === "Active" ? "Suspend" : "Unsuspend"}</button>
               </div>
            </td>
          </tr>
          <tr>
              <td colSpan="6" className="border-bottom"></td>
          </tr>
          </>
        ))) }
      </tbody>
     </table>
     {showModal === true  && 
      <UpdateUserAccount
        data={filteredData}
        setData = {setFilteredData} //setData to reload parent
        show={showModal}
        handleClose={handleCloseModal}/>
     }
      {showConfirmModal === true && type === "delete" &&
     <DeleteUserAcc
          data={filteredData}
          setData = {setFilteredData}
          show={showConfirmModal}
          handleClose={handleCloseModal}/>
      }
      {showConfirmModal === true && (type === "suspend" || type === "unsuspend") &&
     <SuspendUserAcc
          type = {type}
          data={filteredData}
          setData = {setFilteredData}
          show={showConfirmModal}
          handleClose={handleCloseModal}/>
      }
     </>
     );
}

export default ViewUserAcc;


const UpdateUserAccount = ({data, setData, show, handleClose}) => {
  const apiUrl_User = process.env.REACT_APP_API_URL_USERACC;
  const [formData, setFormData] = useState(data[0]);
  
  /*alternate way
  const [user , setUser] = useState([]);
  useEffect(() => { //load data on page load 
    fetch(`${apiUrl_User}/User`)
    .then(response => response.json())
    .then(data => {
          const extractedEmail = data.map(item => item.Email);
          setUser(extractedEmail);
    })
    .catch(error => console.error(error));
  });*/
  
  const handleEdit = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    fetch(`${apiUrl_User}/User/${formData.id}`, {
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
  return(
    <>
      <Modal show={show} onHide={handleClose}>
      <Modal.Body>
      <form  onSubmit={handleSubmit}>
          <div class="form-group">
            <label hmtlfor="Email"  class="col-form-label">Email:</label>
            <input type="text" onChange={handleEdit}  value={formData.Email} class="form-control" id="Email"></input>
          </div>
          <div class="form-group">
            <label hmtlfor="Status" class="col-form-label">Status:</label>
            <textarea class="form-control" onChange={handleEdit} value={formData.Status} id="Status"></textarea>
          </div>
          <div class="form-group">
            <label hmtlfor="Type" class="col-form-label">Type</label>
            <select className="form-select" onChange={handleEdit} value={formData.Type} id="Type">
            <option value="Customer">Customer</option>
                    <option value="System Admin">System Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Staff">Staff</option>
            </select>
          </div>
          <button type="submit">Update</button>
       </form>
      </Modal.Body>
      </Modal>

    </>
  )
}

const DeleteUserAcc = ({data, setData, show , handleClose}) => {
  const apiUrl_User = process.env.REACT_APP_API_URL_USERACC;

  const handleDelete = e =>{
    fetch(`${apiUrl_User}/User/${data[0].id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => 
        setData("reload"))
      .catch(error => console.error(error))

    handleClose()
  }
  return(
    <>
    <Modal show={show} onHide={handleClose}>
     <Modal.Body>
          Confirm Delete User ?
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

const SuspendUserAcc = ({type, data, setData, show , handleClose}) => {
  const apiUrl_User = process.env.REACT_APP_API_URL_USERACC;

  const handleDelete = e =>{
    if (type === "unsuspend"){
      fetch(`${apiUrl_User}/User/${data[0].id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {...data[0], Status : "Active"}),
      })
        .then(response => response.json())
        .then(data => 
          setData("reload"))
        .catch(error => console.error(error))

      handleClose()
    }
    else {
      fetch(`${apiUrl_User}/User/${data[0].id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {...data[0], Status : "Suspended"}),
      })
        .then(response => response.json())
        .then(data => 
          setData("reload"))
        .catch(error => console.error(error))

      handleClose()
    }
  } 
  return(
    <>
    <Modal show={show} onHide={handleClose}>
     <Modal.Body>
          {type === "suspend" ?  "Confirm Suspend User ?" : "Confirm Unsuspend User ?"}
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