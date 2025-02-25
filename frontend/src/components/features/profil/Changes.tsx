import React, { useEffect, useState } from "react";
import { logicks } from "../../common/logic";
import LineChart from "../../common/charts/lineChart";
import { Api } from "../../Props/ApiProp";
import CostumeNavbar from "../../common/navbar";
import Footer from "../../common/Footer";
import "../../../design/profil_page_element/changes.css";

const Changes_Page = () => {
  const { fetchApiEur, fetchApiUsd } = logicks();

  const currencys = ["eur", "usd"];

  const [eurData, setEurData] = React.useState<any>(null);
  const [usdData, setUsdData] = React.useState<any>(null);

  const [eurExchangeRates, setEurExchangeRates] = useState<{ rate: any; date: string; }[]>([]);
  const [usdExchangeRates, setUsdExchangeRates] = useState<{ rate: any; date: string; }[]>([]);

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
      console.log(`elötte: ${eurExchangeRates}`);
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
      console.log(`utána: ${rates}`);
    }
    async function multLekerdezesUsd(ism: number) {
      console.log(`elötte: ${usdExchangeRates}`);
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
      console.log(`utána: ${rates}`);
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

  return (
    <>
    <header>
      <CostumeNavbar/>
    </header>
      <main className="profile-main-changes">
        <section className="changes-container">
          <h2>Changes</h2>
          <p>Here you can see the changes of the currencies.</p>
      {currencys.map((currency) => (
        <div key={currency} className="changes-cards">
          <h2>Currency: {currency.toUpperCase()}</h2>
          <div>
        <p>Date: {currency === "eur" ? eurData?.date : usdData?.date}</p>
        <p>Currency: {currency === "eur" ? eurData?.currency : usdData?.currency}</p>
        <p>Changes: {currency === "eur" ? eurData?.changes.huf : usdData?.changes.huf}</p>
          </div>
        </div>
      ))}
        </section>
      {currencys.map((currency) => (
        <section key={currency} className="changes-container">
          <h2>Currency: {currency.toUpperCase()}</h2>
          <div>
            <LineChart exchangeRates={currency === "eur" ? eurExchangeRates : usdExchangeRates} ism={30} currency={currency} />
          </div>
        </section>
      ))}
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
};

export default Changes_Page;
