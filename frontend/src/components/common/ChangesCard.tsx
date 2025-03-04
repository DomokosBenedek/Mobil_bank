import React from 'react';
import { Flag_EUR, Flag_USD, Icon_Arrow_white } from './img';


interface ChangesCardProps {
  currency: string;
  todayRate: number | null;
  yesterdayRate: number | null;
  changePercentage: string;
  cardClass: string;
  iconClass: string;
  handleCardClick: (currency: string) => void;
}

const ChangesCard: React.FC<ChangesCardProps> = ({
  currency,
  todayRate,
  yesterdayRate,
  changePercentage,
  cardClass,
  iconClass,
  handleCardClick
}) => {
  return (
    <div key={currency} className={`changes-card ${cardClass}`} onClick={() => handleCardClick(currency)}>
      <div className="changes-card-icon">
        <img src={Icon_Arrow_white} alt="Arrow" className={iconClass} />
      </div>
      <div className="changes-card-name">
        <img src={currency === "eur" ? Flag_EUR : Flag_USD} alt={currency === "eur" ? "Flag_EUR" : "Flag_USD"} />
        {currency.toUpperCase()}
      </div>
      <div className="changes-card-value">{todayRate ? todayRate.toFixed(2) : 'N/A'} HUF</div>
      <div className="changes-card-change">{yesterdayRate ? yesterdayRate.toFixed(2) : 'N/A'} ({changePercentage}%)</div>
    </div>
  );
};

export default ChangesCard;