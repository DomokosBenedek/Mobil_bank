import React from 'react';
import CostumeNavbar from "../../components/common/navbar";
import Sidebar from "./Sidebar";
import Footer from "../../components/common/Footer";
import { logicks } from "../../components/common/logic";

const Changes_Page: React.FC = () => {
  const { user } = logicks();
  const userName: string = `${user?.firstName ?? ''}${user?.lastName ?? ''}`.trim();

  return (
    <>
      <header><CostumeNavbar /></header>
      <main className="profile-container">
        <Sidebar userName={userName} />
        <div className="changes-container">
          <h2>Changes</h2>
        </div>
      </main>
      <footer><Footer /></footer>
    </>
  );
};

export default Changes_Page;