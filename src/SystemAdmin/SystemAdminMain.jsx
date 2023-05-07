import { useState } from "react";

//imports
import CreateUserAcc from "./Create/CreateUserAcc";
import ViewUserAcc from "./View/ViewUserAcc";

function SystemAdmin() {
  const [Option, setOption] = useState('Cuser');//set default val

  const handleOptionChange = (event) => {
       setOption(event.target.value);
  };
  return (
    <>
    <div style={{maxWidth : '1000px', margin : '0 auto'}}>
         <div className="d-flex">
              <div className=" text-white d-flex align-items-center text-left p-3 ">
                   <p className="m-0"  style={{width:'100px'}}>Toggle:</p>
                   <select className="form-select" value={Option} onChange={handleOptionChange}  style={{width:'200px'}}>
                        <option value="Cuser">Create User Account</option>
                        <option value="Vuser">View User Account</option>
                        <option value="Cprofile">Create User Profile</option>
                        <option value="Vprofile">View User Profile</option>
                   </select>
              </div>
         </div>

         <div style={{width : '100%'}}>
              {Option == "Cuser" && <CreateUserAcc/>}
              {Option == "Vuser" && <ViewUserAcc/>}
         </div>

    </div>

    </>
  );
}

export default SystemAdmin;
