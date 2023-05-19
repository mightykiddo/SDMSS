import React from 'react';

import NavBar from './NavBar';

import { Link } from 'react-router-dom';

import { useState, useEffect } from "react";

const Home = () => {

    const [movie, setMovie] = useState([]);

    // Movie Entity Component
    const MovieEntity = async () => {
        return fetch('http://localhost:8008/Movie')
    }

    // Movie Controller Component
    useEffect(() => {
        MovieEntity()
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setMovie(data);
        })
    }, []); 

    return (
        <>
        
        <NavBar />
        
        <div className="w3-padding">

            <div className=" " id="pets">
                
                <div className='w3-border-top w3-border-dark-grey' ></div>

                <div className="w3-row w3-padding-32">    
                    
                    <div className="w3-third w3-padding-16">
                        <div className="w3-padding-top-64">
                        <div className="w3-padding-top-64">
                        <div className="w3-padding-top-64">
                            <div className="w3-row-padding w3-padding-16">
                                    <div className="w3-half w3-padding-16">
                                        <h3 className="">Join us today</h3>
                                        <h3 className="">to earn</h3>
                                        <h3 className="w3-text-amber">Loyalty Points</h3>
                                    </div>
                                    <div className="w3-half w3-padding-top-64">
                                        <Link to='/createaccount' className="w3-button w3-deep-orange w3-round-medium">Sign Up</Link>
                                    </div>
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>

                    <div className="w3-twothird w3-padding-16">
                        
                        <div className="w3-row-padding w3-padding-16">
                            <h3 class="w3-border-bottom w3-border-light-grey" style={{maxWidth:"170px"}}>Now Showing</h3>
                    
                            <div className="w3-col l4 m8 w3-margin-bottom w3-padding-16">
                                <img src={require("../pics/captainmarvel.jpg")} alt="captainmarvel" className="" style={{width:"100%"}}/>

                                {movie.filter(filter => filter.id === 1).map((record) => (
                                    <div className='w3-dark-grey w3-padding' style={{minHeight:"400px"}}>
                                        <h3>{record.Movie}</h3>
                                        <p className="w3-opacity w3-small">{record.Duration}&emsp;({record.AgeRating})</p>
                                        <p className="w3-opacity w3-large">{record.Synopsis}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="w3-col l4 m8 w3-margin-bottom w3-padding-16">
                                <img src={require("../pics/avengers.jpg")} alt="avengers" className="" style={{width:"100%"}}/>

                                {movie.filter(filter => filter.id === 2).map((record) => (
                                    <div className='w3-dark-grey w3-padding' style={{minHeight:"400px"}}>
                                        <h3>{record.Movie}</h3>
                                        <p className="w3-opacity w3-small">{record.Duration}&emsp;({record.AgeRating})</p>
                                        <p className="w3-opacity w3-large">{record.Synopsis}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="w3-col l4 m8 w3-margin-bottom w3-padding-16">
                                <img src={require("../pics/blackpanther.jpg")} alt="blackpanther" className="" style={{width:"100%"}}/>
                                
                                {movie.filter(filter => filter.id === 3).map((record) => (
                                    <div className='w3-dark-grey w3-padding' style={{minHeight:"400px"}}>
                                        <h3>{record.Movie}</h3>
                                        <p className="w3-opacity w3-small">{record.Duration}&emsp;({record.AgeRating})</p>
                                        <p className="w3-opacity w3-large">{record.Synopsis}</p>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>

                </div>
                
            </div>

            <div className=" " id="pets">
                
                <div className='w3-border-top w3-border-dark-grey' ></div>

                <div className="w3-container w3-padding-32" id="reviews">
                    <h3 class="w3-padding-16 w3-xxlarge">What our customer are saying about us</h3>

                    <div className="w3-panel w3-leftbar w3-dark-grey w3-round">
                        <p><i>"I love going to this cinema! The seats are comfortable, the screens are huge, and the sound quality is amazing. The staff are always friendly and helpful too. 👍"</i></p>
                        <p>Albert Tan</p>
                    </div>

                    <div className="w3-panel w3-leftbar w3-dark-grey w3-round">
                        <p><i>"I really enjoyed my experience at this cinema. The staff were friendly, the seats were comfortable, and the movie was amazing. I'll definitely be coming back here again!"</i></p>
                        <p>Shimei He</p>
                    </div>

                    <div className="w3-panel w3-leftbar w3-dark-grey w3-round">
                        <p><i>"I've been to a lot of cinemas, but this one is definitely my favorite. The seats are so comfortable, and the sound quality is amazing. I always have a great time here. :) "</i></p>
                        <p>Jonathan Lai</p>
                    </div>
                </div>
                
            </div>

            {/* <!-- location/map --> */}
            <div className="w3-container w3-padding-32" id="location">
                <h1 className="w3-border-bottom w3-border-dark-grey w3-padding-16">Come visit us at Jurong East.</h1>
                
                <div className='w3-center w3-padding-32'>
                    <h4 className="w3-padding-16">21 Jurong East 3, #34, Singapore 123456 </h4>
                    <img src={require("../pics/location.PNG")} alt="location" className="w3-round" style={{width:"900px", height:"500px"}}/>
                </div>
                

            </div>

        </div>


        
        </>
    )
}

export default Home