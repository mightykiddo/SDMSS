import React from 'react';
import './App.css';
import { GlobalStore } from './components/GlobalStore';
import {BrowserRouter as Router,  Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import User from './components/User';
import Staff from './components/Staff';
import ReviewRating from './components/ReviewRating';
import LoyaltyPage from './components/LoyaltyPage';
import LoyaltyTransaction from './components/LoyaltyTransaction';
import FoodAndDrink from './components/FoodAndDrink';


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

                    <Route path='/staff' element={ <Staff /> }></Route>

                    <Route path='/foodanddrink' element={ <FoodAndDrink /> }></Route>
                    
                </Routes>
              
            </GlobalStore>
          </div>
          </Router>
        </>
      )
    
}



export default App
