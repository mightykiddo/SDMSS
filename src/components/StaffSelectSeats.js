import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBarStaff from "./NavBarStaff";

const StaffSelectSeats = () => {
  const [data2, setData2] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [tickettype, setTickettype] = useState();
  const [ticketprice, setTicketprice] = useState("");
  const numberOfSelectedSeats = selectedSeats.length;
  const totalamount = numberOfSelectedSeats * ticketprice;

  const location = useLocation();
  const history = useNavigate();

  var selectedTimeslot = location.state.selectedTimeslot;
  var selectedDate = location.state.selectedDate;
  var selectedMovie = location.state.selectedMovie;
  var selectedId = location.state.selectedId;
  var selectedRoom = location.state.selectedRoom;

  // View Seats Entity Component
  const ViewSeatsEntity = async () => {
    return fetch("http://localhost:8009/moviesession")
  }

  // View Seats Controller Component
  useEffect(() => {
    ViewSeatsEntity()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData2(data);
        console.log("console 1");
        console.log(data);
      });

  }, []);

  const handleSomething = () => {
    console.log("console 2");
    console.log(data2);
    setSeats(data2.filter(filter => filter.id === selectedId).flatMap(session => session.seats));
    console.log("console 3");
    console.log(seats);
  };

  useEffect(() => {
    handleSomething();
  }, [data2]);

  
  // Purchase Ticket Entity Component
  const PurchaseTicketEntity = async (ordertransaction) => {
    return fetch('http://localhost:8007/ordertransaction',{
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(ordertransaction)
  })
  }

  const PurchaseTicketEntity2 = async (movieSessionId) => {
    return fetch(`http://localhost:8009/moviesession/${movieSessionId}`)
  }    

  const PurchaseTicketEntity3 = async (data, movieSessionId, updatedSeats) => {
    return fetch(`http://localhost:8009/moviesession/${movieSessionId}`, 
    {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({...data, seats: updatedSeats})
    })
  } 

  // Purchase Ticket Controller Component
  const handleSubmit = (e) => {
    console.log(e.target.value);
    console.log("Selected seats:", selectedSeats);
    const movieSessionId = selectedId;
    console.log(movieSessionId)
    var customerid = "staff";
    var quantity = numberOfSelectedSeats;
    var itemstatus = "Paid";
    var item = "Movie Ticket";
    var movie = selectedMovie;
    var detail = " [Date]: "+selectedDate+",  [Timeslot]: "+selectedTimeslot+",  [Movie]: "+selectedMovie+",  [Room]: "+selectedRoom+",  [Ticket Type]: "+tickettype+",  [Seats]: "+selectedSeats;
    console.log("Detail", detail);

    const ordertransaction = {item, itemstatus, quantity, totalamount, customerid, movie, detail};
    e.preventDefault();
    
    PurchaseTicketEntity(ordertransaction)
    .then(()=>{
        console.log("Order have been placed");
        
    })

    PurchaseTicketEntity2(movieSessionId)
    .then(res=>{
      return res.json();
    })
    .then(data => {

      console.log(data)
      const updatedSeats = data.seats.map(seat => {
        if (selectedSeats.includes(seat.seat)) {
          return { seat: seat.seat, occupy: "yes", id: seat.id };
        } else {
          return seat;
        }
      });

      PurchaseTicketEntity3(data, movieSessionId, updatedSeats)
      .then(response => {
        if (response.ok) {
          // handle successful update
          console.log("update successfully")
          history('/stafffoodanddrink'); 
        } else {
          throw new Error("Failed to update seats.");
        }
      })
      .catch(error => {
        // handle error
        console.log("something error")
      });

    })
    
  };


  const handleTicketChange = (e) => {
    const selectedTicketType = e.target.value;
    setTickettype(selectedTicketType);
    
    // Set the ticket price based on the selected ticket type
    switch(selectedTicketType) {
      case "adult":
        setTicketprice(12);
        break;
      case "child":
        setTicketprice(7);
        break;
      case "student":
        setTicketprice(7);
        break;
      case "senior":
        setTicketprice(9);
        break;
      default:
        setTicketprice(0);
        break;
    }
  }

  const handleReset = () => {
    setSelectedSeats([]);
    setSeats((seats) =>
      seats.map((s) => {
        if (s.selected) {
          return { ...s, selected: false };
        }
        return s;
      })
    );
  };

  const handleSeatClick = (seat) => {
    if (seat.occupy === "no") {
      setSeats((seats) =>
        seats.map((s) =>
          s.id === seat.id ? { ...s, selected: !s.selected } : s
        )
      );
      if (!seat.selected) {
        setSelectedSeats((selectedSeats) => [...selectedSeats, seat.seat]);
      } else {
        setSelectedSeats((selectedSeats) =>
          selectedSeats.filter((selectedSeat) => selectedSeat !== seat.seat)
        );
      }
    }
  };
  
  const renderSeat = (seat) => {
    let style;
    if (seat.occupy === "yes") {
      style = { backgroundColor: "white" };
    } else if (seat.selected) {
      style = { backgroundColor: "cyan" };
    } else {
      style = { backgroundColor: "grey" };
    }
    return (
      <div
        key={seat.id}
        style={{ ...style, width: "50px", height: "40px" }}
        onClick={() => handleSeatClick(seat)}
      >
        {seat.occupy === "no" && !seat.selected ? seat.seat : ""}
      </div>
    );
  };
  
  const renderRow = (rowSeats) => {
    return (
      <tr>
        {rowSeats.map((seat) => (
          <td key={seat.id}>{renderSeat(seat)}</td>
        ))}
      </tr>
    );
  };

  const firstRowSeats = seats.filter((seat) => [1, 2, 3].includes(seat.id));
  const secondRowSeats = seats.filter((seat) => [4, 5, 6].includes(seat.id));
  const thirdRowSeats = seats.filter((seat) => [7, 8, 9].includes(seat.id));

  return (
    <>
    <NavBarStaff/>

    <div className='w3-border-top w3-border-dark-grey' ></div>

    <div className="w3-padding-32">
      <div className="w3-row-padding w3-padding-16">

        <div className="w3-half w3-padding-16">
          <p>Movie: <span className="w3-text-amber">{selectedMovie}</span></p>
          <p>Date: <span className="w3-text-amber">{selectedDate}</span></p>
          <p>Timeslot: <span className="w3-text-amber">{selectedTimeslot}</span></p>
        </div>

        <div className="w3-half w3-padding-16">
          <p>Select Ticket Type:</p>
          <select className="w3-section w3-border w3-round w3-dark-grey" value={tickettype} onChange={handleTicketChange}>
          <option value="">Ticket Type</option>
          <option value="adult">Adult</option>
          <option value="child">Child</option>
          <option value="student">Student</option>
          <option value="senior">Senior</option>
          </select>

          {ticketprice && <p>Price: ${ticketprice.toFixed(2)}</p>}
        </div>

      </div>
      
      <div className='w3-padding-16 w3-border-top w3-border-dark-grey' ></div>

      <div className="w3-row-padding w3-padding-16">

        <div className="w3-half w3-padding-16">
          <img src={require("../pics/seatinfo.jpg")} alt="seatinfo" className="w3-round" style={{width:"300px", height:"30px"}}/>
          
          <div className="w3-row-padding w3-padding-32">
            <p>-----Screen-----</p>
            <table>
              <tbody>
                {renderRow(firstRowSeats)}
                {renderRow(secondRowSeats)}
                {renderRow(thirdRowSeats)}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w3-half w3-padding-16">
          <p>Selected seats: {selectedSeats.join(", ")}</p>
          <p>Number Of Selected Seats: {numberOfSelectedSeats}</p>
          <p>Total: ${totalamount.toFixed(2)}</p>

          <div>
            <button className="w3-button w3-dark-grey w3-round-large w3-margin-right" onClick={handleReset}>Reset</button>
            <button className="w3-button w3-dark-grey w3-round-large" onClick={handleSubmit}>Place Order</button>
          </div>
        </div>

      </div>

    </div>

    </>
  );
      
};

export default StaffSelectSeats;
