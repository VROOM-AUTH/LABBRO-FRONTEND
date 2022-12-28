import React from 'react';
import './UserEntry.css';
import coin from '../../assets/coin.png';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

const UserEntry = ({ user_id }) => {
    const [userName, setUserName] = useState('');
    const [userVroomvolts, setUserVroomvolts] = useState(0);
    const [inLab, setInLab] = useState(false);
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

        fetch(
            `${process.env.REACT_APP_BASE_URL}users-levels/?user_id=${user_id}`
        )
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

        fetch(`${process.env.REACT_APP_BASE_URL}users-time/?user_id=${user_id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                if (data.in_lab === true) {
                    setInLab(true);
                } else {
                    setInLab(false);
                }
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className='entry-container'>
            <div className='entry-header'>
                <div className='user-icon-con'>
                    <div className='user-icon'>
                        <svg className={inLab ? 'circle-hidden' : 'circle'}>
                            <circle
                                fill='#ff0000'
                                stroke='none'
                                cx='50%'
                                cy='50%'
                                r='12'>
                                <animate
                                    attributeName='opacity'
                                    dur='3s'
                                    values='0;1;0'
                                    repeatCount='indefinite'
                                    begin='0.1'
                                />
                            </circle>
                        </svg>
                        <svg className={inLab ? 'circle' : 'circle-hidden'}>
                            <circle
                                fill='#00ff00'
                                stroke='none'
                                cx='50%'
                                cy='50%'
                                r='12'>
                                <animate
                                    attributeName='opacity'
                                    dur='3s'
                                    values='0;1;0'
                                    repeatCount='indefinite'
                                    begin='0.1'
                                />
                            </circle>
                        </svg>
                        <span className={inLab ? 'status' : 'status-hidden'}>
                            In Lab
                        </span>
                        <span className={inLab ? 'status-hidden' : 'status'}>
                            Out of Lab
                        </span>
                    </div>
                </div>
                <div className='user-name-con'>
                    <div className='user-name'>{userName}</div>
                </div>
                <div className='total-vroomvolts-con'>
                    <div className='total-vroomvolts'>
                        {userVroomvolts} <img src={coin} alt='vroomvolts' />
                    </div>
                </div>
            </div>
            {/* <div className='user-charts-hidden'>
                <p>hhh</p>
            </div> */}
        </div>
    );
};

export default UserEntry;
