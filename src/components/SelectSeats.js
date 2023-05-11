import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SelectSeats = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/seats")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSeats(data);
      });
  }, []);

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

  const handleSubmit = (e) => {
    console.log(e.target.value);
    console.log("Selected seats:", selectedSeats);
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
        style={{ ...style, width: "20px", height: "20px" }}
        onClick={() => handleSeatClick(seat)}
      >
        {seat.occupy === "no" && !seat.selected ? seat.seat : ""}
      </div>
    );
  };
  const filterSeats = (seatIds) => {
    return seats.filter((seat) => seatIds.includes(seat.id));
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
    <div>
      <p>-Screen-</p>
      <div>
        <table>
          <tbody>
            {renderRow(firstRowSeats)}
            {renderRow(secondRowSeats)}
            {renderRow(thirdRowSeats)}
          </tbody>
        </table>
      </div>
      <div>
        <p>Selected seats: {selectedSeats.join(", ")}</p>
        {/* <Link to={{ pathname: "/", query: { seats: selectedSeats } }}> */}
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleSubmit}>Submit</button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default SelectSeats;
