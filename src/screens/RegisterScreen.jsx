import './LoginReg.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LBL from '../assets/LabBro_Logo.png';
import VL from '../assets/Vroom Logo.png';
var CryptoJS = require('crypto-js');

const RegisterScreen = ({}) => {
    const [pwd, setPwd] = useState('');
    const [name, setName] = useState('');
    const [hashedPwd, setHashedPwd] = useState('');
    const Navigate = useNavigate();
    const bcrypt = require('bcryptjs');

    // const hashCode = (s) =>
    //     s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            fetch(`${process.env.REACT_APP_BASE_URL}users/?name=${name}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw response;
                })
                .then((data) => {
                    if (!data[0].password && data[0].name !== null) {
                        fetch(
                            `${process.env.REACT_APP_BASE_URL}users/${data[0].id}`,
                            {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    password: hashedPwd,
                                }),
                            }
                        );
                        Navigate('/login');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        bcrypt.hash(pwd, 10, function (err, hash) {
            // Store the hash in your DB
            setHashedPwd(hash);
        });
    }, [pwd]);

    return (
        <div className='big-container'>
            <div className='column box'>
                <h1 className='loginreg-title h1'>
                    Register to Lab Bro Portal
                </h1>
                <div className='container'>
                    <form onSubmit={handleSignup} className='column'>
                        <input
                            className='labels input h2'
                            placeholder='  Name'
                            type='text'
                            id='name'
                            onChange={(event) => setName(event.target.value)}
                            value={name}
                        />

                        <input
                            className='labels input h2'
                            placeholder='  Password'
                            type='password'
                            id='password'
                            onChange={(event) => setPwd(event.target.value)}
                            value={pwd}
                            required
                        />
                        <button
                            className='mainButton h3'
                            onSubmit={handleSignup}>
                            Register
                        </button>
                        <button
                            className='secondButton h3'
                            onClick={() => Navigate('/login')}>
                            Login
                        </button>
                    </form>
                    <div className='columnB'>
                        <img
                            className='bro'
                            alt='Bro'
                            height='200px'
                            src={LBL}></img>
                        <img
                            className='vroom'
                            alt='vroom'
                            height='250px'
                            src={VL}></img>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RegisterScreen;
