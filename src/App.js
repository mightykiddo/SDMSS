import React from 'react';
import './App.css';
import { GlobalStore } from './components/GlobalStore';
import {BrowserRouter as Router,  Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import User from './components/User';
import ReviewRating from './components/ReviewRating';
import LoyaltyPage from './components/LoyaltyPage';
import LoyaltyTransaction from './components/LoyaltyTransaction';
import FoodAndDrink from './components/FoodAndDrink';
import BookTicket from './components/BookTicket';
import StaffSetLoyaltyStatus from './components/StaffSetLoyaltyStatus';
import StaffFoodandDrink from './components/StaffFoodandDrink';
import StaffSetOrderStatus from './components/StaffSetOrderStatus';
import SelectSeats from './components/SelectSeats';
import StaffBookTicket from './components/StaffBookTicket';
import StaffSelectSeats from './components/StaffSelectSeats';
import SystemAdmin from './SystemAdmin/SystemAdminMain';
import ManagerMain from './Manager/ManagerMain'


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
                    
                    <Route path='/selectseats' element={ <SelectSeats/> }></Route>

                    <Route path='/staffbookticket' element={ <StaffBookTicket/> }></Route>

                    <Route path='/staffselectseats' element={ <StaffSelectSeats/> }></Route>

                    <Route path="/Admin" element={<SystemAdmin/>} />
                    
                    <Route path="/Manager" element={<ManagerMain />} />

                </Routes>
              
            </GlobalStore>
          </div>
          </Router>
        </>
      )
    
}



export default App
