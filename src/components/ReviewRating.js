import React from 'react';
import GetReviewRating from './GetReviewRating';
import NavBarUser from './NavBarUser';
import  Modal  from 'react-modal'
import { useState } from 'react';
import { BsHouse } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : '#4f4747'
    }
};

Modal.setAppElement('#root');

const ReviewRating = () => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(1);
    const [modalIsOpen3, setModalIsOpen3] = useState(false);
    const [modalIsOpen4, setModalIsOpen4] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const history = useNavigate();
    const location = useLocation();
    const username = location.state.username;
    var loyaltypoint = location.state.loyaltypoint;
    var seatpref = location.state.seatpref;
    var id = location.state.id;

    const handleSubmit2 = (e) =>{
        e.preventDefault();
        history('/user', {state:{username, loyaltypoint, seatpref, id}});
        setModalIsOpen4(false)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const review = { feedback, rating };
        setIsPending(true);

        fetch('http://localhost:8002/reviews',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(review)
        }).then(()=>{
            console.log("new review added");
            setIsPending(false);
            setModalIsOpen3(false);
            setModalIsOpen4(true);
            //history(-1);
            //history('/user');
            
        })
    }

    return (
        <>
        
        <NavBarUser />

        <div className='w3-row w3-margin'>
            <h3 class="w3-twothird w3-container w3-xxlarge w3-border-bottom w3-border-light-grey" style={{maxWidth:""}}>Review and Rating Section</h3>
            <div className='w3-third w3-container w3-cell w3-cell-middle '>
                <a className='w3-right w3-button w3-deep-orange w3-round-medium w3-margin' onClick={() => setModalIsOpen3(true)}> Submit Review & Feedback</a>
            </div>

        </div>
        
        
        <Modal
            isOpen={modalIsOpen3}
            onRequestClose={() => setModalIsOpen3(false)}
            style={customStyles} >
            
            <h1 className="w3-xxlarge">Submit Review and Rating <BsHouse /></h1>
            <p className='w3-center'>Your feedback is important to us!!! <br></br>Do let us know what can we improve further.</p>

            <form onSubmit={handleSubmit}>
                <label className="w3-left w3-xlarge" >Feedback:</label>
                <textarea
                    className="w3-input w3-section w3-border w3-round"
                    type="text" 
                    required
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    />
                <label className="w3-left w3-xlarge" >Rating:</label>
                <select 
                    className="w3-input w3-section w3-border w3-round"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <div className="Iwantaligncenter">
                    <button className='w3-button w3-light-grey w3-round-large w3-margin ' onClick={() => setModalIsOpen3(false)}>Close</button>
                    { !isPending && <button className="w3-button w3-light-grey w3-round-large w3-margin" >Submit</button>}
                    { isPending && <button disabled className="w3-button w3-light-grey w3-round-large w3-margin-top">Submitting release form...</button>}
                </div>
                
            </form>
            
        </Modal>
        <Modal
            isOpen={modalIsOpen4}
            onRequestClose={() => setModalIsOpen4(false)}
            style={customStyles} >

            <h1>Thank you for your feedback!</h1>
            <div className="Iwantaligncenter">
                <button className='w3-button w3-light-grey w3-round-large w3-margin-top' onClick={handleSubmit2}>Close</button>
            </div>
        </Modal>
        
        <GetReviewRating/>

        </>
    )
}

export default ReviewRating