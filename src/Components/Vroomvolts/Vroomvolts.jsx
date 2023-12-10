import React from "react";
import "./Vroomvolts.css";
import coin from "../../Assets/coin.png";

export default function Vroomvolts({ userData, mergedUsers }) {
    const myVroomvolts = mergedUsers.find((user) => user.id === userData.userId).vroomvolts || 0;
    return (
        <div className='vroomvolts-container'>
            <div className='vroomvolts-content-container'>
                <div className='vroomvolts-title-container'>
                    <h1 className='vroomvolts-title'>Vroomvolts</h1>
                    <h1 className='vroomvolts-title'>
                        <div>{myVroomvolts}</div>
                        <img src={coin} className='vroomvolt-img' alt='coin'></img>
                    </h1>
                </div>
                <div className='roadmap-container'></div>
            </div>
        </div>
    );
}
