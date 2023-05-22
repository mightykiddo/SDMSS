import { useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";
import DeleteRoom from "./DeleteRoom";
import UpdateRoom from "./UpdateRoom";
function ViewRoom() {

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL_ROOM;

  //model
  const getRoom = async () => {
    const response = await fetch(`${apiUrl}/Room`)
    const room = response.json();
    return room;
  }
  

  const queryRoomByEmail = async (query) =>{
    const response =  await fetch(`${apiUrl}/Room?Name=${query}`)
    const rooms = response.json();
    return rooms;
  }
  //controller
  useEffect(() => { //load data on page load 
    getRoom()
    .then(rooms => setData(rooms))
    .catch(error => console.error(error));
  }, [filteredData, query]);


  const handleUpdate = (id) => { //filter by id and pass to modal
    setFilteredData(data.filter((roomData) => roomData.id === id));
    // filteredData will now contain an array with only the movie data objects that match the given id
    setShowModal(true);
  };

  //for search 
  const handleEdit = e => {
    setQuery(e.target.value);
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

  const handleSubmit = async (e)=> {
    e.preventDefault();
    console.log(query)
    const rooms = await queryRoomByEmail(query);
    setData(rooms)
  };

  return (
     <>
      <div className="d-flex justify-content-end">
        <form className="input-group p-3" style={{width : "350px"}}   onSubmit={(e) => handleSubmit(e)}>
          <input class="form-control border " type={"text"} value={query} onChange={(e)=> handleEdit(e)} ></input>
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
      {data.length == 0 ?  (<p className="p-3 text-black">No Matching Records</p>) : (
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
          reload = {setFilteredData} //setData to reload parent
          show={showModal}
          handleClose={handleCloseModal}
        />}
    {showConfirmModal == true &&
        <DeleteRoom
        data={filteredData}
        reload ={setFilteredData}
        show={showConfirmModal}
        handleClose={handleCloseModal}/>
    }
     </>
  );
}

export default ViewRoom;


