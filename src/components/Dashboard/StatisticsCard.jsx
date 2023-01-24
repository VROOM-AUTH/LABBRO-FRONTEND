import React, { useState } from "react";
import "./StatisticsCard.css";

const StatisticsCard = ({
    title = "Lab Total Open Hours",
    info = "15,645 hours",
    icon,
}) => {
    const [bgColor, setBgColor] = useState({
        card: "#222338",
        icon: "linear-gradient(94deg, rgba(108,49,229,1) 0%, rgba(194,89,228,1) 100%)",
    });

    const swapColors = () => {
        setBgColor((oldColors) => {
            return { card: oldColors["icon"], icon: oldColors["card"] };
        });
    };

    return (
        <div
            // onClick={swapColors}
            className="statistics-card"
            style={{ background: bgColor.card }}
        >
            <div
                className="icon-container"
                style={{ background: bgColor.icon }}
            >
                {icon == 1 && <div>&#9201;</div>}
                {icon == 2 && <div>&#128065;</div>}
                {icon == 3 && <div>&#128197;</div>}
                {icon == 4 && <div>&#128101;</div>}
            </div>
            <div className="info-container">
                <h3 className="info">{info}</h3>
                <div className="title">{title}</div>
            </div>
        </div>
    );
};

export default StatisticsCard;
