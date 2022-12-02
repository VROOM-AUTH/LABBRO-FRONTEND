import React, { useState } from 'react'
import "./StatisticsCard.css"

const StatisticsCard = ({title="Lab Total Open Hours", info = "15,645 hours",}) => {
  const [bgColor, setBgColor] = useState({
        card: '#222338',
        icon: 'linear-gradient(94deg, rgba(108,49,229,1) 0%, rgba(194,89,228,1) 100%)'
    })

    // const [txtColor, setTxtColor] = useState({black:})
    const swapColors = () => {
        setBgColor(oldColors => {
            return {card: oldColors['icon'], icon: oldColors['card']}
        })
    }
  
  return (
    <div onClick={swapColors} className='statistics-card' style={{background: bgColor.card}}>
        <div className="icon-container" style={{background: bgColor.icon}}>&#8987;</div>
        <div className="info-container">
            <h3 className="info">{info}</h3>
            <div className="title">{title}</div>
        </div>
    </div>
  )
}

export default StatisticsCard