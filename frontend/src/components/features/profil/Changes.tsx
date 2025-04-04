import React, { useEffect, useState } from "react";
import { logicks } from "../../common/logic";
import ChangesCardSection from "../../ChangesCardSection";
import { Api } from "../../Props/ApiProp";
import "../../../design/profil_page_element/changes.scss";
import LineChart from "../../common/charts/lineChart";
import CombinedLineChart from "../../common/charts/combinedLineChart";

const Changes_Page = () => {
  const { fetchApiCurrency } = logicks();
  const days = 30;

  const currencys = [
    "eur",
    "usd",
    "aud",
    "cad",
    "chf",
    "czk",
    "gbp",
    "hrk",
    "jpy",
    "nok",
    "pln",
    "ron",
    "rub",
    "sek",
    "uah",
  ];

  const [currencyData, setCurrencyData] = useState<{ [key: string]: any }>({});
  const [exchangeRates, setExchangeRates] = useState<{
    [key: string]: { rate: any; date: string }[];
  }>({});
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const getIconClass = (change: number) => {
    return change >= 0 ? "rotate-left" : "rotate-right";
  };

  async function fetchCurrencyData(date: string, currency: string) {
    const result: Api = (await fetchApiCurrency(date, currency)) as Api;
    setCurrencyData((prevData) => ({ ...prevData, [currency]: result }));
    return result;
  }

  useEffect(() => {
    async function multLekerdezes(currency: string, ism: number) {
      let rates: { rate: any; date: string }[] = [];
      let date = new Date();
      date.setDate(date.getDate() - ism);
      for (let i = 0; i < ism; i++) {
        date.setDate(date.getDate() + 1);
        let dateString = date.toISOString().split("T")[0];
        let data: any = await fetchCurrencyData(dateString, currency);
        rates.push({ rate: data.changes.huf, date: dateString });
      }
      setExchangeRates((prevRates) => ({ ...prevRates, [currency]: rates }));
    }

    currencys.forEach((currency) => {
      fetchCurrencyData("2025-02-24", currency);
      multLekerdezes(currency, days);
    });
  }, []);

  const getCardClass = (change: number) => {
    return change >= 0 ? "positive" : "negative";
  };

  const getChangePercentage = (today: number, yesterday: number) => {
    return (((today - yesterday) / yesterday) * 100).toFixed(2);
  };

  const handleCardClick = (currency: string) => {
    setSelectedCurrency((prevCurrency) =>
      prevCurrency === currency ? null : currency
    );
  };

  return (
    <>
      <main className="changes-main-unique">
        <section className="changes-section-unique">
          <h2>Árfolyamok</h2>
          <ChangesCardSection
            currencys={currencys}
            currencyData={currencyData}
            exchangeRates={exchangeRates}
            getChangePercentage={getChangePercentage}
            getCardClass={getCardClass}
            getIconClass={getIconClass}
            handleCardClick={handleCardClick}
          />
        </section>
        {selectedCurrency ? (
          <section className="diagramLineChart" key={selectedCurrency}>
            <h2>{selectedCurrency.toUpperCase()} diagram</h2>
            <p>
              Itt látod a(z) {selectedCurrency.toUpperCase()} árfolyam
              diagramját.
            </p>
            {exchangeRates[selectedCurrency] &&
            exchangeRates[selectedCurrency].length > 0 ? (
              <LineChart
                exchangeRates={exchangeRates[selectedCurrency]}
                ism={days}
                currency={selectedCurrency}
              />
            ) : (
              <p>Loading data...</p>
            )}
          </section>
        ) : (
          <>
            <section className="diagram"></section>
            <section className="diagramCominedChart">
              <h2>Összesítet diagram</h2>
              <p>Itt látod az összes árfolyamot egy diagramban.</p>
              {Object.keys(exchangeRates).length > 0 ? (
                <CombinedLineChart exchangeRates={exchangeRates} ism={days} />
              ) : (
                <p>Loading data...</p>
              )}
            </section>
            {currencys.map((currency) => (
              <section className="diagramLineChart" key={currency}>
                <h2>{currency.toUpperCase()} diagram</h2>
                <p>
                  Itt látod a(z){currency.toUpperCase()} árfolyam diagramját.
                </p>
                {exchangeRates[currency] &&
                exchangeRates[currency].length > 0 ? (
                  <LineChart
                    exchangeRates={exchangeRates[currency]}
                    ism={days}
                    currency={currency}
                  />
                ) : (
                  <p>Loading data...</p>
                )}
              </section>
            ))}
          </>
        )}
      </main>
    </>
  );
};

export default Changes_Page;
