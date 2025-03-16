import React from 'react';
import { Flag_EUR, Flag_USD, Flag_AUD, Flag_CAD, Flag_CHF, Flag_CZK, Flag_GBP, Flag_HRK, Flag_JPY, Flag_NOK, Flag_PLN, Flag_RON, Flag_RUB, Flag_SEK, Flag_UAH, Icon_Arrow_white } from './img';

const flagMap: { [key: string]: string } = {
  eur: Flag_EUR,
  usd: Flag_USD,
  aud: Flag_AUD,
  cad: Flag_CAD,
  chf: Flag_CHF,
  czk: Flag_CZK,
  gbp: Flag_GBP,
  hrk: Flag_HRK,
  jpy: Flag_JPY,
  nok: Flag_NOK,
  pln: Flag_PLN,
  ron: Flag_RON,
  rub: Flag_RUB,
  sek: Flag_SEK,
  uah: Flag_UAH,
};

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
        <img src={flagMap[currency]} alt={`Flag_${currency.toUpperCase()}`} />
        {currency.toUpperCase()}
      </div>
      <div className="changes-card-value">{todayRate ? todayRate.toFixed(2) : 'N/A'} HUF</div>
      <div className="changes-card-change">{yesterdayRate ? yesterdayRate.toFixed(2) : 'N/A'} ({changePercentage}%)</div>
    </div>
  );
};

export default ChangesCard;