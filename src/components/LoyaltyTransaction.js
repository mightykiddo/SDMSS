import { useState, useEffect } from "react";
import NavBarUser from "./NavBarUser";
import { useLocation, useNavigate } from 'react-router-dom';

const LoyaltyTransaction = () => {
    const [loyaltytransaction, setLoyaltyTransaction] = useState([]);
    const [ordertransaction, setOrderTransaction] = useState([]);
    const location = useLocation();
    var id = location.state.id;

    // Transaction History Entity Component
    const TransactionHistoryEntity = async () => {
        return fetch('http://localhost:8003/loyaltytransaction')
    }

    const TransactionHistoryEntity2 = async () => {
        return fetch('http://localhost:8007/ordertransaction')
    }

    // Transaction History Controller Component
    useEffect(()=>{
        TransactionHistoryEntity()
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setLoyaltyTransaction(data);
        });
    },[]);

    useEffect(()=>{
        TransactionHistoryEntity2()
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setOrderTransaction(data);
        });
    },[]);
    

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
                <h1>Order Transaction History</h1>
                <table style={tableStyles}>
                    <thead>
                        <tr style={tableHeaderStyles}>
                            <th style={tableDataStyles}>Transaction ID</th>
                            <th style={tableDataStyles}>Customer ID</th>
                            <th style={tableDataStyles}>Item Name</th>
                            <th style={tableDataStyles}>Quantity</th>
                            <th style={tableDataStyles}>Total Amount</th>
                            <th style={tableDataStyles}>Item Status</th>
                            <th style={tableDataStyles}>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordertransaction.filter(filtercustomerid => filtercustomerid.customerid === id).slice(0).reverse().map((record, index) => (
                            <tr id={record.key} style={index % 2 === 0 ? {} : alternatingRowStyles}>
                                <td style={tableDataStyles}>{record.id}</td>
                                <td style={tableDataStyles}>{record.customerid}</td>
                                <td style={tableDataStyles}>{record.item}</td>
                                <td style={tableDataStyles}>{record.quantity}</td>
                                <td style={tableDataStyles}>${record.totalamount.toFixed(2)}</td>
                                <td style={tableDataStyles}>{record.itemstatus}</td>
                                <td style={tableDataStyles}>{record.detail}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{margin: '20px'}}>
                <h1>Loyalty Transaction History</h1>
                <table style={tableStyles}>
                    <thead>
                        <tr style={tableHeaderStyles}>
                            <th style={tableDataStyles}>Transaction ID</th>
                            <th style={tableDataStyles}>Customer ID</th>
                            <th style={tableDataStyles}>Item Name</th>
                            <th style={tableDataStyles}>Quantity</th>
                            <th style={tableDataStyles}>Item Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loyaltytransaction.filter(filtercustomerid => filtercustomerid.customerid === id).slice(0).reverse().map((record, index) => (
                            <tr id={record.key} style={index % 2 === 0 ? {} : alternatingRowStyles}>
                                <td style={tableDataStyles}>{record.id}</td>
                                <td style={tableDataStyles}>{record.customerid}</td>
                                <td style={tableDataStyles}>{record.item}</td>
                                <td style={tableDataStyles}>{record.quantity}</td>
                                <td style={tableDataStyles}>{record.itemstatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
}
 
export default LoyaltyTransaction;
