import { useState, useEffect} from "react";
import UpdateModal from "../UpdateModal";
import ConfirmModal from "../ConfirmModal";
function ViewRoom() {

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL_ROOM;

  const loadData = () => {
    fetch(`${apiUrl}/Room`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));
  }
  useEffect(() => { //load data on page load 
    loadData()
  }, [filteredData]);



  const handleUpdate = (id) => { //filter by id and pass to modal
    setFilteredData(data.filter((roomData) => roomData.id === id));
    // filteredData will now contain an array with only the movie data objects that match the given id
    setShowModal(true);
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

  return (
     <>
    <table className="text-black" style={{backgroundColor : "whitesmoke", width : '100%'}}>
      <thead>
        <tr className="d-flex-column" style={{backgroundColor : "orange"}}>
          <th scope="col" className="p-3">Room</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody >
        {data?.map((room) => (
          <>
          <tr key={room.No}>
            <td className="p-4">{room.Room}</td>
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
        ))}
      </tbody>
     </table>
     {showModal === true && 
          <UpdateModal
          type = "ViewRoom"
          data={filteredData}
          setData = {setFilteredData} //setData to reload parent
          show={showModal}
          handleClose={handleCloseModal}/>
     }
    {showConfirmModal == true &&
        <ConfirmModal
        type = "delete"
        db = "Room"
        data={filteredData}
        setData ={setFilteredData}
        show={showConfirmModal}
        handleClose={handleCloseModal}/>
    }
     </>
  );
}

export default ViewRoom;