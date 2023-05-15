import React from 'react';
import { Link } from 'react-router-dom';
import '../w3.css';
import NavBar from './NavBar';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [acctype, setacctype] = useState("customer");
    const [loyaltypoint, setloyaltypoint] = useState(0);
    const [seatpref, setseatpref] = useState("");
    const history = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        setacctype("customer");
        setloyaltypoint(0);
        const status = "Active"; 
        const customer = {acctype, name, email, username, password, loyaltypoint, status, seatpref}
        fetch('http://localhost:8005/user',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(customer)
        }).then(()=>{
            console.log("new customer added");
            history('/login');
            
        })
    }
    

    return (
        <>

            <NavBar />

            {/* <!-- Page content --> */}
            <div className="w3-content w3-padding w3-center" style={{width:"60%"}}>
                
                {/* <!-- Log in Section --> */}
                <div className="w3-container" id="login">
                    <div className="">
                        <h1 className="w3-border-bottom w3-border-teal w3-padding-64">Create New Account</h1>

                        <form to="/login" onSubmit={handleSubmit} className="w3-padding-32">
                            
                            <input type="text" value={name} placeholder="Name" onChange={(e)=> setName(e.target.value)} className="w3-input w3-section w3-border w3-round" required name="Name"/>
                            <input type="email" value={email} placeholder="Email" onChange={(e)=> setEmail(e.target.value)} className="w3-input w3-section w3-border w3-round" required name="Email"/>
                            <input type="text" value={username} placeholder="Username" onChange={(e)=> setUsername(e.target.value)} className="w3-input w3-section w3-border w3-round" required name="Username"/>
                            <input type="password" value={password} placeholder="Password" onChange={(e)=> setPassword(e.target.value)} className="w3-input w3-section w3-border w3-round" required name="Password"/>
                            
                            <select value={seatpref} onChange={(e)=> setseatpref(e.target.value)} className="w3-input w3-section w3-border w3-round">
                                    <option value=" ">Select Your Preference Seat</option>
                                    <option value="A1">A1</option>
                                    <option value="A2">A2</option>
                                    <option value="A3">A3</option>
                                    <option value="B1">B1</option>
                                    <option value="B2">B2</option>
                                    <option value="B3">B3</option>
                                    <option value="C1">C1</option>
                                    <option value="C2">C2</option>
                                    <option value="C3">C3</option>
                                </select>
                            <div className="w3-center w3-padding-large">
                                
                                <button className="w3-button w3-teal w3-round-large w3-margin-top" >CREATE A NEW ACCOUNT</button>
                                <Link to='/login' className="w3-button w3-light-grey w3-round-large w3-margin-top">SIGN IN</Link>
                                
                            </div>
                        </form>
                    </div>
                </div>


                {/* <!-- End page content --> */}
            </div>
        </>
    )
}

export default CreateAccount