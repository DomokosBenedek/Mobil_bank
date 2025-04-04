import { CardProp } from "../Props/CardProp";
import "../../design/common/card.scss";

const Card: React.FC<CardProp> = ({ number, total, currency, id, name, date }) => {
  return (
    <div className="card_Text">
      <div className="number">{number}</div>
      <div className="total-container">
        <div className="total">{total}</div>
        <div className="valto">{currency}</div>
      </div>
      <div className="id">{id}</div>
      <div className="name">{name}</div>
      <div className="datum">{date}</div>
    </div>
  );
};

export default Card;