import "animate.css";
import { Link } from "react-router-dom";
import he from "he";

import { useContext } from "react";
import { AddressContext } from "../../context/AddresContext";

export const CopyRight = () => {
  const { copyRightText, socialLinks, socialLinksinsta } =
    useContext(AddressContext);
  const decodedHTML = he.decode(copyRightText?.strBody || "");
  const decodedString = he.decode(decodedHTML);

  return (
    <>
      <div
        className="container pb-30 wow animate__ animate__fadeInUp animated animate__animated animate__bounce"
        data-wow-delay="0"
        style={{
          visibility: "visible",
          animationDelay: "0.4s",
          animationName: "fadeInUp",
        }}
      >
        <div className="row align-items-center">
          <div className="col-12 mb-30">
            <div className="footer-bottom"></div>
          </div>
          <div className="col-xl-8 col-lg-6 col-md-6">
            <div
              style={{ color: "brown" }}
              dangerouslySetInnerHTML={{
                __html: decodedString,
              }}
            />
          </div>

          <div className="col-xl-4 col-lg-6 col-md-6 text-end d-none d-md-block">
            <div className="mobile-social-icon">
              <h6>{socialLinks?.strSummary}</h6>
              <Link to={socialLinks?.strLinkURL}>
                <img src={socialLinks?.strURL} alt="" />
              </Link>

              <Link to={socialLinksinsta?.strLinkURL}>
                <img src={socialLinksinsta?.strURL} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
