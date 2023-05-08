import { useState, useEffect } from "react";
import NavBarUser from "./NavBarUser";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const BookTicket = () => {

    const [date, setDate] = useState("");
    const [selectedTimeslot, setSelectedTimeslot] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedMovie, setSelectedMovie] = useState("");
    const [data, setData] = useState([]);

    const location = useLocation();
    const history = useNavigate();
    const username = location.state.username;
    var loyaltypoint = location.state.loyaltypoint;
    var seatpref = location.state.seatpref;
    var id = location.state.id;

    useEffect(() => {
        fetch('http://localhost:8006/moviesession')
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setData(data);
        })
    }, []); 

    // const data = [
    //     { id: 1, date: '0105', movie: 'Movie 1', timeslot: '1000' },
    //     { id: 2, date: '0105', movie: 'Movie 1', timeslot: '1100' },
    //     { id: 3, date: '0105', movie: 'Movie 2', timeslot: '1000' },
    //     { id: 4, date: '0105', movie: 'Movie 3', timeslot: '1100' },
    //     { id: 5, date: '0105', movie: 'Movie 1', timeslot: '1300' },
    //     { id: 6, date: '0105', movie: 'Movie 2', timeslot: '1100' },
    //     { id: 7, date: '0205', movie: 'Movie 2', timeslot: '1200' },
    //     { id: 8, date: '0205', movie: 'Movie 3', timeslot: '1300' },
    //     { id: 9, date: '0305', movie: 'Movie 1', timeslot: '1400' },
    // ];
      
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

    const handleTimeslotClick = (e) => {
        const selectedRecord = data.find(record => record.id === parseInt(e.target.value));
        setSelectedTimeslot(selectedRecord.timeslot);
        setSelectedDate(selectedRecord.date);
        setSelectedMovie(selectedRecord.movie);
    }
  
    return ( 
        <>
        <NavBarUser/>

      <div>
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

        {selectedTimeslot !== "" && (
            <>
                <h3>Selected Date: {selectedDate}</h3>
                <h3>Selected Movie: {selectedMovie}</h3>
                <h3>Selected Time: {selectedTimeslot}</h3>
            </>
        )}

      </div>
      </>
    );
}
   
export default BookTicket;
