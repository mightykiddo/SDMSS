import React from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';



const NavBarUser = () => {

    const location = useLocation();
    const history = useNavigate();
    const username = location.state.username;
    var loyaltypoint = location.state.loyaltypoint;
    var seatpref = location.state.seatpref;
    var id = location.state.id;

    const handleSubmit1 = () => {
        console.log("redirect to user page");
        history('/user', {state:{username, loyaltypoint, seatpref, id}});
    }

    const handleSubmit2 = () => {
        console.log("redirect to transaction page");
        history('/loyaltytransaction', {state:{username, loyaltypoint, seatpref, id}});
    }    

    const handleSubmit3 = () => {
        console.log("redirect to review rating page");
        history('/reviewrating', {state:{username, loyaltypoint, seatpref, id}});
    }

    const handleSubmit4 = () => {
        console.log("redirect to food and drink page");
        history('/loyaltypage', {state:{username, loyaltypoint, seatpref, id}});
    }
    
    const logout = () => {

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser)
        fetch( `http://localhost:8030/usersession/${currentUser}`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(()=>{
            localStorage.removeItem('currentUser');
            history('/')
        })
    }

    return (
    <>
    
        <nav>
            
            <div className='menuitem'>
            

                    {/* <Link to='/user'>ABC Cinema</Link>    */}

                    <a onClick={handleSubmit1} href="">ABC Cinema</a>
                    
                    
        
            </div>
            <div className='menuitem_login'>
                    
                    <a onClick={handleSubmit2} href="">Transaction History</a>
                    
                    <a onClick={handleSubmit3} href="">Review Rating</a>
                    
                    <a onClick={handleSubmit4} href="">Loyalty Point</a>
                    
                    <a onClick={logout}>Logout</a>

                    {/* <Link to='/loyaltytransaction' >Transaction History</Link>
                    <Link to='/reviewrating' >Review & Rating</Link>
                    <Link to='/loyaltypage'>Loyalty Point</Link>
                    <Link to='/'>Logout</Link> */}
        
            </div>

        </nav>
    </>
    )
}

export default NavBarUser
