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
        <div className="changes-container">
          <h2>Changes</h2>
        </div>
    </>
  );
};

export default Changes_Page;