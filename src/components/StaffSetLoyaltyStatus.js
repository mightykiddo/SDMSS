import NavBarStaff from './NavBarStaff';
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const StaffSetLoyaltyStatus = () => {
    
    const [searched, setsearched] = useState(0);
    const [LoyaltyTransaction, setLoyaltyTransaction] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [id2, setId] = useState(0);
    const history = useNavigate();

    // Search Loyalty Transaction Entity Component
    const SearchLoyaltyTransactionEntity = async () => {
        return fetch('http://localhost:8003/loyaltytransaction')
    }

    // Search Loyalty Transaction Controller Component
    const handleSubmit = (e) =>{
        e.preventDefault()
        SearchLoyaltyTransactionEntity()
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
        return fetch(`http://localhost:8003/loyaltytransaction/${id2}`) 
    }

    const UpdateStatusEntity2 = async (data, status) => {
        return fetch(`http://localhost:8003/loyaltytransaction/${id2}`,
        {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...data, itemstatus : status})
        })
    }

    // Update Status Controller Component
    const handleSubmit2 = (e) => {
        e.preventDefault()
        console.log(id2);
        const status ="Completed"
        
        UpdateStatusEntity()
        .then(res=>{
            return res.json();
         })
        .then(data => {
            // console.log(data)
            // console.log(data.item)
            // setitem(data.item)
            console.log(data)

            UpdateStatusEntity2(data, status) 

            console.log("update successfully")
            console.log("refresh page")
            history(0)   

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
            <h1>Update Loyalty Status</h1>
            <form onSubmit={handleSubmit} style={{margin: '20px'}}>
                <table>
                <thead>
                <tr>
                    <th><h3>Search Loyalty Transaction History Using ID: &nbsp; </h3></th>
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
                            <th style={tableDataStyles}>Item Status</th>
                            <th style={tableDataStyles}>Submit to confirm claim</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isPending && LoyaltyTransaction.filter(records => records.id === parseInt(searched)).map(record =>(
                        <tr id={record.key}>
                            <td style={tableDataStyles}>{record.id}</td>
                            <td style={tableDataStyles}>{record.customerid}</td>
                            <td style={tableDataStyles}>{record.item}</td>
                            <td style={tableDataStyles}>{record.itemstatus}</td>
                            <td style={tableDataStyles}><button className="w3-button w3-red w3-round-large" value={record.id} onClick={(e)=> setId(e.target.value)}>Submit</button></td>
                        </tr>
                        ))}    
                    </tbody>     
                </table>
            </form>

        </div>
        </>
     );
}
 
export default StaffSetLoyaltyStatus;