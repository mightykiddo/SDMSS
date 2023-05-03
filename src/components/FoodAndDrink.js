import { useState, useEffect } from "react";
const FoodAndDrink = () => {
    const [foodanddrink, setfoodanddrink] = useState([]);
    const [check, setCheck] = useState(false);
    const [quantity, setquantity] = useState();
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
    const handleChange = (e) =>{
        setCheck(e.target.checked);
    }
    return ( 
        <div>
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