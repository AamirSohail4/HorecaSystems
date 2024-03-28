/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./footer/Footer";
import { NewsLetterForm } from "./NewsLetterForm";
import { CopyRight } from "./footer/CopyRight";
import { useEffect } from "react";

export const DashboardLayout = () => {
  const userId = localStorage.getItem("userId");
  // const { userId } = useContext(MyAccountContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || userId === null) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="app_layout">
      <Navbar />
      <Outlet />
      <NewsLetterForm />
      <footer className="main">
        <Footer />
        <CopyRight />
      </footer>
    </div>
  );
};
