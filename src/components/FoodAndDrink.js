import { useState, useEffect } from "react";
<<<<<<< Updated upstream
=======
import NavBarUser from './NavBarUser';
import { useLocation, useNavigate } from 'react-router-dom';

>>>>>>> Stashed changes
const FoodAndDrink = () => {
    const history = useNavigate();
    const [foodanddrink, setfoodanddrink] = useState([]);
    const [check, setCheck] = useState(false);
    const [quantity, setquantity] = useState();
<<<<<<< Updated upstream
=======
    const [item, setItem]= useState();
    const [itemstatus, setitemstatus] = useState("Unclaimed");
    const [isPending, setIsPending] = useState(false);
    const location = useLocation();
    const username = location.state.username;
    var loyaltypoint = location.state.loyaltypoint;
    var seatpref = location.state.seatpref;
    var id = location.state.id;

>>>>>>> Stashed changes
    useEffect(()=>{
        fetch('http://localhost:9000/foodanddrink')
        .then(res =>{
            return res.json();
        })
        .then(data => {
            console.log(data);
            setfoodanddrink(data);
            console.log(data);
        });
    },[]);
<<<<<<< Updated upstream
    const handleChange = (e) =>{
        setCheck(e.target.checked);
    }
=======

    const handleSubmit = (e) => {
        var customerid = id;
        const loyaltytransaction = {item, itemstatus, quantity, customerid};
        e.preventDefault();
        setIsPending(true);
        
        fetch('http://localhost:8003/loyaltytransaction',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loyaltytransaction)
        }).then(()=>{
            console.log("Order have been placed");
            history('/user', {state:{username, loyaltypoint, seatpref, id}});
        })
    }
    

>>>>>>> Stashed changes
    return ( 
        <div>
            <h3>{username}food and drink</h3>
            <h1>Food And Drink Purchase Section</h1>
            <p>Select list of items to purchase:</p>
            <form>
                <table>
                    <tr>
                        <th>Tick to buy</th>
                        <th>Item name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    {foodanddrink.map(record =>(
                        <tr id={record.key}>
                            <td><input type="checkbox" onChange={handleChange}></input></td>
                            <td>{record.itemname}</td>
                            <td>${record.price.toFixed(2)}</td>
                            <td>
                            <select
                                value={quantity}
                                onChange={(e) =>setquantity(e.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </td>
                        </tr>
                    ))}
                    
                </table>
                <p>Total: $</p>
                <button>Confirm Order</button>
            </form>
        </div>
     );
}
 
export default FoodAndDrink;