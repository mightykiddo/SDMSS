import NavBarStaff from './NavBarStaff';
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const StaffSetOrderStatus = () => {
    
    const [searched, setsearched] = useState(0);
    const [LoyaltyTransaction, setLoyaltyTransaction] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [id2, setId2] = useState(0);
    const history = useNavigate();


    // Search Order Transaction Entity Component
    const SearchOrderTransactionEntity = async () => {
        return fetch('http://localhost:8007/ordertransaction')
    }

    // Search Order Transaction Controller Component
    const handleSubmit = async (e) =>{
        e.preventDefault()
        await SearchOrderTransactionEntity()
        .then(res =>{
            return res.json();
        })
        .then(data => {
            console.log(data);
            setLoyaltyTransaction(data);
        });     
            console.log(searched)
            setIsPending(true);
    }

    // Update Status Entity Component
    const UpdateStatusEntity = async () => {
        return fetch(`http://localhost:8007/ordertransaction/${id2}`) 
    }

    const UpdateStatusEntity2 = async (data, status) => {
        return fetch(`http://localhost:8007/ordertransaction/${id2}`,
        {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...data, itemstatus : status})
        })  
    }

    const UpdateStatusEntity3 = async (id) => {
        return fetch(`http://localhost:8005/user/${id}`)  
    }

    const UpdateStatusEntity4 = async (id, data, addition) => {
        return fetch(`http://localhost:8005/user/${id}`,
        {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...data, loyaltypoint : addition})
        })  
    }

    // Update Status Controller Component
    const handleSubmit2 = async (e) => {
        e.preventDefault()
        console.log(id2);
        const status ="Paid"
        
        await UpdateStatusEntity()
        .then(res=>{
            return res.json();
         })
        .then(data => {
            console.log(data)
            var point = data.totalamount
            var id = data.customerid
            console.log("loyalty point:")
            console.log(point)
            console.log("customer id:")
            console.log(id)

            UpdateStatusEntity2(data, status)

            console.log("update successfully")

            UpdateStatusEntity3(id)
            
            .then(res=>{
                return res.json();
            })
            .then(data => {
                
                console.log(data)
                var addition =  data.loyaltypoint + point
                console.log(addition)

                UpdateStatusEntity4(id, data, addition)

                console.log("customer gain new point")
                console.log("refresh page")
                history(0)  
                
            });  
        });  
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

    return ( 
        <>
        <NavBarStaff />

        <div className='w3-border-top w3-border-dark-grey' ></div>
        
        <div className="w3-padding-32">
            <h1>Update Order Status</h1>
            <form onSubmit={handleSubmit} style={{margin: '20px'}}>
                <table>
                <thead>
                <tr>
                    <th><h3>Search Order Transaction History Using ID: &nbsp; </h3></th>
                    <th><input type="text" value={searched} onChange={(e) => setsearched(e.target.value)}></input><button>Search</button></th>
                </tr>    
                </thead>      
                </table>
            </form>
            
            <form onSubmit={handleSubmit2} style={{margin: '20px'}}>
                <table style={tableStyles}>
                    <thead>
                        <tr style={tableHeaderStyles}>
                            <th style={tableDataStyles}>Transaction ID</th>
                            <th style={tableDataStyles}>Customer ID</th>
                            <th style={tableDataStyles}>Item Name</th>
                            <th style={tableDataStyles}>Quantity</th>
                            <th style={tableDataStyles}>Total Amount</th>
                            <th style={tableDataStyles}>Item Status</th>
                            <th style={tableDataStyles}>Item Detail</th>
                            <th style={tableDataStyles}>Submit to confirm claim</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isPending && LoyaltyTransaction.filter(records => records.id === parseInt(searched)).map(record =>(
                        <tr id={record.key}>
                            <td style={tableDataStyles}>{record.id}</td>
                            <td style={tableDataStyles}>{record.customerid}</td>
                            <td style={tableDataStyles}>{record.item}</td>
                            <td style={tableDataStyles}>{record.quantity}</td>
                            <td style={tableDataStyles}>${record.totalamount.toFixed(2)}</td>
                            <td style={tableDataStyles}>{record.itemstatus}</td>
                            <td style={tableDataStyles}>{record.detail}</td>
                            <td style={tableDataStyles}><button className="w3-button w3-red w3-round-large" value={record.id} onClick={(e)=> setId2(e.target.value)}>Submit</button></td>
                        </tr>
                        ))}     
                    </tbody>    
                </table>
            </form>
            
        </div>
        </>
     );
}
 
export default StaffSetOrderStatus;