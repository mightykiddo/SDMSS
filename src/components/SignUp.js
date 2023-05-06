import { useState } from "react";
const SignUp = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [acctype, setacctype] = useState();
    const [loyaltypoint, setloyaltypoint] = useState();
    const [seatpref, setseatpref] = useState();
    const handleSubmit = () =>{
        const customer = {acctype, name, email, username, password, loyaltypoint, seatpref}
        fetch('http://localhost:8005/user',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(customer)
        }).then(()=>{
            console.log("new customer added");
        })
    }
    const handleForm = () =>{
        setacctype("customer");
        setloyaltypoint(0);
    }
    return ( 
        <div>
            <h1>Sign Up Page</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Name:</label></td>
                            <td><input type="text" value={name} placeholder="Name" onChange={(e)=> setName(e.target.value)}></input></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><label>Email:</label></td>
                            <td><input type="email" value={email} placeholder="Email" onChange={(e)=> setEmail(e.target.value)}></input></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><label>Username:</label></td>
                            <td><input type="text" value={username} placeholder="Username" onChange={(e)=> setUsername(e.target.value)}></input></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><label>Password:</label></td>
                            <td><input type="password" value={password} placeholder="Password" onChange={(e)=> setPassword(e.target.value)}></input></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><label>Seat Preference:</label></td>
                            <td>
                                <select value={seatpref} onChange={(e)=> setseatpref(e.target.value)}>
                                    <option value="A1">A1</option>
                                    <option value="A2">A2</option>
                                    <option value="A3">A3</option>
                                    <option value="B1">B1</option>
                                    <option value="B2">B2</option>
                                    <option value="B3">B3</option>
                                    <option value="C1">C1</option>
                                    <option value="C2">C2</option>
                                    <option value="C3">C3</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                    <tbody><tr><td>Displays the movie seating plan</td></tr></tbody>
                </table>
                <button onClick={handleForm}>Submit</button>
            </form>
        </div>
     );
}
 
export default SignUp;