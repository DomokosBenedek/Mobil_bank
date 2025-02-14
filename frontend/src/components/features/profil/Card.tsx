import React from 'react';
import CostumeNavbar from "../../common/navbar";
import Sidebar from "./Sidebar";
import Footer from "../../common/Footer";
import { placeholderCard, placeholderIcon } from "../../common/img";
import { logicks } from "../../common/logic";


const Card_Page: React.FC = () => {
  const { user, loading, error, activeAccount } = logicks();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const userName: string = `${user?.firstName ?? ''}${user?.lastName ?? ''}`.trim();

  return (
    <>
        <div className="card-container">
          <h2>Active Card</h2>
          {activeAccount ? (
            <div>
              <p><strong>ID:</strong> {activeAccount.id}</p>
              <p><strong>Total:</strong> {activeAccount.total}</p>
              <p><strong>Currency:</strong> {activeAccount.currency}</p>
              <p><strong>Created At:</strong> {new Date(activeAccount.createdAt).toLocaleDateString()}</p>
              <p><strong>Updated At:</strong> {new Date(activeAccount.updatedAt).toLocaleDateString()}</p>
              <img src={placeholderCard} alt="Card image" className="card-image"/>
            </div>
          ) : (
            <p>No active account selected.</p>
          )}
        </div>
    </>
  );
};

export default Card_Page;