//Manager View
import { useNavigate, Link} from "react-router-dom";
import {BrowserRouter as Router,  Route, Routes, Switch } from 'react-router-dom';
import CreateMovie from "./create/CreateMovie";
import CreateMovieSession from "./create/CreateMovieSess";
import CreateRoom from "./create/CreateRoom";
import ViewMovie from "./view/ViewMovie";
import ViewSession from "./view/viewSession";
import ViewRoom from "./view/ViewRoom";

//states
import { useState } from "react";
function Main() {

     //Select from dd   
     const [Option, setOption] = useState('');//set default val

     const navigate = useNavigate();
     const currentUrl = window.location.pathname.split('/').pop();

     const handleOptionChange = (event) => {
       setOption(event.target.value);
       //navigate(`${event.target.value}`);
       
     };
     //console.log(Option);

     //set max-width to main body, then align content left
     return (
     <>
     <div style={{maxWidth : '1000px', margin : '0 auto'}}>
          <div className="d-flex">
               <div className=" text-white d-flex align-items-center text-left p-3 ">
                    <p className="m-0"  style={{width:'100px'}}>Toggle:</p>
                    <select className="form-select" value={Option} onChange={handleOptionChange}  style={{width:'200px'}}>
                         <option value="create-movie">
                              Create Movie
                         </option>
                         <option value="create-movie-session">
                              Create Movie Session
                         </option>
                         <option value="create-room">
                              Create Room
                         </option>
                         <option value="view-room">
                              View Room
                         </option>
                         <option value="view-session">
                              View Movie Session
                         </option>
                         <option value="view-movie">
                              View Movie
                         </option>
                         <option value="GenerateReport">
                              Generate Report
                         </option>
                    </select>
               </div>
          {/* 
               <div className="m-0 input-group justify-content-end align-items-center">
                    <form class="form-inline my-2 my-lg-0">
                         <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                    </form>
               </div>
          */}
          </div>
          <div style={{width : '100%'}}>
                {Option == "create-movie" && <CreateMovie/>}
                {Option == "create-movie-session" && <CreateMovieSession/>}
               {Option == "create-room" && <CreateRoom/>}
               {Option == "view-room" && <ViewRoom/>}
               {Option == "view-session" && <ViewSession/>}
               {Option == "view-movie" && <ViewMovie/>}
               
          </div>
     </div>

     </>
     );
   }
   
   export default Main;
   
