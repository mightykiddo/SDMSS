import NavBarStaff from './NavBarStaff';
import React, { useEffect, useState } from 'react';
import AdoptList from './AdoptList';
import ReleaseList from './ReleaseList';
import { useLocation } from 'react-router-dom';
import TestWater from './TestWater';
import BookTicket from './BookTicket';
import ViewSession from './viewSession';


const Staff = () => {
    const [adopt,setAdopt] = useState(null);
    const [release,setRelease] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    
    useEffect(()=> {
        setTimeout(() => {
            fetch('http://localhost:8000/adopt')
            .then(res => {
                //console.log(res);
                if(!res.ok) {
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setAdopt(data);
                setIsPending(false);
                setError(null);
                console.log(location.state.username);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
        }, 1000);
    }, []);

    useEffect(()=> {
        setTimeout(() => {
            fetch('http://localhost:8001/release')
            .then(res => {
                //console.log(res);
                if(!res.ok) {
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setRelease(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
        }, 1000);
    }, []);

    return (
        <>
        
        <NavBarStaff />

        <ViewSession/>

        { error && <div> {error} </div> }
        {isPending && <div>Loading...</div>}

        <div className="w3-container w3-padding-8">

            <div className="w3-row">    

                <div className="w3-half w3-padding-large">
                    <h3 className="w3-padding-32 w3-xxxlarge w3-border-bottom w3-border-light-grey">Adopt List</h3>
                    <div className='w3-padding-16'>
                    {adopt && <AdoptList adopt={adopt} title=" " />}
                    </div>
                    
                </div>

                <div className="w3-half w3-padding-large">
                    <h3 className="w3-padding-32 w3-xxxlarge w3-border-bottom w3-border-light-grey">Release List</h3>
                    <div className='w3-padding-16'>
                    {release && <ReleaseList release={release} title=" " />}
                    </div>
                    
                </div>

            </div>

        </div>

        </>
    )
}

export default Staff