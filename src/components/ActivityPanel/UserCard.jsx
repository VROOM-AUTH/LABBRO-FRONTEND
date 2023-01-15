import React, { useEffect, useState } from 'react';
import './UserCard.css';
import PROFILE from '../../assets/LabBro_Logo.png';

const UserCard = ({ user = 'User 404', index }) => {
    const [opacity, setOpacity] = useState(0.5);

    useEffect(() => {
        switch (index) {
            case 0:
                setOpacity(1.0);
                break;
            case 1:
                setOpacity(0.9);
                break;
            case 2:
                setOpacity(0.7);
                break;
            case 3:
                setOpacity(0.6);
                break;
        }
    }, []);

    return (
        <div className='user-card' style={{ opacity: opacity }}>
            <div className='profile-pic-container'>
                <img src={PROFILE} alt='profile picture' />
            </div>
            <div className='name'>{user}</div>
        </div>
    );
};

export default UserCard;
