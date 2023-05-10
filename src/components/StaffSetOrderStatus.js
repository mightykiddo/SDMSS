import NavBarStaff from './NavBarStaff';
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const StaffSetOrderStatus = () => {
    
    const [searched, setsearched] = useState(0);
    const [LoyaltyTransaction, setLoyaltyTransaction] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [id2, setId2] = useState(0);
    const [item, setitem] = useState('');
    const location = useLocation();
    const history = useNavigate();
    // const [point, setPoint] = useState();
    // const [id, setId] = useState();

    const handleSubmit = (e) =>{
        e.preventDefault()
        fetch('http://localhost:8007/ordertransaction')
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
        const status ="Paid"
        
        

        fetch(`http://localhost:8007/ordertransaction/${id2}`) 
        .then(res=>{
            return res.json();
         })
        .then(data => {
            // console.log(data)
            // console.log(data.item)
            // setitem(data.item)
            console.log(data)
            var point = data.totalamount
            var id = data.customerid
            console.log("loyalty point:")
            console.log(point)
            console.log("customer id:")
            console.log(id)

            fetch(`http://localhost:8007/ordertransaction/${id2}`,
            {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({...data, itemstatus : status})
            }) 

            console.log("update successfully")

            fetch(`http://localhost:8005/user/${id}`) 
            .then(res=>{
                return res.json();
            })
            .then(data => {
                
                console.log(data)
                var addition =  data.loyaltypoint + point
                console.log(addition)

                fetch(`http://localhost:8005/user/${id}`,
                {
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({...data, loyaltypoint : addition})
                }) 

                console.log("customer gain new point")
                console.log("refresh page")
                history(0)  
                
            });  

        });  

        
    }

    return ( 
        <>
        <NavBarStaff />
        
        <div>
            <h1>Update Order Status</h1>
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
                        <td><button value={record.id} onClick={(e)=> setId2(e.target.value)}>Submit</button></td>
                    </tr>
                    ))}         
                </table>
            </form>
        </div>
        </>
     );
}
 
export default StaffSetOrderStatus;