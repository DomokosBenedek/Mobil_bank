import React from 'react';
import CostumeNavbar from "../../components/common/navbar";
import Sidebar from "./Sidebar";
import Footer from "../../components/common/Footer";
import { logicks } from "../../components/common/logic";
import PieChart from '../../components/common/charts/pieChart';
import BarChart from '../../components/common/charts/barChart';

const Card_Page: React.FC = () => {
  const { user, loading, error, activeAccount } = logicks();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const userName: string = `${user?.firstName ?? ''}${user?.lastName ?? ''}`.trim();

  return (
    <>
      <header><CostumeNavbar /></header>
      <main className="profile-container">
        <Sidebar/>
        <div className="card-container">
          <h2>Active Card</h2>
          {activeAccount ? (
            <div>
              <p><strong>ID:</strong> {activeAccount.id}</p>
              <p><strong>Total:</strong> {activeAccount.total}</p>
              <p><strong>Currency:</strong> {activeAccount.currency}</p>
              <p><strong>Created At:</strong> {new Date(activeAccount.createdAt).toLocaleDateString()}</p>
              <p><strong>Updated At:</strong> {new Date(activeAccount.updatedAt).toLocaleDateString()}</p>
              <PieChart key={activeAccount.id} />
              <BarChart key={activeAccount.id} />
            </div>
          ) : (
            <p>No active account selected.</p>
          )}
        </div>
      </main>
      <footer><Footer /></footer>
    </>
  );
};

export default Card_Page;