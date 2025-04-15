import React, { useState } from "react";
import { logicks } from "../logic";
import { Currency } from "../../Props/TransactionProp";
import { toast } from "react-toastify";
import "../../../design/popups/defoultPopup.scss";
import "../../../design/popups/newPaymentPopup.scss";

interface NewPaymentPopupProps {
  onClose: () => void;
  onSave: () => void;
}

const NewPaymentPopup: React.FC<NewPaymentPopupProps> = ({
  onClose,
  onSave,
}) => {
  const {
    addIncome,
    addExpense,
    createRepeatableTransaction,
    activeAccount,
    fetchAccounts,
    fetchExpenses,
    fetchIncomes,
    findone,
  } = logicks();
  const [type, setType] = useState<"Income" | "Expense">("Income");
  const [category, setCategory] = useState<string>("Other");
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<Currency>(Currency.HUF);
  const [repeat, setRepeat] = useState<boolean>(false);
  const [repeatMetric, setRepeatMetric] = useState<string>("Day");
  const [repeatAmount, setRepeatAmount] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [repeatName, setRepeatName] = useState<string>("");
  const [repeatStart, setRepeatStart] = useState<string>("");
  const [repeatEnd, setRepeatEnd] = useState<string>("");

  const incomeCategories: string[] = [
    "Salary",
    "Transfer",
    "Transaction",
    "Other",
  ];
  const expenseCategories: string[] = [
    "Shopping",
    "Rent",
    "Transport",
    "Transfer",
    "Transaction",
    "Other",
  ];
  const repeatMetricList: string[] = ["Day", "Week", "Month", "Year"];

  const handleSave = async () => {
    try {
      if (type === "Expense" && repeat && !repeatName) {
        const formattedDate = new Date(repeatStart).toISOString().split("T")[0]; // Format as yyyy-mm-dd
        setRepeatName(`${formattedDate} Ismétlődés`);
      }
  
      if (type === "Income") {
        await addIncome(
          activeAccount?.id || "",
          amount,
          category,
          description,
          1,
          "Day"
        );
        toast.success("Bevétel sikeresen hozzáadva!");
      } else {
        if (repeat) {
          await createRepeatableTransaction(
            activeAccount?.id || "",
            amount,
            category,
            description,
            repeatName || `${new Date(repeatStart).toISOString().split("T")[0]} Ismétlődés`,
            repeatAmount,
            repeatMetric,
            new Date(repeatStart),
            new Date(repeatEnd)
          );
          toast.success("Ismétlődő tranzakció sikeresen létrehozva!");
        } else {
          await addExpense(
            activeAccount?.id || "",
            amount,
            category,
            description,
            1,
            "Day"
          );
          toast.success("Kiadás sikeresen hozzáadva!");
        }
      }
  
      fetchAccounts();
      fetchExpenses(activeAccount?.id || "");
      fetchIncomes(activeAccount?.id || "");
      findone(activeAccount?.id || "");
      onSave();
      window.location.reload();
    } catch (error) {
      toast.error("Hiba történt a mentés során!");
      console.error(error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className={`popup new-payment`}>
        <div className="type-buttons">
          <button
            className={`type-button expense ${
              type === "Expense" ? "active" : ""
            }`}
            onClick={() => setType("Expense")}
          >
            Kiadás
          </button>
          <button
            className={`type-button income ${
              type === "Income" ? "active" : ""
            }`}
            onClick={() => setType("Income")}
          >
            Bevétel
          </button>
        </div>
        <div className={`main-content ${type.toLowerCase()}`}>
          <div className="inputs">
          <label>
            Kategória:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {(type === "Income" ? incomeCategories : expenseCategories).map(
                (cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                )
              )}
            </select>
          </label>
          <label>
            Összeg:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </label>
          <label>
            Pénznem:
            <select
              value={currency}
              onChange={(e) =>
                setCurrency(e.target.value as unknown as Currency)
              }
            >
              <option value={Currency.HUF}>HUF</option>
            </select>
          </label>
          <label>
            Leírás:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          {type === "Expense" && (
            <>
              <label>
                Ismétlődő:
                <input
                  type="checkbox"
                  checked={repeat}
                  onChange={(e) => setRepeat(e.target.checked)}
                />
              </label>
              {repeat && (
                <>
                  <div className="repeat-dates">
                  <label>
                      Előfizetés neve:
                      <input
                        type="text"
                        value={repeatName}
                        onChange={(e) => setRepeatName(e.target.value)}
                      />
                    </label>
                    <label>
                      Kezdő dátum:
                      <input
                        type="date"
                        value={repeatStart}
                        onChange={(e) => setRepeatStart(e.target.value)}
                      />
                    </label>
                    <label>
                      Záró dátum:
                      <input
                        type="date"
                        value={repeatEnd}
                        onChange={(e) => setRepeatEnd(e.target.value)}
                      />
                    </label>
                  </div>
                  <div className="repeat-details">
                    <label>Ismétlődés:</label>
                    <div className="repeat-row">
                      <input
                        type="number"
                        value={repeatAmount}
                        onChange={(e) =>
                          setRepeatAmount(Number(e.target.value))
                        }
                        placeholder="Mennyiség"
                      />
                      <select
                        value={repeatMetric}
                        onChange={(e) => setRepeatMetric(e.target.value)}
                      >
                        {repeatMetricList.map((metric, index) => (
                          <option key={index} value={metric}>
                            {metric}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          </div>
        <div className="buttons">
          <button
            className={type === "Expense" ? "tertiary_v1" : "primary_v1"}
            onClick={handleSave}
          >
            Mentés
          </button>
          <button
            className={type === "Expense" ? "tertiary_v2" : "primary_v2"}
            onClick={onClose}
          >
            Mégse
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default NewPaymentPopup;