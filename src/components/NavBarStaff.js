import React from 'react';

import { Link } from 'react-router-dom';

const NavBarStaff = () => {
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

                    <Link to='/'>Logout</Link>
        
            </div>

        </nav>
    </>
    )
}

export default NavBarStaff
