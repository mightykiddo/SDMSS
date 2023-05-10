import NavBarStaff from './NavBarStaff';
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const StaffSetLoyaltyStatus = () => {
    
    const [searched, setsearched] = useState(0);
    const [LoyaltyTransaction, setLoyaltyTransaction] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [id2, setId] = useState(0);
    const [item, setitem] = useState('');
    const location = useLocation();
    const history = useNavigate();

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
        const status ="Completed"
        fetch(`http://localhost:8003/loyaltytransaction/${id2}`) 
        .then(res=>{
            return res.json();
         })
        .then(data => {
            // console.log(data)
            // console.log(data.item)
            // setitem(data.item)
            console.log(data)

            fetch(`http://localhost:8003/loyaltytransaction/${id2}`,
            {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({...data, itemstatus : status})
            }) 

            console.log("update successfully")
            console.log("refresh page")
            history(0)   

        });  
    }

    return ( 
        <>
        <NavBarStaff />
        
        <div>
            <h1>Update Loyalty Status</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td><label>Search Transaction History using id:</label></td>
                        <td><input type="text" value={searched} onChange={(e) => setsearched(e.target.value)}></input><button>Search</button></td>
                        
                    </tr>          
                </table>
            </form>
            
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
                        <td>{record.customerid}</td>
                        <td>{record.item}</td>
                        <td>{record.itemstatus}</td>
                        <td><button value={record.id} onClick={(e)=> setId(e.target.value)}>Submit</button></td>
                    </tr>
                    ))}         
                </table>
            </form>
        </div>
        </>
     );
}
 
export default StaffSetLoyaltyStatus;