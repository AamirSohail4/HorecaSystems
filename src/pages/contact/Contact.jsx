import { useContext } from "react";
import { MyAccountContext } from "../../context/AccountContext";
import he from "he";
import { NewsLetterForm } from "../../layouts/NewsLetterForm";

export const Contact = () => {
  const { contactInfo } = useContext(MyAccountContext);
  const decodedHTML = he.decode(contactInfo?.strBody || "");
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
              <span></span> Contact
            </div>
          </div>
        </div>
        <div className="page-content pt-50">
          <div className="container">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                <section className="mb-50">
                  <div className="row mb-60">
                    <p className="col-md-4"></p>

                    <div
                      style={{ color: "brown" }}
                      dangerouslySetInnerHTML={{
                        __html: decodedString,
                      }}
                    />

                    <div style={{ display: "flex" }}>
                      {/* <div style={{ paddingRight: "20px" }}>
                        <h6 style={{ color: "#7E7E7E" }}>Follow Us:</h6>
                      </div> */}
                      {/* <div className="mobile-social-icon">
                        <Link to="https://www.instagram.com/horecasystemspk/?igshid=148y4fpr7bxag">
                          <img
                            src="https://weberp.pk/app/msbooks/images/web_imageslist/42/icon-instagram-white.svg"
                            alt=""
                          />
                        </Link>
                        <Link to="https://www.facebook.com/HorecaSystemsPk/">
                          <img
                            src="https://www.weberp.pk/app/msbooks/images/web_imageslist/41/icon-facebook-white.svg"
                            alt=""
                          />
                        </Link>
                      </div> */}
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
