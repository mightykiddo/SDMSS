import React from 'react';
import './App.css';
import { GlobalStore } from './components/GlobalStore';
import {BrowserRouter as Router,  Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import User from './components/User';
import Staff from './components/StaffFoodandDrink';
import ReviewRating from './components/ReviewRating';
import LoyaltyPage from './components/LoyaltyPage';
import LoyaltyTransaction from './components/LoyaltyTransaction';
import FoodAndDrink from './components/FoodAndDrink';
import BookTicket from './components/BookTicket';
import StaffSetLoyaltyStatus from './components/StaffSetLoyaltyStatus';
import StaffFoodandDrink from './components/StaffFoodandDrink';
import StaffSetOrderStatus from './components/StaffSetOrderStatus';


const App = () => {

    return (
        <>

        <Router>
      
          <div   className='container'>

            <GlobalStore>
              
                <Routes>
                    <Route path='/' exact element={ <Home /> }></Route>

                    <Route path='/login' element={ <Login /> }></Route>

                    <Route path='/createaccount' element={ <CreateAccount /> }></Route>

                    <Route path='/user' element={ <User /> }></Route>

                    <Route path='/loyaltypage' element={ <LoyaltyPage /> }></Route>

                    <Route path='/reviewrating' element={ <ReviewRating /> }></Route>

                    <Route path='/loyaltytransaction' element={ <LoyaltyTransaction /> }></Route>

                    <Route path='/stafffoodanddrink' element={ <StaffFoodandDrink/> }></Route>

                    <Route path='/foodanddrink' element={ <FoodAndDrink /> }></Route>

                    <Route path='/bookticket' element={ <BookTicket/> }></Route>

                    <Route path='/staffsetloyaltystatus' element={ <StaffSetLoyaltyStatus/> }></Route>

                    <Route path='/staffsetorderstatus' element={ <StaffSetOrderStatus/> }></Route>
                    
                </Routes>
              
            </GlobalStore>
          </div>
          </Router>
        </>
      )
    
}



export default App
