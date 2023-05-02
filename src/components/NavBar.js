import React from 'react';

import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
    <>
    
        <nav>
        
            <div className='menuitem'>

                    <Link to='/'>ABC Cinema</Link>   
        
            </div>
            <div className='menuitem_login'>
                    
                    <Link to='/login'>Sign In</Link>
        
            </div>

        </nav>
    </>
    )
}

export default NavBar
