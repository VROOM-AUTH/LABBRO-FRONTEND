import React from "react";

const ProgressBar = (props) => {
  const { bgcolor, completed, totalUserVolts, levelMax, isCurrentLevel } =
    props;

  const containerStyles = {
    height: 20,
    width: "100%",
    // backgroundColor: "#e0e0de",
    backgroundColor: "#565689",
    borderRadius: 50,
    // margin: 50,
  };

  const fillerStyles = {
    transition: "width 1s ease-in-out",
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    color: "#2a2a42",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>
          {isCurrentLevel ? `${totalUserVolts}/${levelMax}` : ""}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
