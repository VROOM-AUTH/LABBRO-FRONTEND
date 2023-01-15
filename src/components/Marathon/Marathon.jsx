import React, { useEffect, useState } from 'react';
import './Marathon.css';
import Confetti from '../Confetti/Confetti';
import first from '../../assets/first.png';
import second from '../../assets/second.png';
import third from '../../assets/third.png';
export default function Marathon({ userData }) {
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [marathonData, setMaratonData] = useState([]);
    const [idToName, setIdToName] = useState([]);
    const [namesAndTime, setNamesAndTime] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}users-time/`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                // console.log(data);
                data.sort((a, b) => b.total_seconds - a.total_seconds);
                // console.log("Sorted Data is:");
                // console.log(data);
                setMaratonData(data);
                setLoading1(false);
            });
        fetch(`${process.env.REACT_APP_BASE_URL}users/?fields=id,name`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setIdToName(data);
                setLoading2(false);
            });
    }, []);

    function convertSeconds(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return hours + ' hours and ' + minutes + ' minutes ';
    }

    return (
        <div className='marathon'>
            {loading1 || loading2 ? (
                <Confetti />
            ) : (
                <>
                    <div className='marathon-header'>
                        <h1>Marathon</h1>
                    </div>
                    <div className='leaderboard-container'>
                        <Confetti />
                        <div className='cards-container'>
                            <div className='marathon-card'>
                                <h1 className='second'>
                                    {
                                        idToName.find(
                                            (o) =>
                                                o.id === marathonData[1].user_id // SEARCHES FOR the objects whos id is the id of the first in the time array
                                        ).name
                                    }
                                </h1>
                                <img
                                    src={second}
                                    alt='first'
                                    width='150vw'></img>
                                <p>
                                    {convertSeconds(
                                        marathonData[1].total_seconds
                                    )}
                                </p>
                            </div>
                            <div className='marathon-card'>
                                <h1 className='first'>
                                    {
                                        idToName.find(
                                            (o) =>
                                                o.id === marathonData[0].user_id // SEARCHES FOR the objects whos id is the id of the first in the time array
                                        ).name
                                    }
                                </h1>
                                <img
                                    src={first}
                                    alt='first'
                                    width='300vw'></img>
                                <p>
                                    {convertSeconds(
                                        marathonData[0].total_seconds
                                    )}
                                </p>
                            </div>
                            <div className='marathon-card'>
                                <h1 className='third'>
                                    {
                                        idToName.find(
                                            (o) =>
                                                o.id === marathonData[2].user_id // SEARCHES FOR the objects whos id is the id of the first in the time array
                                        ).name
                                    }
                                </h1>
                                <img
                                    src={third}
                                    alt='first'
                                    width='100px'></img>
                                <p>
                                    {convertSeconds(
                                        marathonData[2].total_seconds
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    {userData.isLoggedIn ? (
                        <div className='center'>
                            <h1 className='position'>
                                {/* TRANSFORMS the array to an array of ids and finds the index of the logged in user id. Plus one because index starts at 0 */}
                                You are {''}
                                <span
                                    style={{
                                        color: 'rgba(194, 89, 228, 1)',
                                    }}>
                                    {marathonData
                                        .map((e) => e.user_id)
                                        .indexOf(userData.userId) + 1}
                                    {/* CHECKS YOUR POSITION SO IT CAN WRITE 1st 2nd 3rd 4th 5th ..... */}
                                    {marathonData
                                        .map((e) => e.user_id)
                                        .indexOf(userData.userId) +
                                        1 ===
                                    1
                                        ? 'st '
                                        : marathonData
                                              .map((e) => e.user_id)
                                              .indexOf(userData.userId) +
                                              1 ===
                                          2
                                        ? 'nd '
                                        : marathonData
                                              .map((e) => e.user_id)
                                              .indexOf(userData.userId) +
                                              1 ===
                                          3
                                        ? 'rd '
                                        : 'th '}{' '}
                                </span>
                                on the leaderboard.
                            </h1>
                            <h1 className='total-time'>
                                You have spent a total time of{' '}
                                {/* <span
                                    style={{
                                        color: 'rgba(194, 89, 228, 1)',
                                    }}>
                                    {convertSeconds(
                                        marathonData[
                                            marathonData
                                                .map((e) => e.user_id)
                                                .indexOf(userData.userId)
                                        ].total_seconds
                                    )}
                                    {}
                                </span> */}
                                in the lab!
                            </h1>
                        </div>
                    ) : (
                        <div className='center'>
                            <h1 className='login-for-position'>
                                Login to view your position on the leaderboard
                                and your total time spent in the lab!
                            </h1>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
