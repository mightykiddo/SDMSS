import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import SuspendUserAccount from "./SuspendUserAccount,";
import UpdateUserAccount from "./UpdateUserAccount";

function ViewUserAcc(){
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL_USERACC;

  //modal
  const getUser = async () => {
    const response = await fetch(`${apiUrl}/user`)
    const user = await response.json();
    return user;
  }
  
  
  const queryUserByEmail = async (query) => {
    const response = await fetch(`${apiUrl}/user?email=${query}`)
    const user = await response.json();
    return user;
  } 
  
  useEffect(() => { //load data on page load 
    getUser()
    .then(users => {
      setData(users)
    })
    .catch(error => console.error(error));
  }, [filteredData, query]);


  const handleUpdate = (id) => { //filter by id and pass to modal
    setFilteredData(data.filter((userData) => userData.id === id));//boundary variable
    setShowModal(true);//boundary opens modal
  };

  const handleEdit = e => {
    setQuery(e.target.value);
  };

  const handleCloseModal = () => { //to close all modal for view
    setShowModal(false);    
    setConfirmModal(false);
    setType('');
  };

  const confirmModal = (id, status) => {  //open specific modal for view
    setFilteredData(data.filter((userData) => userData.id === id));
    if (status === "Active") {
      setType("suspend")
    }
    else if (status === "Suspended") {
      setType("unsuspend")
    }
    setConfirmModal(true); 
  }


  const handleSubmit = async (e, query)=> { //for search 
    e.preventDefault();
    var users = await queryUserByEmail(query); //fetch alr then controller tell boundary to change view
    setData(users)
   //queryUserByEmail(query) 
    //.then(user => setData(user))
    //.catch(error => console.error(error));
  };

     return(
      <>
       <div className="d-flex justify-content-end">
        <form className="input-group p-3" style={{width : "350px"}}   onSubmit={(e) =>handleSubmit(e, query)}>
          <input class="form-control border " type={"text"} value={query} onChange={(e) => handleEdit(e)} ></input>
        <button  className="btn btn-light" type="submit">search</button>
        </form>
      </div>
      <table className="text-black" style={{backgroundColor : "whitesmoke", width : '1000px'}}>
      <thead>
        <tr className="d-flex-column" style={{backgroundColor : "orange"}}>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Account Type</th>
          <th scope="col">Status</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {data.length == 0 ?  (<p className="p-3 text-black">No Matching Records</p>) : (
        data?.map((acc) => (
          <>
          <tr key={acc.email}>
            <td className="p-2">{acc.username}</td>
            <td className="p-2">{acc.email}</td>
            <td className="p-2">{acc.acctype}</td>
            <td className='p-2' style={{ color: acc.status === "Active" ? "royalblue" : "red"}}>{acc.status}</td>
            <td>
              <div className="d-flex align-items-center justify-content-end"> 
                    <button type="button" className="btn text-white m-1 " style={{backgroundColor : "royalblue"}}
                        onClick={() => handleUpdate(acc.id)}>
                        Update
                      </button>
                    {/*<button type="button" className="btn text-white m-1" style={{backgroundColor : "red"}} onClick={()=> confirmModal(acc.id, "delete")}>Delete</button> */}
                    <button type="button" className="btn text-white m-1" style={{backgroundColor : "red"}} onClick={()=> confirmModal(acc.id, acc.status)}>{acc.status === "Active" ? "Suspend" : "Unsuspend"}</button>
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
        reload = {setFilteredData} //setData to reload parent
        show={showModal}
        handleClose={handleCloseModal}/>
     }
      {showConfirmModal === true && (type === "suspend" || type === "unsuspend") &&
     <SuspendUserAccount
          type = {type}
          data={filteredData}
          reload = {setFilteredData}
          show={showConfirmModal}
          handleClose={handleCloseModal}/>
      }
     </>
     );
}

export default ViewUserAcc;




