import React from 'react';
import CostumeNavbar from "../../common/navbar";
import Sidebar from "./Sidebar";
import Footer from "../../common/Footer";
import { logicks } from "../../common/logic";

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