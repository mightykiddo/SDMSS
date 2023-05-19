import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../w3.css';
import NavBar from './NavBar';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

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

// User Input Component
const User = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return { username, password, setUsername, setPassword };
};

// Entity Component
const LoginEntity = async () => {
    return fetch('http://localhost:8005/user')
    .then((res) => res.json())
}

const LoginEntity2 = async (foundUser) => {
    return fetch(`http://localhost:8030/usersession`,
    {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({userid : foundUser.id})
    })
    .then((response) => response.json())
    .then(data => {
        var userid = data.id
        localStorage.setItem('currentUser', JSON.stringify(userid));//store global 
    })
}

// Controller Component
const LoginController = ({ user }) => {
  const history = useNavigate();
  const [modalIsOpen4, setModalIsOpen4] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginEntity()
      .then((data) => {
        const foundUser = data.find(
          (record) =>
            record.username === user.username &&
            record.password === user.password &&
            record.status === 'Active'
        );

        if (foundUser) {
            
            LoginEntity2(foundUser)

            if (foundUser.acctype === 'customer') {
                history('/user', {
                state: {
                    username: foundUser.username,
                    loyaltypoint: foundUser.loyaltypoint,
                    seatpref: foundUser.seatpref,
                    id: foundUser.id,
                },
                });
            } else if (foundUser.acctype === 'staff') {
                history('/stafffoodanddrink', { state: { username: foundUser.username } });
            } else if (foundUser.acctype === 'Manager') {
                history('/manager', { state: { username: foundUser.username } });
            } else if (foundUser.acctype === 'System Admin') {
                history('/admin', { state: { username: foundUser.username } });
            }
            } else {
            setModalIsOpen4(true);
            }
        });
  };

  return { handleSubmit, modalIsOpen4, setModalIsOpen4 };
};

// Boundary Component
const Login = () => {
  const user = User();
  const { handleSubmit, modalIsOpen4, setModalIsOpen4 } = LoginController({ user });

  const handleSubmit2 = () => {
    setModalIsOpen4(false);
  };

  return (
    <>
      <NavBar />

      {/* <!-- Page content --> */}
      <div className="w3-content w3-padding w3-center" style={{ width: '60%' }}>
        {/* <!-- Log in Section --> */}
        <div className="w3-container w3-margin-top" id="login">
          <div className="w3-padding-32">
            <h1 className="w3-border-bottom w3-border-teal w3-padding-64">Sign In</h1>

            <form onSubmit={handleSubmit} className="w3-padding-32">
                <input
                    value={user.username}
                    placeholder="Username"
                    onChange={(e) => user.setUsername(e.target.value)}
                    className="w3-input w3-section w3-border w3-round"
                    type="text"
                    required
                    name="Username"
                />
                <input
                    type="password"
                    value={user.password}
                    placeholder="Password"
                    onChange={(e) => user.setPassword(e.target.value)}
                    className="w3-input w3-section w3-border w3-round"
                    required
                    name="Password"
                />
                <div className="w3-center w3-padding-large w3-padding-32">
                    <button className="w3-button w3-teal w3-round-large w3-margin-top">SIGN IN</button>
                    <Link
                        to='/createaccount'
                        className="w3-button w3-light-grey w3-round-large w3-margin-top"
                    >
                        CREATE A NEW ACCOUNT
                    </Link>
                </div>
            </form>
        </div>
        </div>
        {/* <!-- End page content --> */}

        </div>
        <Modal
            isOpen={modalIsOpen4}
            onRequestClose={() => setModalIsOpen4(false)}
            style={customStyles}>
            <h1>Incorrect Username Or Password</h1>
            <div className="Iwantaligncenter">
                <button
                    className='w3-button w3-light-grey w3-round-large w3-margin-top'
                    onClick={handleSubmit2}
                >
                    Close
                </button>
            </div>
        </Modal>
    </>
    )
}

export default Login
