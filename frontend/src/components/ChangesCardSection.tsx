import React from 'react';
import ChangesCard from './common/ChangesCard';

interface ChangesCardSectionProps {
  currencys: string[];
  eurData: any;
  usdData: any;
  eurExchangeRates: { rate: any; date: string; }[];
  usdExchangeRates: { rate: any; date: string; }[];
  getChangePercentage: (today: number, yesterday: number) => string;
  getCardClass: (change: number) => string;
  getIconClass: (change: number) => string;
  handleCardClick: (currency: string) => void;
}

const ChangesCardSection: React.FC<ChangesCardSectionProps> = ({
  currencys,
  eurData,
  usdData,
  eurExchangeRates,
  usdExchangeRates,
  getChangePercentage,
  getCardClass,
  getIconClass,
  handleCardClick
}) => {
  return (
    <div className="changes-cards-container">
      {currencys.map((currency) => {
        const todayRate = currency === "eur" ? eurData?.changes.huf : usdData?.changes.huf;
        const yesterdayRate = currency === "eur" ? eurExchangeRates[eurExchangeRates.length - 2]?.rate : usdExchangeRates[usdExchangeRates.length - 2]?.rate;
        const changePercentage = getChangePercentage(todayRate, yesterdayRate);
        const cardClass = getCardClass(parseFloat(changePercentage));
        const iconClass = getIconClass(parseFloat(changePercentage));
        return (
          <ChangesCard
            key={currency}
            currency={currency}
            todayRate={todayRate}
            yesterdayRate={yesterdayRate}
            changePercentage={changePercentage}
            cardClass={cardClass}
            iconClass={iconClass}
            handleCardClick={handleCardClick}
          />
        );
      })}
    </div>
  );
};

export default ChangesCardSection;