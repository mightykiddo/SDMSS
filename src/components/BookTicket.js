import { useState, useEffect } from "react";
import NavBarUser from "./NavBarUser";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const BookTicket = () => {

    const [date, setDate] = useState("");
    const [data, setData] = useState([]);

    const location = useLocation();
    const history = useNavigate();
    const username = location.state.username;
    var loyaltypoint = location.state.loyaltypoint;
    var seatpref = location.state.seatpref;
    var id = location.state.id;

    // Entity Component
    const BookTicketEntity = async () => {
        return fetch('http://localhost:8009/moviesession')
    }

    // Controller Component
    useEffect(() => {
        BookTicketEntity()
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setData(data);
        })
    }, []); 

    const handleTimeslotClick = (e) => {

        e.preventDefault();
        const selectedRecord = data.find(record => record.id === parseInt(e.target.value));
        var selectedTimeslot = selectedRecord.timeslot;
        var selectedDate = selectedRecord.date;
        var selectedMovie = selectedRecord.movie;
        var selectedId = selectedRecord.id;
        var selectedRoom = selectedRecord.room;
        history('/selectseats', {state:{username, loyaltypoint, seatpref, id, selectedDate, selectedId, selectedMovie, selectedTimeslot, selectedRoom}});
    }
      
    const groupedData = data.reduce((result, item) => {
        const key = item.movie;
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
        return result;
    }, {});

    const groupedData2 = data.reduce((result, item) => {
        const key = item.date;
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
        return result;
    }, {});
  
    return ( 
        <>
        <NavBarUser/>

        <div className='w3-border-top w3-border-dark-grey' ></div>

        <div className='w3-padding-32'> 
            <h3>Booking Ticket</h3>

            <select 
                value={date}
                onChange={(e) => setDate(e.target.value)}
            >
                <option value="">Select a date</option>
                {(Object.keys(groupedData2)).map(record => (
                    <option key={record} value={record}>{record}</option>
                ))}
            </select>

            {Object.keys(groupedData).map((key) => (
                <div key={key}>
                    <h2>{key}</h2>
                    <ul>
                        {groupedData[key].filter(record => record.date === date).map((item) => (
                            <li key={item.id}>
                                <button 
                                    value={item.id} 
                                    onClick={handleTimeslotClick}
                                >
                                    Time Slot: {item.timeslot}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

        </div>
        </>
    );
}
   
export default BookTicket;
