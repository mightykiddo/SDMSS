import { useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";
function ViewRoom() {

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL_ROOM;

  const loadData = () => {
    fetch(`${apiUrl}/Room`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));
  }

  useEffect(() => { //load data on page load 
    loadData()
  }, [filteredData, query]);



  const handleUpdate = (id) => { //filter by id and pass to modal
    setFilteredData(data.filter((roomData) => roomData.id === id));
    // filteredData will now contain an array with only the movie data objects that match the given id
    setShowModal(true);
  };

  //for search 
  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false); 
    setConfirmModal(false);
  };

  const confirmModal = (id) => {
    setFilteredData(data.filter((roomData) => roomData.id === id));
    //delete modal
    setConfirmModal(true); 
  }

  const handleSubmit = (e)=> {
    e.preventDefault();
    console.log(query)
    fetch(`${apiUrl}/Room?Name=${query}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  };

  return (
     <>
      <div className="d-flex justify-content-end">
        <form className="input-group p-3" style={{width : "350px"}}   onSubmit={handleSubmit}>
          <input class="form-control border " type={"text"} value={query} onChange={handleChange} ></input>
        <button  className="btn btn-light" type="submit">search</button>
        </form>
      </div>
    <table className="text-black" style={{backgroundColor : "whitesmoke", width : '100%'}}>
      <thead>
        <tr className="d-flex-column" style={{backgroundColor : "orange"}}>
          <th scope="col" className="p-3">Room</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody >
      {data.length == 0 ?  (<p className="p-3">No Matching Records</p>) : (
        data?.map((room) => (
          <>
          <tr key={room.No}>
            <td className="p-4">{room.Name}</td>
            <td>
               <div className="d-flex justify-content-end"> 
                    <button type="button" className="btn text-white m-1 " style={{backgroundColor : "royalblue"}} onClick={()=>handleUpdate(room.id)}>Update</button>
                    <button type="button" className="btn text-white m-1" style={{backgroundColor : "red"}}  onClick={() => confirmModal(room.id)}>Delete</button>
               </div>
            </td>
          </tr>
          <tr>
              <td colSpan="2" className="border-bottom"></td>
          </tr>
          </>
        )))}
      </tbody>
     </table>
     {showModal === true &&      
     <UpdateRoom
          data={filteredData}
          setData = {setFilteredData} //setData to reload parent
          show={showModal}
          handleClose={handleCloseModal}
        />}
    {showConfirmModal == true &&
        <DeleteRoom
        data={filteredData}
        setData ={setFilteredData}
        show={showConfirmModal}
        handleClose={handleCloseModal}/>
    }
     </>
  );
}

export default ViewRoom;


const UpdateRoom = ({data, setData, show, handleClose}) => {
  const apiUrl_Room = process.env.REACT_APP_API_URL_ROOM;
  const [formData, setFormData] = useState(data[0]);


  const handleEdit = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.Name)
    fetch(`${apiUrl_Room}/Room/${formData.id}`, {
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
            <label hmtlfor="Name"  class="col-form-label">Room Name:</label>
            <input type="text" onChange={handleEdit}  value={formData.Name} class="form-control" id="Name"></input>
          </div>
          <button type="submit">Update</button>
        </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

const DeleteRoom = ({data, setData, show, handleClose}) => {
  const apiUrl_Room = process.env.REACT_APP_API_URL_ROOM;
  const apiUrl_Session = process.env.REACT_APP_API_URL_SESSION;

  const id =data[0].id

  //delete room in movie session // do here instead of in movie sessions
  const handleDelete = () => {
    fetch(`${apiUrl_Room}/Room/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(deletedRoom => {
        console.log(`Deleted room with id ${id}`);
  
        // Find all movie sessions with the deleted room's id and set the room_id and Room fields to null
        fetch(`${apiUrl_Session}/MovieSession?Room_id=${id}`)
          .then(sessionResponse => sessionResponse.json())
          .then(sessionData => {
            const updatedSessions = sessionData.map(session => {
              return { ...session, Room_id: null, Room: null }
            });
            console.log("Updated sessions: ", updatedSessions);
  
            // Send a PUT request to update the MovieSession data on the server for each updated session
            updatedSessions.forEach(session => {
              fetch(`${apiUrl_Session}/MovieSession/${session.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(session)
              })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
            });
          })
          .catch(sessionError => console.error(sessionError));
  
        setData("reload");
        handleClose();
      })
      .catch(error => console.error(error));
  };
  



  /*
  const handleDelete = () => {
    fetch(`${apiUrl_Room}/Room/${data[0].id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => 
        {
          console.log("id to delete",id)
          fetch(`${apiUrl_Session}/MovieSession?Room_id=${id}`)
            .then(session => session.json())
            .then(sessionData => {
                const removeRoom = sessionData.map(session => {
                  return {...session, Room_id : "" , Room : "" }
                })
                console.log(removeRoom)
            }).catch(sessionError => console.log(sessionError))

          setData("reload")
        }
      ).catch(error => console.error(error))

    handleClose()
  }*/
  return(
    <>
    <Modal show={show} onHide={handleClose}>
     <Modal.Body>
          Confirm Delete Room ?
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
