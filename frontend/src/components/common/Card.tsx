import React from 'react';
import '../design/card.css';
import { CardProp } from '../../Props/CardProp';

const Card: React.FC<CardProp> = ({ number, total, currency, id, name, date }) => {
  return (
    <div className="card_Text">
      <div className="number">{number}</div>
      <div className="total-container">
        <div className="total">{ total
                              /*total > 1000000 || total < -1000000
                              ? parseFloat((total / 1000000).toFixed(1)) + "M"
                              : total > 1000 || total < -1000
                              ? parseFloat((total / 1000).toFixed(1)) + "K"
                              : total*/
                            }</div>
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
