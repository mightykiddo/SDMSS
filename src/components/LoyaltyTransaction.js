import { useState, useEffect } from "react";
import NavBarUser from "./NavBarUser";
import { useLocation, useNavigate } from 'react-router-dom';
import StaffSetLoyaltyTransaction from "./StaffSetLoyaltyTransaction";


const LoyaltyTransaction = () => {
    const [loyaltytransaction, setLoyaltyTransaction] = useState([]);
    const location = useLocation();
    var id = location.state.id;

    useEffect(()=>{
         fetch('http://localhost:8003/loyaltytransaction')
         .then(res =>{
             return res.json();
         })
         .then(data => {
             console.log(data);
             setLoyaltyTransaction(data);
             console.log(data);
         });
     },[]);
    return (  
        <>
            <NavBarUser />
            <StaffSetLoyaltyTransaction/>

            <div>    
                <h1>Loyalty Transaction History</h1>
                <table>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Customer ID</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Item Status</th>
                    </tr>
                    {loyaltytransaction.filter(filtercustomerid => filtercustomerid.customerid === id).slice(0).reverse().map( record =>(
                        <tr id={record.key}>
                            <td>{record.id}</td>
                            <td>{record.customerid}</td>
                            <td>{record.item}</td>
                            <td>{record.quantity}</td>
                            <td>{record.itemstatus}</td>
                        </tr>

                                ))}
            </table>   
            </div>
        </>
         
    );
}
 
export default LoyaltyTransaction;