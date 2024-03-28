import { useContext, useEffect } from "react";

import { AddressContext } from "../../context/AddresContext";
import he from "he";
import { NewsLetterForm } from "../../layouts/NewsLetterForm";
export const About = () => {
  const { about } = useContext(AddressContext);
  useEffect(() => {
    document.title = "HORECA SYSTEMS | About";
  });

  const decodedHTML = he.decode(about?.strBody || "");
  const decodedString = he.decode(decodedHTML);

  return (
    <>
      <main className="main">
        <div className="page-header breadcrumb-wrap">
          <div className="container">
            <div className="breadcrumb">
              <a href="/" rel="nofollow">
                <i className="fi-rs-home mr-5"></i>Home
              </a>
              <span></span> About us
            </div>
          </div>
        </div>
        <div className="page-content pt-50">
          <div className="container">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                <section className="row align-items-center mb-50">
                  <div className="col-lg-6">
                    <img
                      className="border-radius-15"
                      style={{ width: "400px" }}
                      src={about?.strHeaderImagePath}
                      alt=""
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="pl-25">
                      {" "}
                      <div
                        style={{ color: "brown" }}
                        dangerouslySetInnerHTML={{
                          __html: decodedString,
                        }}
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <NewsLetterForm />
    </>
  );
};
