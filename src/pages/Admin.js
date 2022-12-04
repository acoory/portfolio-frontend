import React from "react";
import { FiSettings } from "react-icons/fi";
import { TiArrowBack } from "react-icons/ti";
import { MdWeb } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Config from "../components/config/Config";
import Projet from "../components/projet/Projet";

export default function Admin() {
  const [indexView, setIndexView] = React.useState(0);

  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="header"></div>
      <div className="content">
        <div className="container-settings">
          <div className="settings">
            <div
              className="container-icon-settings"
              onClick={() => navigate("/")}
            >
              <TiArrowBack size={30} color="#070707" />
            </div>
            <div
              className="container-icon-settings"
              onClick={() => setIndexView(1)}
            >
              <FiSettings size={30} color="#070707" />
            </div>
            <div
              className="container-icon-settings"
              onClick={() => setIndexView(2)}
            >
              <MdWeb size={30} color="#070707" />
            </div>
          </div>
        </div>
        <main>
          {indexView === 0 ? (
            <div>Dashboard</div>
          ) : indexView === 1 ? (
            <Config />
          ) : indexView === 2 ? (
            <Projet />
          ) : null}
        </main>
      </div>
    </div>
  );
}
