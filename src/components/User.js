import React from 'react';
import NavBarUser from './NavBarUser';

const User = () => {
    return (
        <>
        
        <NavBarUser />
        
        <div className="w3-padding">

            <div className=" " id="pets">
                
                <div className='w3-border-top w3-border-dark-grey' ></div>

                <div class="w3-row w3-padding-32">    

                    
                    <div class="w3-third w3-padding-16">
                        <div class="w3-padding-top-64">
                        <div class="w3-padding-top-64">
                        <div class="w3-padding-top-64">
                            <div className="w3-row-padding w3-padding-16">
                                    <div class="w3-half w3-padding-16">
                                        <h3 class="">Join us today</h3>
                                        <h3 class="">to earn</h3>
                                        <h3 class="w3-text-amber">Loyalty Points</h3>
                                    </div>
                                    <div class="w3-half w3-padding-top-64">
                                        <a class="w3-button w3-deep-orange w3-round-medium" href="#">Sign Up</a>
                                    </div>
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>

                    <div class="w3-twothird w3-padding-16">
                        
                        <div className="w3-row-padding w3-padding-16">
                            <h3 class="w3-border-bottom w3-border-light-grey" style={{maxWidth:"170px"}}>Now Showing</h3>
                    
                            <div className="w3-col l4 m8 w3-margin-bottom w3-padding-16">
                                <img src={require("../pics/blacky.jpg")} alt="blacky" className="" style={{width:"100%"}}/>
                                <div className='w3-dark-grey w3-padding' style={{minHeight:"400px"}}>
                                    <h3>Blacky</h3>
                                    <p className="w3-opacity w3-large">The AZoom team makes the experience of car-renting relatively stress-free. They are an awesome group of people to work with - quick to respond, always ready to help, positive and open to suggestions for improvements. Keep up the good work!</p>
                                </div>
                            </div>
                            <div className="w3-col l4 m8 w3-margin-bottom w3-padding-16">
                                <img src={require("../pics/colin.jpg")} alt="colin" className="" style={{width:"100%"}}/>
                                <div className='w3-dark-grey w3-padding' style={{minHeight:"400px"}}>
                                    <h3>Blacky</h3>
                                    <p className="w3-opacity w3-large">The AZoom team makes the experience of car-renting relatively stress-free. They are an awesome group of people to work with - quick to respond, always ready to help, positive and open to suggestions for improvements. Keep up the good work!</p>
                                </div>
                                
                            </div>
                            <div className="w3-col l4 m8 w3-margin-bottom w3-padding-16">
                                <img src={require("../pics/goldy.jpg")} alt="goldy" className="" style={{width:"100%"}}/>
                                <div className='w3-dark-grey w3-padding' style={{minHeight:"400px"}}>
                                    <h3>Blacky</h3>
                                    <p className="w3-opacity w3-large">The AZoom team makes the experience of car-renting relatively stress-free. They are an awesome group of people to work with - quick to</p>
                                </div>
                                
                            </div>
                        </div>

                    </div>

                </div>
                
            </div>

            <div className=" " id="pets">
                
                <div className='w3-border-top w3-border-dark-grey' ></div>

                <div class="w3-container w3-padding-32" id="reviews">
                    <h3 class="w3-padding-16 w3-xxlarge">What our customer are saying about us</h3>

                    <div class="w3-panel w3-leftbar w3-dark-grey w3-round">
                        <p><i>"The AZoom team makes the experience of car-renting relatively stress-free. They are an awesome group of people to work with - quick to respond, always ready to help, positive and open to suggestions for improvements. Keep up the good work! 👍"</i></p>
                        <p>Albert Tan</p>
                    </div>

                    <div class="w3-panel w3-leftbar w3-dark-grey w3-round">
                        <p><i>"AZoom has a great and very responsive customer service team. It is an easy and hassle-free platform for me to rent an eletric car. No confusion and is clear-cut."</i></p>
                        <p>Shimei He</p>
                    </div>

                    <div class="w3-panel w3-leftbar w3-dark-grey w3-round">
                        <p><i>"Convenient way to rent an eletric car. Hassle free! :)"</i></p>
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

export default User