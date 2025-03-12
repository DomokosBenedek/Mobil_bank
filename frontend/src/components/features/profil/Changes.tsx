import React, { useEffect, useState } from "react";
import { logicks } from "../../common/logic";
import LineChart from "../../common/charts/lineChart";
import CombinedLineChart from "../../common/charts/combinedLineChart";
import ChangesCardSection from "../../ChangesCardSection";
import { Api } from "../../Props/ApiProp";
import "../../../design/profil_page_element/changes.css";

const Changes_Page = () => {
  const { fetchApiEur, fetchApiUsd } = logicks();

  const currencys = ["eur", "usd"];

  const [eurData, setEurData] = React.useState<any>(null);
  const [usdData, setUsdData] = React.useState<any>(null);

  const [eurExchangeRates, setEurExchangeRates] = useState<{ rate: any; date: string; }[]>([]);
  const [usdExchangeRates, setUsdExchangeRates] = useState<{ rate: any; date: string; }[]>([]);

  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const getIconClass = (change: number) => {
    return change >= 0 ? 'rotate-left' : 'rotate-right';
  };

  async function eurApi(date: string) {
    const eurResult: Api = (await fetchApiEur(date)) as Api;
    setEurData(eurResult);
    return eurResult;
  };

  async function usdApi(date: string) {
    const usdResult: Api = (await fetchApiUsd(date)) as Api;
    setUsdData(usdResult);
    return usdResult;
  };

  useEffect(() => {
    async function multLekerdezesEur(ism: number) {
      let rates: { rate: any; date: string }[] = [];
      let date = new Date();
      date.setDate(date.getDate() - ism);
      for (let i = 0; i < ism; i++) {
        date.setDate(date.getDate() + 1);
        let dateString = date.toISOString().split('T')[0];
        let data: any = await eurApi(dateString);
        rates.push({ rate: data.changes.huf, date: dateString });
      }
      setEurExchangeRates(rates);
    }
    async function multLekerdezesUsd(ism: number) {
      let rates: { rate: any; date: string }[] = [];
      let date = new Date();
      date.setDate(date.getDate() - ism);
      for (let i = 0; i < ism; i++) {
        date.setDate(date.getDate() + 1);
        let dateString = date.toISOString().split('T')[0];
        let data: any = await usdApi(dateString);
        rates.push({ rate: data.changes.huf, date: dateString });
      }
      setUsdExchangeRates(rates);
    }
    setEurExchangeRates([]);
    setUsdExchangeRates([]);
    eurApi("2025-02-24");
    usdApi("2025-02-24");
    multLekerdezesEur(30);
    multLekerdezesUsd(30);
  }, []);

  useEffect(() => {
    console.log(eurExchangeRates);
  },[eurExchangeRates])

  const getCardClass = (change: number) => {
    return change >= 0 ? 'positive' : 'negative';
  };

  const getChangePercentage = (today: number, yesterday: number) => {
    return ((today - yesterday) / yesterday * 100).toFixed(2);
  };

  const handleCardClick = (currency: string) => {
    setSelectedCurrency(prevCurrency => prevCurrency === currency ? null : currency);
  };

  return (
    <>
      <main className="profile-main-changes">
        <section className="changes-container">
          <h2>Changes</h2>
          <p>Here you can see the changes of the currencies.</p>
          <ChangesCardSection
            currencys={currencys}
            eurData={eurData}
            usdData={usdData}
            eurExchangeRates={eurExchangeRates}
            usdExchangeRates={usdExchangeRates}
            getChangePercentage={getChangePercentage}
            getCardClass={getCardClass}
            getIconClass={getIconClass}
            handleCardClick={handleCardClick}
          />
        </section>
        {selectedCurrency === null && (
          <>
            <section className="changes-container">
              <h2>Combined EUR and USD Exchange Rates</h2>
              <div>
                <CombinedLineChart eurExchangeRates={eurExchangeRates} usdExchangeRates={usdExchangeRates} ism={30} />
              </div>
            </section>
            <section className="changes-container">
              <h2>Currency: EUR</h2>
              <div>
                <LineChart exchangeRates={eurExchangeRates} ism={30} currency="eur" />
              </div>
            </section>
            <section className="changes-container">
              <h2>Currency: USD</h2>
              <div>
                <LineChart exchangeRates={usdExchangeRates} ism={30} currency="usd" />
              </div>
            </section>
          </>
        )}
        {selectedCurrency === "eur" && (
          <section className="changes-container">
            <h2>Currency: EUR</h2>
            <div>
              <LineChart exchangeRates={eurExchangeRates} ism={30} currency="eur" />
            </div>
          </section>
        )}
        {selectedCurrency === "usd" && (
          <section className="changes-container">
            <h2>Currency: USD</h2>
            <div>
              <LineChart exchangeRates={usdExchangeRates} ism={30} currency="usd" />
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Changes_Page;