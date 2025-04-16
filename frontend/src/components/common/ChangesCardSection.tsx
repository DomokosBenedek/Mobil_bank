import React from "react";
import ChangesCard from "./ChangesCard";
import "../../design/common/ChangesCardSection.scss";

interface ChangesCardSectionProps {
  currencys: string[];
  currencyData: { [key: string]: any };
  exchangeRates: { [key: string]: { rate: any; date: string }[] };
  getChangePercentage: (today: number, yesterday: number) => string;
  getCardClass: (change: number) => string;
  getIconClass: (change: number) => string;
  handleCardClick: (currency: string) => void;
}

const ChangesCardSection: React.FC<ChangesCardSectionProps> = ({
  currencys,
  currencyData,
  exchangeRates,
  getChangePercentage,
  getCardClass,
  getIconClass,
  handleCardClick,
}) => {
  return (
    <div className="changes-cards-container">
      {currencys.map((currency) => {
        const todayRate = currencyData[currency]?.changes?.huf || 0;
        const yesterdayRate =
          exchangeRates[currency]?.[exchangeRates[currency].length - 2]?.rate ||
          0;

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