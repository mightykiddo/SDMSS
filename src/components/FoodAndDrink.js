import { useState, useEffect } from "react";
import NavBarUser from './NavBarUser';

const FoodAndDrink = () => {
    const [foodanddrink, setfoodanddrink] = useState([]);
    const [quantity, setquantity] = useState();
    const [item, setItem]= useState();
    const [itemstatus, setitemstatus] = useState("Unclaimed");
    const [isPending, setIsPending] = useState(false);

    useEffect(()=>{
        fetch('http://localhost:9000/foodanddrink')
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setfoodanddrink(data);
        });
    },[]);

    const handleSubmit = (e) => {
        const loyaltytransaction = {item, itemstatus, quantity};
        //e.preventDefault();
        setIsPending(true);
        
        fetch('http://localhost:8003/loyaltytransaction',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loyaltytransaction)
        }).then(()=>{
            console.log("Order have been placed");
        })
    }

    return ( 
        <>
        
        <NavBarUser />

        <div>
            <h1>Food And Drink Purchase Section</h1>
            <p>Select list of items to purchase:</p>
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        
                        <th>Item name</th>
                        <th>Item Description:</th>
                        <th>Price</th>
                    </tr>
                    {foodanddrink.map(record =>(
                        <tr id={record.key}>
                            <td>{record.itemname}</td>
                            <td>{record.itemdesc}</td>
                            <td>${record.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </table>
                <label>Choose a combo:</label>
                <select value={item} onChange={(e)=> setItem(e.target.value)}>
                    {foodanddrink.map(current =>(
                        <option value={current.itemname}>{current.itemname}</option>
                    ))}
                </select>
                <label>Item Quantity: </label>
                <select value={quantity} onChange={(e)=>setquantity(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <p>Total: $</p>
                { !isPending && <button className="w3-button w3-light-grey w3-round-large w3-margin" >Place Order</button>}
                { isPending && <button disabled className="w3-button w3-light-grey w3-round-large w3-margin-top">Submitting release form...</button>}
                
            </form>
        </div>
        
        </>
        
     );
}
 
export default FoodAndDrink;