import React from 'react';

import { Link } from 'react-router-dom';

const NavBarStaff = () => {
    return (
    <>
    
        <nav>
        
            <div className='menuitem'>

                    <Link to='/staff'>Pet Heaven</Link>   
                    
        
            </div>
            <div className='menuitem_login'>

                    <Link to='/'>Logout</Link>
        
            </div>

        </nav>
    </>
    )
}

export default NavBarStaff
