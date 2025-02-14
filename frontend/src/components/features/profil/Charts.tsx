import CostumeNavbar from "../../common/navbar";
import { Account } from "../../Props/AccountProp";
import { User } from "../../Props/UserProp";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Card from "../../common/Card";
import { Card_newCard } from "../../common/img";
import Footer from "../../common/Footer";
import PieChart from '../../common/charts/pieChart';
import BarChart from '../../common/charts/barChart';
import { logicks } from "../../common/logic";
import CardContextMenu from "../../common/ContextMenu";
import Table from "../../common/Table";

const Charts_Page: React.FC = () => {
  const { 
    user,
    loading,
    error,
    activeAccount,
    SetActiveAcountClick,
    addNewAccount,
    deleteAccount,
    addIncome,
    addExpense,
    addUserToAccount,
  } = logicks();

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; accountId: string } | null>(null);

  console.log('userId: ' + user?.id);
  console.log('activeAccountId: : ' + activeAccount?.id);
  console.log('token: ' + user?.access_token);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleRightClick = (event: React.MouseEvent, accountId: string) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, accountId });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <>
        <section className="cards-section">
          <div className="Title_row">
            <h3 className="Title">Cards</h3>
            <button className="primary_v3">View more</button>
          </div>
          <div className="sectionMain">
            <div className='cardList'>
              {user?.Accounts?.map((account, index) => {
                const isActive = activeAccount?.id === account.id;
                return (
                  <div key={account.id} className={`card ${isActive ? 'active' : ''}`} onClick={() => SetActiveAcountClick(account)} onContextMenu={(e) => handleRightClick(e, account.id)}>
                    <Card
                      id={'*'.repeat(account.id.length - 4) + account.id.slice(-4)}
                      number={index + 1}
                      total={account.total || 0}
                      currency={account.currency || "N/A"}
                      name={`${user.firstName} ${user.lastName}`}
                      date={new Date(account.createdAt).toLocaleDateString('hu-HU', { year: '2-digit', month: '2-digit' })}
                    />
                  </div>
                );
              })}
            <img src={Card_newCard} alt="NewCard" onClick={addNewAccount} />
            </div>
          </div>
        </section>

        {/*BarCharts Section */}
        <section className="diagram-section">
          <div className="Title_row">
            <h3 className="Title">Diagrams</h3>
            <button className="primary_v3">View more</button>
          </div>
          <div className="sectionMain">
            <PieChart key={activeAccount?.id} />
          </div>   
        </section>

        {/*PieCharts Section */}
        <section className="diagram-section">
          <div className="Title_row">
            <h3 className="Title">Diagrams</h3>
            <button className="primary_v3">View more</button>
          </div>
          <div className="sectionMain">
            <PieChart key={activeAccount?.id} />
          </div>   
        </section>
      {contextMenu && (
        <CardContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleCloseContextMenu}
          onDelete={() => deleteAccount(contextMenu.accountId)}
          onAddIncome={() => addIncome(contextMenu.accountId, 0)} // Replace 0 with actual amount
          onAddExpense={() => addExpense(contextMenu.accountId, 0)} // Replace 0 with actual amount
          onAddUser={() => addUserToAccount(contextMenu.accountId, '')} // Replace '' with actual userId
        />
      )}
    </>
  );
};

export default Charts_Page;