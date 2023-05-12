import { useEffect, useState } from "react";
import SuccessModel from "../../components/SuccessModal";
function CreateUserAcc() {

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
     id : "",
     name : "",
     email : "",
     password : "",
     status: "Active",
     acctype : ""});
  const apiUrl = process.env.REACT_APP_API_URL_USERACC;
  const apiUrl_profile =  process.env.REACT_APP_API_URL_USEPROFILE;
  const [profile, setProfile] = useState()

  useEffect(() => {
     fetch(`${apiUrl_profile}/Userprofile`)
          .then((response) => response.json())
          .then((data) => setProfile(data))
          .catch((error) => console.error(error));
  } , [])


  const handleSubmit = e =>{
     e.preventDefault();
     fetch(`${apiUrl}/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
  }

  const handleEdit = e => {
     const { id, value } = e.target;
     setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  }

  const handleCloseModal = () => {
     setShowModal(false); 
};
     return (
          <>
          <form onSubmit={handleSubmit} className="CreateMovie text-white bg-dark d-flex-column " style={{height : "1000px"}}>
          <div className="form-group d-flex align-items-center text-left p-3 ">
               <label className="col-form-label"  style={{width:'100px'}}>Name:</label>
               <input id="name" className="form-control" type="text" style={{ width: '400px'}}  onChange={handleEdit} ></input>
          </div>
          <div className="form-group d-flex align-items-center text-left p-3 ">
               <label className="col-form-label"  style={{width:'100px'}}>Email:</label>
               <input id="email" className="form-control" type="text" style={{ width: '400px'}}  onChange={handleEdit} ></input>
          </div>
          <div className="form-group d-flex align-items-center text-left p-3 ">
               <p className="col-form-label"  style={{width:'100px'}}>Password:</p>
               <input id="password" className="form-control" type="text" style={{ width: '400px'}} onChange={handleEdit} ></input>
          </div>
          <div className="form-group d-flex p-3">
               <p className="col-form-label" style={{width:'100px'}}>Select Account Type:  </p>
               <select id="acctype" className="form-select text-wrap" style={{ width: '400px'}} onChange={handleEdit}>
                    {/* got data then use map to populate the dd */}
                    {profile?.map((item) => (
                         <>
                              <option value={item.UserProfile} key={item.id}>{item.UserProfile}</option>
                         </>
                    ))}
               </select>
          </div>
          <div className="d-flex justify-content-center  p-3">
               <button type="submit" onClick={()=>setShowModal(true)} className="btn btn-danger">Create</button>
          </div>
  </form>
       
       <SuccessModel 
       message = "User Successfully Created !" 
       show = {showModal}
       handleClose={handleCloseModal}
  />
       </>
     );
   }
   
   export default CreateUserAcc;
   