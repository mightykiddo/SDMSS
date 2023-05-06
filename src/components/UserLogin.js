import { useState, useEffect } from "react";

const UserLogin = () => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [dbuser, setdbuser] = useState([]);
    const [success, setsuccess] = useState(false);

    useEffect(()=>{
        fetch('http://localhost:8005/user')
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setdbuser(data);
            console.log(data);
        });
    },[]);
    const handleSubmit = (e) =>{
            e.preventDefault();
            dbuser.filter(record => record.username === username && record.password === password).map(filterrecord =>{
                //record.username === username && record.password === password ? setsuccess("Success") : setsuccess("Fail")
                //success === "Success" ? exit : setsuccess("Fail") 
                //console.log(success);
                setsuccess("Success");
                console.log(success);
            })
    }
    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Username:</td>
                            <td><input type="text" value={username} placeholder="Username" onChange={(e)=> setusername(e.target.value)}></input></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Password:</td>
                            <td><input type="password" value={password} placeholder="Password" onChange={(e)=> setpassword(e.target.value)}></input></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><button>Submit</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
     );
}
 
export default UserLogin;