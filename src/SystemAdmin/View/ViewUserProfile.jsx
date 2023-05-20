import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import SuspendUserProfile from "./SuspendUserProfile";
import UpdateUserProfile  from "./UpdateUserProfile";
function ViewUserProfile() {
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setConfirmModal] = useState(false);
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [query, setQuery] = useState('');
    const [type, setType] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL_USEPROFILE;

    //model
    const getUserProfile = async () => {
      const response = await  fetch(`${apiUrl}/UserProfile`)
      const userProfile = await response.json();
      return userProfile; //return list of userprofile
    }
    
    const queryUserProfile = async (query) => {
      const response = await  fetch(`${apiUrl}/Userprofile?UserProfile=${query}`)
      const userProfile = await response.json();
      return userProfile; //return list of userprofile

    }

    //controller
    useEffect(() => { //load data on page load 
      getUserProfile()
        .then(userprofile => {
          setData(userprofile)   
        })
        .catch(error => console.error(error));
    }, [filteredData, query]);

    const handleUpdate = (id) => { //filter by id and pass to modal
        setFilteredData(data.filter((userData) => userData.id === id));
        // filteredData will now contain an array with only the movie data objects that match the given id
        setShowModal(true);
    };

    const handleEdit = event => {
        setQuery(event.target.value);
    };
    
    const handleCloseModal = () => {
        setShowModal(false); 
        setConfirmModal(false);
        setType('');
    };

    const confirmModal = (id, status) => {
      setFilteredData(data.filter((userData) => userData.id === id));
      if (status === "Active") {
        setType("suspend")
      }
      else if (status === "Suspended") {
        setType("unsuspend")
      }
      setConfirmModal(true); 
    };

    const handleSubmit = async (e, query)=> {
      e.preventDefault();
      const userProfile = await queryUserProfile(query)
      setData(userProfile) //update the page
    };

      return (
        <>
        <div className="d-flex justify-content-end">
            <form className="input-group p-3" style={{width : "350px"}}   onSubmit={(e) => handleSubmit(e, query)}>
                <input class="form-control border " type={"text"} value={query} onChange={(e) => handleEdit(e)} ></input>
                <button  className="btn btn-light" type="submit">Search</button>
            </form>
        </div>
      <table className="text-black" style={{backgroundColor : "whitesmoke", width : '1000px'}}>
      <thead>
        <tr className="d-flex-column" style={{backgroundColor : "orange"}}>
            <th scope="col">User Profile</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {data.length == 0 ?  (<p className="p-3 text-black">No Matching Records</p>) : (
            data?.map((userprof) => (
                <>
                <tr key={userprof.UserProfile}>
                    <td className="p-2">{userprof.UserProfile}</td>
                    <td className='p-2' style={{ color: userprof.status === "Active" ? "royalblue" : "red"}}>{userprof.status}</td>

                    <td>
                        <div className="d-flex align-items-center justify-content-end"> 
                            <button type="button" className="btn text-white m-1 " style={{backgroundColor : "royalblue"}}
                                onClick={() => handleUpdate(userprof.id)}>
                                Update
                            </button>
                            <button type="button" className="btn text-white m-1" style={{backgroundColor : "red"}} onClick={()=> confirmModal(userprof.id, userprof.status)}>{userprof.status === "Active" ? "Suspend" : "Unsuspend"}</button>
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
            reload = {setFilteredData}
            show = {showModal}
            handleClose = {handleCloseModal}/>
      }
      {showConfirmModal === true && (type === "suspend" || type === "unsuspend") &&
        <SuspendUserProfile
            type = {type}
            data =  {filteredData}
            reload = {setFilteredData}
            show =  {showConfirmModal}
            handleClose = {handleCloseModal}/>
      }  
      </>
      );
}

export default ViewUserProfile;

