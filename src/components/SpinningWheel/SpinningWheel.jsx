import React, { useState, useEffect } from "react";
import wheel from "../../assets/wheel.png";

const SpinningWheel = () => {
  // State to store the selected prize
  const [prize, setPrize] = useState("");
  // State to store the spinning status of the wheel
  const [spinning, setSpinning] = useState(false);
  // State to store the angle of the wheel
  const [angle, setAngle] = useState(0);

  // Array of possible prizes
  const prizes = ["1", "2", "3", "4", "5"];

  // Function to handle the spinning wheel
  const spin = () => {
    // Generate a random index to select a prize
    const randomIndex = Math.floor(Math.random() * prizes.length);

    // Update the prize state with the randomly selected prize
    setPrize(prizes[randomIndex]);
    // Set the spinning status to true
    setSpinning(true);
  };

  useEffect(() => {
    if (spinning) {
      // Calculate the final angle of the wheel based on the selected prize
      const finalAngle = 360 - (360 / prizes.length) * prizes.indexOf(prize);

      // Animate the spinning of the wheel
      let currentAngle = angle;
      const spinningInterval = setInterval(() => {
        // Increment the angle by 10 degrees
        currentAngle += 10;
        // If the wheel has completed a full rotation, reset the angle to 0
        if (currentAngle >= 360) {
          currentAngle = 0;
        }
        // Update the angle state
        setAngle(currentAngle);
      }, 50);

      // Stop the animation after a random duration
      setTimeout(() => {
        clearInterval(spinningInterval);
        // Reset the angle to the final angle
        setAngle(finalAngle % 360);
        // Set the spinning status to false
        setSpinning(false);
      }, Math.random() * 2000 + 4000);
    }
  }, [spinning, angle, prize, prizes]);

  return (
    <div>
      <button onClick={spin} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin the wheel"}
      </button>
      {prize && <p>You won: {prize}</p>}
      <div
        style={{
          transform: `rotate(${angle}deg)`,
          transition: spinning
            ? "none"
            : "transform 2s cubic-bezier(0.25, 0.1, 0.25, 1)",
          transitionTimingFunction: spinning
            ? "linear"
            : "cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        <img src={wheel} width="600" alt="Spinning wheel" />
      </div>
    </div>
  );
};

export default SpinningWheel;
