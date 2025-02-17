import React, { useState } from 'react';
import { Category, Currency, Metric } from '../../Props/TransactionProp';

interface NewPaymentPopupProps {
  onClose: () => void;
  onSave: (payment: any) => void;
}

const NewPaymentPopup: React.FC<NewPaymentPopupProps> = ({ onClose, onSave }) => {
  const [type, setType] = useState<'Income' | 'Expense'>('Income');
  const [category, setCategory] = useState<Category>(Category.Salary);
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<Currency>(Currency.HUF);
  const [repeat, setRepeat] = useState<boolean>(false);
  const [repeatMetric, setRepeatMetric] = useState<Metric>(Metric.Month);
  const [repeatAmount, setRepeatAmount] = useState<number>(1);

  const handleSave = () => {
    const payment = {
      type,
      category,
      amount,
      currency,
      repeat: repeat ? { metric: repeatMetric, amount: repeatAmount } : null,
    };
    onSave(payment);
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>New Payment</h2>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value as 'Income' | 'Expense')}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </label>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value as unknown as Category)}>
            {Object.keys(Category).map((key) => (
              <option key={key} value={Category[key as keyof typeof Category]}>
                {key}
              </option>
            ))}
          </select>
        </label>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </label>
        <label>
          Currency:
          <select value={currency} onChange={(e) => setCurrency(e.target.value as unknown as Currency)}>
            <option value={Currency.HUF}>HUF</option>
          </select>
        </label>
        <label>
          Repeat:
          <input type="checkbox" checked={repeat} onChange={(e) => setRepeat(e.target.checked)} />
        </label>
        {repeat && (
          <>
            <label>
              Repeat Metric:
              <select value={repeatMetric} onChange={(e) => setRepeatMetric(e.target.value as unknown as Metric)}>
                {Object.keys(Metric).map((key) => (
                  <option key={key} value={Metric[key as keyof typeof Metric]}>
                    {key}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Repeat Amount:
              <input type="number" value={repeatAmount} onChange={(e) => setRepeatAmount(Number(e.target.value))} />
            </label>
          </>
        )}
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default NewPaymentPopup;