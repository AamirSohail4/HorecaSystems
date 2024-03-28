import { useContext } from "react";
import { AddressContext } from "../context/AddresContext";
import he from "he";

export const NewsLetterForm = () => {
  const { bannerText } = useContext(AddressContext);
  const decodedHTML = he.decode(bannerText?.strBodyPlain || "");
  const decodedString = he.decode(decodedHTML);

  return (
    <>
      <section
        className="newsletter mb-15 wow animate__ animate__fadeIn animated"
        style={{
          visibility: "visible",
          animationDelay: "0.4s",
          animationName: "fadeIn",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="position-relative newsletter-inner">
                <div className="newsletter-content">
                  <div
                    style={{ color: "white" }}
                    dangerouslySetInnerHTML={{
                      __html: decodedString,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
