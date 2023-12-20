import React from "react";
import "./Slots.css";
import { useState } from "react";
import { useEffect } from "react";
export default function Slots() {
    const [reels, setReels] = useState([
        ["🍒", "🍊", "🍇", "🔔", "🍉", "🍍"],
        ["🍒", "🍊", "🍇", "🔔", "🍉", "🍍"],
        ["🍒", "🍊", "🍇", "🔔", "🍉", "🍍"],
    ]);
    const [isSpinning1, setIsSpinning1] = useState(false);
    const [isSpinning2, setIsSpinning2] = useState(false);
    const [isSpinning3, setIsSpinning3] = useState(false);

    const startSpinning = () => {
        setIsSpinning1(true);
        setIsSpinning2(true);
        setIsSpinning3(true);
        setTimeout(() => {
            setIsSpinning1(false);
            setIsSpinning2(false);
            setIsSpinning3(false);
        }, 3000); // Stop after 3 seconds
    };

    return (
        <div className='slot-machine'>
            {reels.map((reel, index) => (
                <div key={index} className={`reel ${index === 0 ? (isSpinning1 ? "spinning" : "") : index === 1 ? (isSpinning2 ? "spinning" : "") : isSpinning3 ? "spinning" : ""}`}>
                    <div className='symbol-container'>
                        {reel.map((symbol, idx) => (
                            <div key={idx} className='symbol'>
                                {symbol}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button onClick={startSpinning} disabled={isSpinning1 || isSpinning2 || isSpinning3}>
                Spin
            </button>
        </div>
    );
}
