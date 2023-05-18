import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import UpdateSession from "./UpdateSession";
import DeleteSession from "./DeleteSession";

function ViewSession() {

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');
  const apiUrl_Session = process.env.REACT_APP_API_URL_SESSION;


  const getMovieSession = async() => {
    return fetch(`${apiUrl_Session}/moviesession`)
      .then(res => res.json())
  }

  const queryMovieSession = async(query) => {
    return fetch(`${apiUrl_Session}/moviesession?movie=${query}`)
    .then(response => response.json())
  }
    
  useEffect(() => { //load data on page load 
      getMovieSession()
      .then(data => setData(data))
      .catch(SessionError => console.error(SessionError))
  }, [filteredData, query]);

  const handleEdit = e => {
    setQuery(e.target.value);
  };
  
  const handleCloseModal = () => {
    setShowModal(false); 
    setConfirmModal(false);
  };

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


  const handleSubmit = (e,query)=> {//rename
    e.preventDefault();
    queryMovieSession(query)
      .then(data => setData(data))
      .catch(error => console.error(error));
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <form className="input-group p-3" style={{width : "350px"}}   onSubmit={(e) => handleSubmit(e, query)}>
          <input class="form-control border " type={"text"} value={query} onChange={(e) => handleEdit(e)} ></input>
        <button  className="btn btn-light" type="submit">search</button>
        </form>
    </div>
    <table className="text-black" style={{backgroundColor : "whitesmoke", width : '1000px'}}>
      <thead>
        <tr className="d-flex-column" style={{backgroundColor : "orange"}}>
        <th scope="col" className="p-3">Movie</th>
          <th scope="col">Room</th>
          <th scope="col">Date</th>
          <th scope="col">Timeslot</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody >
      {data.length == 0 ?  (<p className="p-3 text-black">No Matching Records</p>) : (
        data?.map((session) => (
          <>
          <tr key={session.id}>
            <td className="p-2">{session.movie === null ? "Nil" : session.movie}</td>
            <td className="p-2">{session.room === null ? "Nil" : session.room}</td>
            <td className="p-2">{session.date}</td>
            <td className="p-2">{session.timeslot}</td>
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
        )))}
      </tbody>
    </table>
    {showModal === true &&          
          <UpdateSession
          data={filteredData}
          reload = {setFilteredData} //reload to reload parent
          show={showModal}
          handleClose={handleCloseModal}
        />}
    {showConfirmModal == true &&
        <DeleteSession
        data={filteredData}
        reload = {setFilteredData}
        show={showConfirmModal}
        handleClose={handleCloseModal}/>
    }
</>
  );
}

export default ViewSession;


