import { useState, useEffect } from "react";
import NavBarUser from "./NavBarUser";
import { useLocation, useNavigate } from "react-router-dom";

const LoyaltyPage = () => {
  const history = useNavigate();
  const [loyaltyitem, setLoyaltyItem] = useState([]);
  const [item, setItem] = useState("");
  const [points, setPoints] = useState("");
  const [itemstatus, setitemstatus] = useState("Unclaimed");
  const [quantity, setquantity] = useState(" ");
  const [isPending, setIsPending] = useState(false);
  const location = useLocation();
  const username = location.state.username;
  var loyaltypoint = location.state.loyaltypoint;
  var seatpref = location.state.seatpref;
  var id = location.state.id;

  useEffect(() => {
    fetch("http://localhost:8004/loyaltyitems")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoyaltyItem(data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loyaltypoint > points) {
      var customerid = id;
      const loyaltytransaction = { item, itemstatus, quantity, customerid };

      setIsPending(true);

      fetch("http://localhost:8003/loyaltytransaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loyaltytransaction),
      }).then(() => {
        console.log("Item is redeemed");
        history("/user", { state: { username, loyaltypoint, seatpref, id } });
      });
    } else if (loyaltypoint < points) {
      console.log("not enough loyalty point!!");
    }
  };

  return (
    <>
      <NavBarUser />

      <div className="loyalty-page">
        <h1>List of Loyalty Redemption Items</h1>
        <p>Customer points: {loyaltypoint}</p>
        <table>
          <tr>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Points required</th>
            <th>Image</th>
          </tr>
          {loyaltyitem.map((record) => (
            <tr id={record.key}>
              <td>{record.itemid}</td>
              <td>{record.itemname}</td>
              <td>{record.points}</td>
              <td>
                <img src={record.imagesrc}></img>
              </td>
            </tr>
          ))}
        </table>

        <h2>Loyalty Point Redemption</h2>
        <form onSubmit={handleSubmit}>
          <h3>Select one item in the dropdown bar below to redeem:</h3>
          <label>Select item:</label>
          {/* <select 
                        value={item}
                        
                        onChange={(e) => setItem(e.target.value)}
                        >
                        {loyaltyitem.map( record =>(
                            <option value={record.itemname}>{record.itemname}</option>
                            ))}

                        
                    </select> */}

          <select
            value={item}
            onChange={(e) => {
              setItem(e.target.value);
              const selectedRecord = loyaltyitem.find(
                (record) => record.itemname === e.target.value
              );
              setPoints(selectedRecord.points);
            }}
          >
            {loyaltyitem.map((record) => (
              <option value={record.itemname}>
                {record.itemname}, {record.points}
              </option>
            ))}
          </select>

          <h3>{item}</h3>
          <h3>{points}</h3>
          <label className="w3-left w3-xlarge">Pet Health Status:</label>
          <select
            className="w3-input w3-section w3-border w3-round w3-dark-grey"
            value={itemstatus}
            onChange={(e) => setitemstatus(e.target.value)}
          >
            <option value="claimed">claimed</option>
            <option value="unclaimed">Unclaimed</option>
          </select>

          <label className="w3-left w3-xlarge">Quantity:</label>
          <select
            className="w3-input w3-section w3-border w3-round w3-dark-grey"
            value={quantity}
            onChange={(e) => setquantity(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          {!isPending && (
            <button className="w3-button w3-light-grey w3-round-large w3-margin">
              Redeem
            </button>
          )}
          {isPending && (
            <button
              disabled
              className="w3-button w3-light-grey w3-round-large w3-margin-top"
            >
              Submitting release form...
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default LoyaltyPage;
