import { useState } from "react";

//imports
import CreateUserAcc from "./Create/CreateUserAcc";
import ViewUserAcc from "./View/ViewUserAcc";
import CreateUserProfile from "./Create/CreateUserProfile";
import ViewUserProfile from "./View/ViewUserProfile";
import { useNavigate } from "react-router-dom";

function SystemAdmin() {
  const [Option, setOption] = useState('Cuser');//set default val
  const history = useNavigate();

  const handleOptionChange = (event) => {
       setOption(event.target.value);
  };

  const deleteUserSession = async (currentUser) => {
     return fetch( `http://localhost:8030/usersession/${currentUser}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
      })
  }
  const logout = () => {
     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
     console.log(currentUser)
     deleteUserSession(currentUser)  
     .then(()=>{history("/")})
 }
  return (
    <>
    <div style={{maxWidth : '1000px', margin : '0 auto'}}>
         <div className="d-flex justify-content-between align-items-center">
              <div className=" text-white d-flex align-items-center text-left p-3 ">
                   <p className="m-0"  style={{width:'100px'}}>Toggle:</p>
                   <select className="form-select" value={Option} onChange={handleOptionChange}  style={{width:'200px'}}>
                        <option value="Cuser">Create User Account</option>
                        <option value="Vuser">View User Account</option>
                        <option value="Cprofile">Create User Profile</option>
                        <option value="Vprofile">View User Profile</option>
                   </select>
              </div>
              <button onClick={logout} className="p-2 text-red">logout</button>
         </div>

         <div style={{width : '100%'}}>
              {Option == "Cuser" && <CreateUserAcc/>}
              {Option == "Vuser" && <ViewUserAcc/>}
              {Option == "Cprofile" && <CreateUserProfile/>}
              {Option == "Vprofile" && <ViewUserProfile/>}
         </div>

    </div>

    </>
  );
}

export default SystemAdmin;
