import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import UpdateMovie from "./UpdateMovie";
import DeleteMovie from "./DeleteMovie"
function ViewMovie() {

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL_MOVIE;

  //model
  const getMovie = async () => {
    const response = await fetch(`${apiUrl}/Movie`)
    const movie = response.json();
    return movie;
  }
  const queryMovie = async (query) => {
    const response = await fetch(`${apiUrl}/Movie?Movie=${query}`)
    const movie = response.json();
    return movie;
  }

  //controller
  useEffect(() => { //load data on page load 
    getMovie()
    .then(movie => setData(movie))
    .catch(error => console.error(error));
  }, [filteredData,query]);

  const handleUpdate = (id) => { //filter by id and pass to modal
    setFilteredData(data.filter((movieData) => movieData.id === id));
    setShowModal(true);
  };


  const handleChange = e => {
    setQuery(e.target.value);
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

  const handleSearch = async (e, query)=> {
    e.preventDefault();
    const movie = await queryMovie(query)
    setData(movie)
  };

  return (
    <> 
      <div className="d-flex justify-content-end">
        <form className="input-group p-3" style={{width : "350px"}}   onSubmit={(e) => handleSearch(e, query)}>
          <input class="form-control border " type={"text"} value={query} onChange={(e) => handleChange(e)} ></input>
        <button  className="btn btn-light" type="submit">search</button>
        </form>
      </div>
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
      {data.length == 0 ?  (<p className="p-3 text-black">No Matching Records</p>) : (
        data?.map((movie) => (
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
        )))}
      </tbody>
    </table>
    {showModal === true &&          
          <UpdateMovie
          data={filteredData}
          reload = {setFilteredData} //reload to reload parent
          show={showModal}
          handleClose={handleCloseModal}
        />}
    {showConfirmModal == true &&
        <DeleteMovie
        data={filteredData}
        reload ={setFilteredData}
        show={showConfirmModal}
        handleClose={handleCloseModal}/>
    }
    </>
  );
}

export default ViewMovie;


