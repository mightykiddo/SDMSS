import { useState, useEffect } from "react";
import UpdateModal from "../UpdateModal";
import ConfirmModal from "../ConfirmModal";
function ViewSession() {

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL_SESSION;

  const loadData = () => {
    fetch(`${apiUrl}/MovieSession`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));
  }
  
  
  const handleCloseModal = () => {
    setShowModal(false); 
    setConfirmModal(false);
  };
  useEffect(() => { //load data on page load 
    loadData()
  }, [filteredData]);

  const handleUpdate = (id) => { //filter by id and pass to modal
    setFilteredData(data.filter((sessionData) => sessionData.id === id));
    // filteredData will now contain an array with only the movie data objects that match the given id
    setShowModal(true);
  };


  const confirmModal = (id) => {
    setFilteredData(data.filter((sessionData) => sessionData.id === id));
    //delete modal
    setConfirmModal(true); 
  }
  return (
    <>
    <table className="text-black" style={{backgroundColor : "whitesmoke", width : '1000px'}}>
      <thead>
        <tr className="d-flex-column" style={{backgroundColor : "orange"}}>
        <th scope="col" className="p-3">Movie</th>
          <th scope="col">Room</th>
          <th scope="col">Date</th>
          <th scope="col">Start</th>
          <th scope="col">End</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody >
        {data?.map((session) => (
          <>
          <tr key={session.id}>
            <td className="p-2">{session.Movie}</td>
            <td className="p-2">{session.Room}</td>
            <td className="p-2">{session.Date}</td>
            <td className="p-2">{session.Start}</td>
            <td className="p-2">{session.End}</td>
            <td>
               <div className="d-flex align-items-center justify-content-end"> 
                    <button type="button" className="btn text-white m-1 " style={{backgroundColor : "royalblue"}} onClick={() => handleUpdate(session.id)}>Update</button>
                    <button type="button" className="btn text-white m-1" style={{backgroundColor : "red"}} onClick={() => confirmModal(session.id)}>Delete</button>
               </div>
               
            </td>
          </tr>
          <tr>
              <td colSpan="6" className="border-bottom"></td>
          </tr>
          </>
        ))}
      </tbody>
    </table>
    {showModal === true &&          
          <UpdateModal
          type="ViewMovieSession"
          data={filteredData}
          setData = {setFilteredData} //setData to reload parent
          show={showModal}
          handleClose={handleCloseModal}
        />}
    {showConfirmModal == true &&
        <ConfirmModal
        type = "delete"
        db = "MovieSession"
        data={filteredData}
        setData ={setFilteredData}
        show={showConfirmModal}
        handleClose={handleCloseModal}/>
    }
</>
  );
}

export default ViewSession;
