import React from 'react';
import { Link } from 'react-router-dom';
import '../w3.css';
import NavBar from './NavBar';

const CreateAccount = () => {
<<<<<<< Updated upstream
=======

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
        const customer = {acctype, name, email, username, password, loyaltypoint, seatpref}
        fetch('http://localhost:8005/user',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(customer)
        }).then(()=>{
            console.log("new customer added");
            history('/login');
            
        })
    }
    

>>>>>>> Stashed changes
    return (
        <>

            <NavBar />

            {/* <!-- Page content --> */}
            <div className="w3-content w3-padding w3-center" style={{width:"60%"}}>
                
                {/* <!-- Log in Section --> */}
                <div className="w3-container w3-margin-top" id="login">
                    <div className="w3-padding-32">
                        <h1 className="w3-border-bottom w3-border-teal w3-padding-64">Create New Account</h1>
                        <form action="/action_page.php" target="_blank" className="w3-padding-32">
                            
                            <input className="w3-input w3-section w3-border w3-round" type="text" placeholder="Name" required name="Name"/>
                            <input className="w3-input w3-section w3-border w3-round" type="text" placeholder="Email" required name="Email"/>
                            <input className="w3-input w3-section w3-border w3-round" type="text" placeholder="Password" required name="Password"/>
                            <input className="w3-input w3-section w3-border w3-round" type="text" placeholder="Confirm Password" required name="Password"/>
                            <div className="w3-center w3-padding-large">
                                <Link to='/login' className="w3-button w3-teal w3-round-large w3-margin-top">CREATE A NEW ACCOUNT</Link>
                                <Link to='/login' className="w3-button w3-light-grey w3-round-large w3-margin-top">LOG IN</Link>
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