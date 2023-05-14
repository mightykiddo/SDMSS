import { useState, useEffect } from "react";
import NavBarUser from "./NavBarUser";
import { useLocation, useNavigate } from 'react-router-dom';
import  Modal  from 'react-modal'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : '#4f4747'
    }
};

const LoyaltyPage = () => {
    const history = useNavigate();
    const [loyaltyitem, setLoyaltyItem] = useState([]);
    const [item, setItem] = useState('');
    const [modalIsOpen4, setModalIsOpen4] = useState(false);
    const [points, setPoints] = useState('');
    const [itemstatus, setitemstatus] = useState("Unclaimed");
    const [quantity, setquantity] = useState(" ");
    const [isPending, setIsPending] = useState(false);
    const location = useLocation();
    const username = location.state.username;
    var loyaltypoint = location.state.loyaltypoint;
    var seatpref = location.state.seatpref;
    var id = location.state.id;
    var totalpoints = " ";
    

    useEffect(() => {
        fetch('http://localhost:8004/loyaltyitems')
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setLoyaltyItem(data);
        })
    }, []); 

    const handleSubmit2 = () =>{
        setModalIsOpen4(false)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        totalpoints = points * quantity;
        console.log(totalpoints)
        
        if (loyaltypoint > totalpoints){

            var deduction = loyaltypoint - totalpoints; 

            console.log(deduction)

            var customerid = id;
            const itemstatus ="Unclaimed"
            const loyaltytransaction = {item, itemstatus, quantity, customerid};
            
            setIsPending(true);

            loyaltypoint = deduction

            fetch(`http://localhost:8005/user/${customerid}`) 
            .then(res=>{
                return res.json();
            })
            .then(data => {
                
                console.log(data)

                fetch(`http://localhost:8005/user/${customerid}`,
                {
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({...data, loyaltypoint : deduction})
                }) 
                
            }); 

            
            
            fetch('http://localhost:8003/loyaltytransaction',{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(loyaltytransaction)
            }).then(()=>{
                console.log("Item is redeemed");
                history('/user', {state:{username, loyaltypoint, seatpref, id}});
            })
 

        } else if (loyaltypoint < totalpoints){

            console.log("not enough loyalty point!!")
            setModalIsOpen4(true);

        }
        
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
                <h1>Loyalty Point Redemption</h1>
                <p>Current Loyalty Points: <span className='w3-text-amber'>{loyaltypoint}</span></p>
                <table style={tableStyles}>
                    <thead>
                        <tr style={tableHeaderStyles}>
                            <th style={tableDataStyles}>Item ID</th>
                            <th style={tableDataStyles}>Item Name</th>
                            <th style={tableDataStyles}>Points required</th>
                            <th style={tableDataStyles}>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loyaltyitem.map((record, index) => (
                        <tr key={index} style={index % 2 === 0 ? null : alternatingRowStyles}>
                            <td style={tableDataStyles}>{record.itemid}</td>
                            <td style={tableDataStyles}>{record.itemname}</td>
                            <td style={tableDataStyles}>{record.points}</td>
                            <td style={tableDataStyles}><img src={record.imagesrc} style={{width:"300px", height:"200px"}} className="w3-round"></img></td>
                        </tr>
                        ))}
                    </tbody>
                </table>

                
                <form onSubmit={handleSubmit}>

                    <div className="w3-section">

                        <div className="w3-half w3-padding-small">
                            <h3>Select your redemption item:</h3>
                            <select 
                                className="w3-input w3-section w3-border w3-round w3-dark-grey"
                                value={item}
                                onChange={(e) => {
                                    setItem(e.target.value);
                                    const selectedRecord = loyaltyitem.find(record => record.itemname === e.target.value);
                                    setPoints(selectedRecord.points);
                                }}
                                >
                                <option value="">Choose An Item</option>
                                {loyaltyitem.map(record => (
                                    <option value={record.itemname}>{record.itemname}</option>
                                ))}
                            </select>
                        </div>
                    
                        <div className="w3-half w3-padding-small">
                            <h3>Quantity:</h3>
                            <select
                                className="w3-input w3-section w3-border w3-round w3-dark-grey"
                                value={quantity}
                                onChange={(e) => setquantity(e.target.value)}
                            >
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
        
                        { !isPending && <button className="w3-button w3-deep-orange w3-round-large" >Redeem</button>}
                        { isPending && <button disabled className="w3-button w3-deep-orange w3-round-large w3-margin-top">Submitting release form...</button>}
                    
                    </div>

                </form>
            </div>

            <Modal
                isOpen={modalIsOpen4}
                onRequestClose={() => setModalIsOpen4(false)}
                style={customStyles} >

                <h1>Not Enough Loyalty Point!!</h1>
                <div className="Iwantaligncenter">
                    <button className='w3-button w3-light-grey w3-round-large w3-margin-top' onClick={handleSubmit2}>Close</button>
                </div>
            </Modal>
        </>
    )
}
 
export default LoyaltyPage;