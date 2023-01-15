import React, { useEffect } from 'react';
import './Users.css';
import UserEntry from './UserEntry';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Users = ({ userData }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}users/?fields=id`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                let temp_users = [];
                for (let entry of data) {
                    temp_users.push(entry.id);
                }
                setUsers(temp_users);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className='users'>
            <div className='users-header'>
                <h1>Vroomers Statistics</h1>
            </div>
            <div className='user-entries'>
                {users.map((id, index) => (
                    <UserEntry
                        userData={userData}
                        key={index}
                        index={index}
                        user_id={id}
                    />
                ))}
            </div>
        </div>
    );
};

export default Users;
