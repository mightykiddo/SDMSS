import { useState, useEffect } from "react";
import ConfirmModal from "../ConfirmModal";
import UpdateModal from "../UpdateModal";
function ViewMovie() {

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL_MOVIE;

  const loadData = () => {
    fetch(`${apiUrl}/Movie`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));
  }
  
  useEffect(() => { //load data on page load 
    loadData()
  }, [filteredData]);

  const handleUpdate = (id) => { //filter by id and pass to modal
    setFilteredData(data.filter((movieData) => movieData.id === id));
    // filteredData will now contain an array with only the movie data objects that match the given id
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false); 
    setConfirmModal(false);
  };

  const confirmModal = (id) => {
    setFilteredData(data.filter((movieData) => movieData.id === id));
    //delete modal
    setConfirmModal(true); 
  }


  return (
    <>
    <table className="text-black" style={{backgroundColor : "whitesmoke", width : '1000px'}}>
      <thead>
        <tr className="d-flex-column" style={{backgroundColor : "orange"}}>
          <th scope="col" className="p-3">Id</th>
          <th scope="col">Movie</th>
          <th scope="col">Duration</th>
          <th scope="col">Synopsis</th>
          <th scope="col" className="text-nowrap">Age Rating</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody >
        {data?.map((movie) => (
          <>
          <tr key={movie.id}>
            <td className="p-2">{movie.id}</td>
            <td className="p-2">{movie.Movie}</td>
            <td className="p-2">{movie.Duration}</td>
            <td className="p-2">{movie.Synopsis}</td>
            <td className="p-2">{movie.AgeRating}</td>
            <td>
              <div className="d-flex align-items-center justify-content-end"> 
                    <button type="button" className="btn text-white m-1 " style={{backgroundColor : "royalblue"}}
                        onClick={() => handleUpdate(movie.id)}>
                        Update {/*pass id instead handleupdate(id)*/}
                      </button>
                    <button type="button" className="btn text-white m-1" style={{backgroundColor : "red"}} onClick={() => confirmModal(movie.id)}>Delete</button>
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
          type="ViewMovies"
          data={filteredData}
          setData = {setFilteredData} //setData to reload parent
          show={showModal}
          handleClose={handleCloseModal}
        />}
    {showConfirmModal == true &&
        <ConfirmModal
        type = "delete"
        db = "Movie"
        data={filteredData}
        setData ={setFilteredData}
        show={showConfirmModal}
        handleClose={handleCloseModal}/>
    }
    </>
  );
}

export default ViewMovie;

