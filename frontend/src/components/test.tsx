import React from 'react';
import Footer from './Footer';
import CostumeNavbar from './navbar';
import '../design/card.css';
import { CardProp } from '../CardProp';



const Card: React.FC<CardProp> = ({ number, total, currency, id, name, date }) => {
  return (
    <div className="card">
      <div className="number">{number}</div>
      <div className="total-container">
        <div className="total">{total}</div>
        <div className="valto">{currency}</div>
      </div>
      <div className="id">{id}</div>
      <div className="bottom-container">
        <div className="name">{name}</div>
        <div className="datum">{date}</div>
      </div>
    </div>
  );
};

export default Card;
