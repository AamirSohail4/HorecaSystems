/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./footer/Footer";
import { CopyRight } from "./footer/CopyRight";
import { MyAccountContext } from "../context/AccountContext";
import { useContext } from "react";
import loadingGif from "../assets/imgs/banner/loading.gif";

export const FrontendLayout = () => {
  const { loading } = useContext(MyAccountContext);
  return (
    <>
      {loading ? (
        <div className="loading-indicator">
          <img src={loadingGif} alt="Loading..." />
        </div>
      ) : (
        <div className="app_layout">
          <Navbar />
          <Outlet />
          <footer className="main">
            <Footer />
            <CopyRight />
          </footer>
        </div>
      )}
    </>
  );
};
