import React from 'react';
import { createSearchParams, Link } from 'react-router-dom';
import '../w3.css';
import NavBar from './NavBar';

const Login = () => {
<<<<<<< Updated upstream
=======

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [dbuser, setdbuser] = useState([]);
    const [modalIsOpen4, setModalIsOpen4] = useState(false);
    const history = useNavigate();
    var successaccess = false;
    var accounttype = " ";
    var loyaltypoint = " ";
    var seatpref = " ";
    var id = " ";

    useEffect(()=>{
        fetch('http://localhost:8005/user')
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setdbuser(data);
            console.log(data);
        });
    },[]);

    const handleSubmit2 = () =>{
        setModalIsOpen4(false)
    }

    const handleSubmit = (e) =>{
            e.preventDefault();
            dbuser.filter(record => record.username === username && record.password === password).map(filterrecord =>{

                successaccess = true
                console.log(filterrecord.name)
                console.log(filterrecord.acctype)
                console.log("Log In Successfully")
                accounttype = filterrecord.acctype
                loyaltypoint = filterrecord.loyaltypoint
                seatpref = filterrecord.seatpref
                id = filterrecord.id

                
            })

            if (successaccess) {

                if (accounttype === "customer"){

                    console.log("redirect to customer page");
                    history('/user', {state:{username, loyaltypoint, seatpref, id}});
                    //history({pathname: '/user', search: createSearchParams({id:username}).toString()});

                } else if (accounttype === "staff"){
                    console.log("redirect to staff page");
                    history('/staff', {state:{username}});
                    
                }
                
            } else {
                setModalIsOpen4(true);
            }
            
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
                        <h1 className="w3-border-bottom w3-border-teal w3-padding-64">Log in</h1>
                        <form action="/action_page.php" target="_blank" className="w3-padding-32">
                            <input className="w3-input w3-section w3-border w3-round" type="text" placeholder="Email" required name="Email"/>
                            <input className="w3-input w3-section w3-border w3-round" type="text" placeholder="Password" required name="Password"/>
                            <div className="w3-center w3-padding-large w3-padding-32">
                                <Link to='/staff' className="w3-button w3-light-grey w3-round-large w3-margin-top">STAFF</Link>
                                <Link to='/user' className="w3-button w3-teal w3-round-large w3-margin-top">LOG IN</Link>
                                <Link to='/createaccount' className="w3-button w3-light-grey w3-round-large w3-margin-top">CREATE A NEW ACCOUNT</Link>
                            </div>
                        </form>
                    </div>
                </div>


                {/* <!-- End page content --> */}
            </div>
        </>
    )
}

export default Login