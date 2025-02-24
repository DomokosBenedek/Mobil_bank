import React, { useEffect } from "react";
import { logicks } from "../../common/logic";

const Changes_Page = () => {
  const { fetchApiEur, fetchApiUsd } = logicks();

  const currencys = ["eur", "usd"];

  const [eurData, setEurData] = React.useState<any>(null);
  const [usdData, setUsdData] = React.useState<any>(null);

  async function api () {
    const eurResult = await fetchApiEur("2025-02-24");
    const usdResult = await fetchApiUsd("2025-02-24");
    setEurData(eurResult);
    setUsdData(usdResult);
  };

  useEffect(() => {
    api();
  }, []);

  return (
    <>
      <main className="profile-main-changes">
      {currencys.map((currency) => (
        <section key={currency} className="changes-container">
          <h2>Currency: {currency.toUpperCase()}</h2>
          <div>
        <p>Date: {currency === "eur" ? eurData?.date : usdData?.date}</p>
        <p>Currency: {currency === "eur" ? eurData?.currency : usdData?.currency}</p>
        <p>Changes: {currency === "eur" ? eurData?.changes.huf : usdData?.changes.huf}</p>
          </div>
        </section>
      ))}
      </main>
    </>
  );
};

export default Changes_Page;
