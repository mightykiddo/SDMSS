import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const StaffSetLoyaltyTransaction = () => {
    
    const [searched, setsearched] = useState(0);
    const [LoyaltyTransaction, setLoyaltyTransaction] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [id2, setId] = useState(0);
    const [item, setitem] = useState('');
    const location = useLocation();
    const history = useNavigate();
    const username = location.state.username;
    var loyaltypoint = location.state.loyaltypoint;
    var seatpref = location.state.seatpref;
    var id = location.state.id;
    const handleSumit3 = () => {
        history('/user', {state:{username, loyaltypoint, seatpref, id}})
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        fetch('http://localhost:8003/loyaltytransaction')
         .then(res =>{
             return res.json();
         })
         .then(data => {
             console.log(data);
             setLoyaltyTransaction(data);
         });     
             console.log(searched)
             setIsPending(true);
                // console.log(xtype(parseInt(searched)));
     }
    const handleSubmit2 = (e) => {
        e.preventDefault()
        console.log(id2);
        fetch(`http://localhost:8003/loyaltytransaction/${id2}`) 
        .then(res=>{
            return res.json();
         })
         .then(data => {
            console.log(data)
            console.log(data.item)
            setitem(data.item)
         }); 
    }
    useEffect(()=>{
            console.log(item);    
            const itemstatus ="Completed"
            const input = {item, itemstatus}
            fetch(`http://localhost:8003/loyaltytransaction/${id2}`,
            {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(input)
            }) 
            
    },[item])

    return ( 
        <div>
                <h1>Below Table is to update Status of Loyalty Points</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tr>
                            <td><label>Search Transaction History using id:</label></td>
                            <td><input type="text" value={searched} onChange={(e) => setsearched(e.target.value)}></input><button>Submit</button></td>
                            
                        </tr>          
                    </table>
                </form>
                <button onClick={handleSumit3}>Refresh</button>
                <form onSubmit={handleSubmit2}>
                    <table>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Customer ID</th>
                            <th>Item Name</th>
                            <th>Item Status</th>
                            <th>Submit to confirm claim</th>
                        </tr>
                        {isPending && LoyaltyTransaction.filter(records => records.id === parseInt(searched)).map(record =>(
                        <tr id={record.key}>
                            <td>{record.id}</td>
                            <td>Customer ID</td>
                            <td>{record.item}</td>
                            <td>{record.itemstatus}</td>
                            <td><button value={record.id} onClick={(e)=> setId(e.target.value)}>Submit</button></td>
                        </tr>
                        ))}         
                    </table>
                </form>
            </div>
     );
}
 
export default StaffSetLoyaltyTransaction;