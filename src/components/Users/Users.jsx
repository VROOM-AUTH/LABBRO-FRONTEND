import React from 'react';
import './Users.css';
import UserEntry from './UserEntry';

const Users = () => {
    return (
        <div className='users'>
            <div className='users-header'>
                <h1>Vroomers Statistics</h1>
            </div>
            <div className='user-entries'>
                <UserEntry />
            </div>
        </div>
    );
};

export default Users;
