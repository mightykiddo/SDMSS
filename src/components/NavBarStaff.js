import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

const NavBarStaff = () => {

    const history = useNavigate();

    // User Session Entity Component
    const UserSessionEntity = async (currentUser) => {
        return fetch( `http://localhost:8030/usersession/${currentUser}`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
        })
    }

    // User Session Controller Component
    const logout = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser)
        UserSessionEntity(currentUser)
        .then(()=>{
            localStorage.removeItem('currentUser');
            history('/')
        })
    }

    const handleSubmit1 = () => {
        console.log("redirect to staff food and drink page");
        history('/stafffoodanddrink');
    }

    const handleSubmit2 = () => {
        console.log("redirect to staff book ticket page");
        history('/staffbookticket');
    }

    const handleSubmit3 = () => {
        console.log("redirect to staff update loyalty status page");
        history('/staffsetloyaltystatus');
    }

    const handleSubmit4 = () => {
        console.log("redirect to staff update order status page");
        history('/staffsetorderstatus');
    }

    return (
    <>
    
        <nav>
        
            <div className='menuitem'>

                    <a onClick={handleSubmit1} href="">Food & Drink</a>
                    <a onClick={handleSubmit2} href="">Book Ticket</a>
                    <a onClick={handleSubmit3} href="">Update Loyalty Status</a>  
                    <a onClick={handleSubmit4} href="">Update Order Status</a> 
        
            </div>
            <div className='menuitem_login'>

                    <a onClick={logout}>Logout</a>
        
            </div>

        </nav>
    </>
    )
}

export default NavBarStaff
