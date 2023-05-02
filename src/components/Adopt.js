import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Adopt = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [petname, setPetname] = useState('');
    const [reason, setReason] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const adopt = {name, email, contact, petname, reason};
        setIsPending(true);


        fetch('http://localhost:8000/adopt', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(adopt)
        }).then(() => {
            console.log('new adopt form added')
            setIsPending(false);
            //history(-1);
            history('/user');
        })

        
    }

    return (
        <div className="w3-content w3-padding w3-center" style={{width:"60%"}}>
            <div className="w3-padding-16">
            <h1 className="w3-border-bottom w3-border-teal w3-padding-32">Adopt Form</h1>
            <form onSubmit={handleSubmit} className="w3-padding-32">
                <label className="w3-left w3-xlarge" >Name:</label>
                <input
                    className="w3-input w3-section w3-border w3-round"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label className="w3-left w3-xlarge" >Email:</label>
                <input
                    className="w3-input w3-section w3-border w3-round"
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="w3-left w3-xlarge" >Contact:</label>
                <input
                    className="w3-input w3-section w3-border w3-round"
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                />
                <label className="w3-left w3-xlarge" >Pet Name:</label>
                <input
                    className="w3-input w3-section w3-border w3-round"
                    type="text"
                    required
                    value={petname}
                    onChange={(e) => setPetname(e.target.value)}
                />
                <label className="w3-left w3-xlarge" >Reason:</label>
                <textarea
                    className="w3-input w3-section w3-border w3-round"
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                ></textarea>
                
                { !isPending && <button className="w3-button w3-light-grey w3-round-large w3-margin-top">Submit</button>}
                { isPending && <button disabled className="w3-button w3-light-grey w3-round-large w3-margin-top">Submitting adopt form...</button>}

            </form>
            </div>
        </div>
    )
}

export default Adopt;