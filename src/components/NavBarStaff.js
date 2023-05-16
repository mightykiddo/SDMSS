import React from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

const NavBarStaff = () => {
     const location = useLocation();
    const history = useNavigate();
    var id = location.state.id;

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
            history("/")
        })
    }
    return (
    <>
    
        <nav>
        
            <div className='menuitem'>

                    <Link to='/stafffoodanddrink'>Food & Drink</Link>
                    <Link to='/staffbookticket'>Book Ticket</Link>     
                    <Link to='/staffsetloyaltystatus'>Update Loyalty Status</Link>
                    <Link to='/staffsetorderstatus'>Update Order Status</Link>
        
            </div>
            <div className='menuitem_login'>

                    <a onClick={logout}>Logout</a>
        
            </div>

        </nav>
    </>
    )
}

export default NavBarStaff
