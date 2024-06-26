import { Link } from "react-router-dom";
import he from "he";
import { ScrollButton } from "./scrollbutton/ScrollButton";
import "./footer.css";
import { useContext, useEffect, useState } from "react";
import { cart_url } from "../../config/env";
import { MyAccountContext } from "../../context/AccountContext";

export const Footer = () => {
  const [footerCategory, setFooterCategory] = useState();
  const { contactInfo } = useContext(MyAccountContext);

  useEffect(() => {
    const DisplayCategory = async () => {
      const response = await fetch(`${cart_url}&tag=get_category_web&intCompanyID=1`);
      const mydata = await response.json();
      const mainData = mydata.data;
      // const filteredData = mainData.filter(
      //   (item) => item.intParentID === "0" && item.intLevel === "1"
      // );
      setFooterCategory(mainData);
    };
    DisplayCategory();
  }, []);
  const handleManuClick = (category_name) => {
    window.location.href = `/Category?cateogry_name=${category_name}`;
  };
  // function removeHtmlTags(htmlString) {
  //   return htmlString.replace(/<[^>]+>/g, "");
  // }

  const decodedHTML = he.decode(contactInfo?.strBody || "");
  const decodedString = he.decode(decodedHTML);

  return (
    <>
      <section className="section-padding footer-mid">
        <div className="arrowbtnbox">
          <ScrollButton />
        </div>
        <div className="container pt-15 pb-20">
          <div className="row">
            <div className="col">
              <div
                className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0 wow animate__ animate__fadeInUp animated  animated animate__animated animate__bounce"
                data-wow-delay="0"
                style={{
                  visibility: "visible",
                  animationDelay: "0.4s",
                  animationName: "fadeInUp",
                }}
              >
                <div className="logo mb-30">
                  <Link to="index.html" className="mb-15">
                    <img
                      src={contactInfo?.strHeaderImagePath}
                      // style={{ width: "50px", minWidth: "50px" }}
                      // alt="logo"
                    />
                  </Link>
                </div>
                <ul className="contact-infor">
                  <li>
                    <div style={{ color: "brown" }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: decodedString,
                        }}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="footer-link-widget col wow animate__ animate__fadeInUp animated animated animate__animated animate__bounce"
              data-wow-delay=".2s"
              style={{
                visibility: "visible",
                animationDelay: "0.6s",
                animationName: "fadeInUp",
              }}
            >
              <h4 className="widget-title">Our Website</h4>
              <ul className="footer-list mb-sm-5 mb-md-0">
                <li>
                  <Link to="/login">Sign in</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div
              className="footer-link-widget col wow animate__ animate__fadeInUp animated  animated animate__animated animate__bounce"
              data-wow-delay=".3s"
              style={{
                visibility: "visible",
                animationDelay: "0.7s",
                animationName: "fadeInUp",
              }}
            >
              <h4 className="widget-title">Products</h4>
              <ul className="footer-list mb-sm-5 mb-md-0">
                <li>
                  <Link to="/allProducts">AllProducts</Link>
                </li>
                {footerCategory?.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to="#" onClick={() => handleManuClick(item.strSEOLink)}>
                        {item.strDesc}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
           
          </div>
        </div>
      </section>
    </>
  );
};
