import React from 'react';
import './UserEntry.css';
import coin from '../../assets/coin.png';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

const UserEntry = ({ user_id }) => {
    const [userName, setUserName] = useState('');
    const [userVroomvolts, setUserVroomvolts] = useState(0);
    // const [charts, setCharts] = useState(true);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}users/?user_id=${user_id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setUserName(data[0].name);
                console.log();
            })
            .catch((error) => console.log(error));

        fetch(`${process.env.REACT_APP_BASE_URL}users-levels/?id=${user_id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setUserVroomvolts(data[0].vroomvolts);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className='entry-container'>
            <div className='entry-header'>
                <div className='user-icon'>LOGO</div>
                <div className='user-name'>{userName}</div>
                <div className='total-vroomvolts'>
                    {userVroomvolts} <img src={coin} alt='vroomvolts' />
                </div>
            </div>
            <div className='user-charts'>
                <p>hhh</p>
            </div>
        </div>
    );
};

export default UserEntry;
