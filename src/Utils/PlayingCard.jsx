import React from "react";
import "./PlayingCard.css";
import Card2B from "../Assets/Cards/2B.svg";
import Card2S from "../Assets/Cards/2S.svg";
import Card2C from "../Assets/Cards/2C.svg";
import Card2D from "../Assets/Cards/2D.svg";
import Card2H from "../Assets/Cards/2H.svg";

import Card3S from "../Assets/Cards/3S.svg";
import Card3C from "../Assets/Cards/3C.svg";
import Card3D from "../Assets/Cards/3D.svg";
import Card3H from "../Assets/Cards/3H.svg";

import Card4S from "../Assets/Cards/4S.svg";
import Card4C from "../Assets/Cards/4C.svg";
import Card4D from "../Assets/Cards/4D.svg";
import Card4H from "../Assets/Cards/4H.svg";

import Card5S from "../Assets/Cards/5S.svg";
import Card5C from "../Assets/Cards/5C.svg";
import Card5D from "../Assets/Cards/5D.svg";
import Card5H from "../Assets/Cards/5H.svg";

import Card6S from "../Assets/Cards/6S.svg";
import Card6C from "../Assets/Cards/6C.svg";
import Card6D from "../Assets/Cards/6D.svg";
import Card6H from "../Assets/Cards/6H.svg";

import Card7S from "../Assets/Cards/7S.svg";
import Card7C from "../Assets/Cards/7C.svg";
import Card7D from "../Assets/Cards/7D.svg";
import Card7H from "../Assets/Cards/7H.svg";

import Card8S from "../Assets/Cards/8S.svg";
import Card8C from "../Assets/Cards/8C.svg";
import Card8D from "../Assets/Cards/8D.svg";
import Card8H from "../Assets/Cards/8H.svg";

import Card9S from "../Assets/Cards/9S.svg";
import Card9C from "../Assets/Cards/9C.svg";
import Card9D from "../Assets/Cards/9D.svg";
import Card9H from "../Assets/Cards/9H.svg";

import CardTS from "../Assets/Cards/TS.svg";
import CardTC from "../Assets/Cards/TC.svg";
import CardTD from "../Assets/Cards/TD.svg";
import CardTH from "../Assets/Cards/TH.svg";

import CardJS from "../Assets/Cards/JS.svg";
import CardJC from "../Assets/Cards/JC.svg";
import CardJD from "../Assets/Cards/JD.svg";
import CardJH from "../Assets/Cards/JH.svg";

import CardQS from "../Assets/Cards/QS.svg";
import CardQC from "../Assets/Cards/QC.svg";
import CardQD from "../Assets/Cards/QD.svg";
import CardQH from "../Assets/Cards/QH.svg";

import CardKS from "../Assets/Cards/KS.svg";
import CardKC from "../Assets/Cards/KC.svg";
import CardKD from "../Assets/Cards/KD.svg";
import CardKH from "../Assets/Cards/KH.svg";

import CardAS from "../Assets/Cards/AS.svg";
import CardAC from "../Assets/Cards/AC.svg";
import CardAD from "../Assets/Cards/AD.svg";
import CardAH from "../Assets/Cards/AH.svg";

export default function PlayingCard({ card }) {
    console.log(card);
    switch (card) {
        case "2B":
            return <img src={Card2B} className='playing-card' alt='2B' />;
        case "2S":
            return <img src={Card2S} className='playing-card' alt='2S' />;
        case "2C":
            return <img src={Card2C} className='playing-card' alt='2C' />;
        case "2D":
            return <img src={Card2D} className='playing-card' alt='2D' />;
        case "2H":
            return <img src={Card2H} className='playing-card' alt='2H' />;
        case "3S":
            return <img src={Card3S} className='playing-card' alt='3S' />;
        case "3C":
            return <img src={Card3C} className='playing-card' alt='3C' />;
        case "3D":
            return <img src={Card3D} className='playing-card' alt='3D' />;
        case "3H":
            return <img src={Card3H} className='playing-card' alt='3H' />;
        case "4S":
            return <img src={Card4S} className='playing-card' alt='4S' />;
        case "4C":
            return <img src={Card4C} className='playing-card' alt='4C' />;
        case "4D":
            return <img src={Card4D} className='playing-card' alt='4D' />;
        case "4H":
            return <img src={Card4H} className='playing-card' alt='4H' />;
        case "5S":
            return <img src={Card5S} className='playing-card' alt='5S' />;
        case "5C":
            return <img src={Card5C} className='playing-card' alt='5C' />;
        case "5D":
            return <img src={Card5D} className='playing-card' alt='5D' />;
        case "5H":
            return <img src={Card5H} className='playing-card' alt='5H' />;
        case "6S":
            return <img src={Card6S} className='playing-card' alt='6S' />;
        case "6C":
            return <img src={Card6C} className='playing-card' alt='6C' />;
        case "6D":
            return <img src={Card6D} className='playing-card' alt='6D' />;
        case "6H":
            return <img src={Card6H} className='playing-card' alt='6H' />;
        case "7S":
            return <img src={Card7S} className='playing-card' alt='7S' />;
        case "7C":
            return <img src={Card7C} className='playing-card' alt='7C' />;
        case "7D":
            return <img src={Card7D} className='playing-card' alt='7D' />;
        case "7H":
            return <img src={Card7H} className='playing-card' alt='7H' />;
        case "8S":
            return <img src={Card8S} className='playing-card' alt='8S' />;
        case "8C":
            return <img src={Card8C} className='playing-card' alt='8C' />;
        case "8D":
            return <img src={Card8D} className='playing-card' alt='8D' />;
        case "8H":
            return <img src={Card8H} className='playing-card' alt='8H' />;
        case "9S":
            return <img src={Card9S} className='playing-card' alt='9S' />;
        case "9C":
            return <img src={Card9C} className='playing-card' alt='9C' />;
        case "9D":
            return <img src={Card9D} className='playing-card' alt='9D' />;
        case "9H":
            return <img src={Card9H} className='playing-card' alt='9H' />;
        case "TS":
            return <img src={CardTS} className='playing-card' alt='TS' />;
        case "TC":
            return <img src={CardTC} className='playing-card' alt='TC' />;
        case "TD":
            return <img src={CardTD} className='playing-card' alt='TD' />;
        case "TH":
            return <img src={CardTH} className='playing-card' alt='TH' />;
        case "JS":
            return <img src={CardJS} className='playing-card' alt='JS' />;
        case "JC":
            return <img src={CardJC} className='playing-card' alt='JC' />;
        case "JD":
            return <img src={CardJD} className='playing-card' alt='JD' />;
        case "JH":
            return <img src={CardJH} className='playing-card' alt='JH' />;
        case "QS":
            return <img src={CardQS} className='playing-card' alt='QS' />;
        case "QC":
            return <img src={CardQC} className='playing-card' alt='QC' />;
        case "QD":
            return <img src={CardQD} className='playing-card' alt='QD' />;
        case "QH":
            return <img src={CardQH} className='playing-card' alt='QH' />;
        case "KS":
            return <img src={CardKS} className='playing-card' alt='KS' />;
        case "KC":
            return <img src={CardKC} className='playing-card' alt='KC' />;
        case "KD":
            return <img src={CardKD} className='playing-card' alt='KD' />;
        case "KH":
            return <img src={CardKH} className='playing-card' alt='KH' />;
        case "AS":
            return <img src={CardAS} className='playing-card' alt='AS' />;
        case "AC":
            return <img src={CardAC} className='playing-card' alt='AC' />;
        case "AD":
            return <img src={CardAD} className='playing-card' alt='AD' />;
        case "AH":
            return <img src={CardAH} className='playing-card' alt='AH' />;
        default:
            return <></>;
    }
}
