import { useState, useEffect } from "react";
import NavBarUser from './NavBarUser';
import { useLocation, useNavigate } from 'react-router-dom';

const FoodAndDrink = () => {
    const history = useNavigate();
    const [foodanddrink, setfoodanddrink] = useState([]);
    const [quantity, setquantity] = useState();
    const [item, setItem]= useState();
    const [itemstatus, setitemstatus] = useState("Unpaid");
    const [isPending, setIsPending] = useState(false);
    const [price, setPrice] = useState();
    const location = useLocation();
    const username = location.state.username;
    var loyaltypoint = location.state.loyaltypoint;
    var seatpref = location.state.seatpref;
    var id = location.state.id;
    var totalamount = quantity * price;

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
        var customerid = id;
        const ordertransaction = {item, itemstatus, quantity, totalamount, customerid};
        e.preventDefault();
        setIsPending(true);
        
        fetch('http://localhost:8007/ordertransaction',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(ordertransaction)
        }).then(()=>{
            console.log("Order have been placed");
            history('/user', {state:{username, loyaltypoint, seatpref, id}});
        })
    }
    
    const tableStyles = {
        borderCollapse: 'collapse',
        width: '100%',
        backgroundColor: '#f9f9f9',
        color: '#444'
    }
    
    const tableHeaderStyles = {
        backgroundColor: '#333',
        color: '#fff',
        fontWeight: 'bold'
    }
    
    const tableDataStyles = {
        textAlign: 'left',
        padding: '8px'
    }

    const alternatingRowStyles = {
        backgroundColor: '#f2f2f2'
    }

    return ( 
        <>
        
        <NavBarUser />

        <div className='w3-border-top w3-border-dark-grey' ></div>

        <div style={{margin: '20px'}}>
            <h1>Food And Drink Purchase Section</h1>
            <p>Select a combo to purchase:</p>
            <form onSubmit={handleSubmit}>

                <table style={tableStyles}>
                    <thead>
                    <tr style={tableHeaderStyles}>
                        <th style={tableDataStyles}>Item name</th>
                        <th style={tableDataStyles}>Item Description:</th>
                        <th style={tableDataStyles}>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {foodanddrink.map((record, index) => (
                        <tr style={index % 2 === 0 ? null : alternatingRowStyles} key={record.key}>
                        <td style={tableDataStyles}>{record.itemname}</td>
                        <td style={tableDataStyles}>{record.itemdesc}</td>
                        <td style={tableDataStyles}>${record.price.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="w3-section">

                    <div className="w3-half w3-padding-small">
                        <p>Choose A Combo:</p>
                        <select className="w3-input w3-section w3-border w3-round w3-dark-grey" value={item} onChange={(e)=> {
                            setItem(e.target.value)
                            const selectedRecord = foodanddrink.find(record => record.itemname === e.target.value);
                            setPrice(selectedRecord.price.toFixed(2));
                        }}
                        >
                            <option value="">Choose A Combo</option>
                            {foodanddrink.map(current =>(
                                <option value={current.itemname}>{current.itemname}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="w3-half w3-padding-small">
                        <p>Select a Quantity:</p>
                        <select className="w3-input w3-section w3-border w3-round w3-dark-grey" value={quantity} onChange={(e)=>setquantity(e.target.value)}>
                            <option value="">Item Quantity</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    
                </div>

                <div className="w3-padding-small">
                    <p>Total: ${totalamount.toFixed(2)}</p>
                    { !isPending && <button className="w3-button w3-deep-orange w3-round-large" >Place Order</button>}
                    { isPending && <button disabled className="w3-button w3-deep-orange w3-round-large w3-margin-top">Submitting release form...</button>}
                </div>
                
                
            </form>
        </div>
        
        </>
        
     );
}
 
export default FoodAndDrink;