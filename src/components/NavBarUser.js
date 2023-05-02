import React from 'react';

import { Link } from 'react-router-dom';

const NavBarUser = () => {
    return (
    <>
    
        <nav>
        
            <div className='menuitem'>

                    <Link to='/user'>ABC Cinema</Link>   
                    
        
            </div>
            <div className='menuitem_login'>
                    <Link to='/loyaltytransaction'>Transaction History</Link>
                    <Link to='/reviewrating'>Review & Rating</Link>
                    <Link to='/loyaltypage'>Loyalty Point</Link>
                    <Link to='/'>Logout</Link>
        
            </div>

        </nav>
    </>
    )
}

export default NavBarUser
