import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/imgs/theme/about.jpeg";
import { user_register } from "../../config/env";

import { useLocation } from "react-router-dom";

export const Veri = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the token from the URL parameters
  const token = new URLSearchParams(location.search).get("token");
  console.log("token is on the page of Verify Check it", token);
  useEffect(() => {
    document.title = "HORECA SYSTEMS | login";
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if email or password is empty
    if (!email) {
      return;
    }

    try {
      const response = await fetch(
        `${user_register}&tag=verify_user_email&t=${token}&u=${email}`
      );

      const data = await response.json();
      if (response.ok) {
        if (data.status === "0") {
          alert("Please Register Your Selef");
          navigate("/sig");
        } else {
          localStorage.setItem("userId", data?.data?.intUserID);
          localStorage.setItem("strToken", data?.data?.strToken);
          alert("Thanks For Verification Know you can Login ");
          navigate("/");
          setEmail("");
        }
      } else {
        console.log("gg");
      }
    } catch (error) {
      console.log("gg");
    }
  };
  return (
    <>
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          <div className="breadcrumb">
            <a href="/" rel="nofollow">
              <i className="fi-rs-home mr-5"></i>Home
            </a>
            <span></span> Verify Email
          </div>
        </div>
      </div>
      <div className="page-content pt-150 pb-150">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-11 col-md-12 m-auto">
              <div className="row">
                <div className="col-lg-6 pr-30 d-none d-lg-block">
                  <img
                    className="border-radius-15"
                    style={{ width: "400px" }}
                    src={img1}
                    alt=""
                  />
                </div>
                <div className="col-lg-6 col-md-8">
                  <div className="login_wrap widget-taber-content background-white">
                    <div className="padding_eight_all bg-white">
                      <div className="heading_s1">
                        <h1 className="mb-5" style={{ color: "#765550" }}>
                          VeriFy Email
                        </h1>
                      </div>
                      <form id="loginForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="email"
                            required
                            name="email"
                            placeholder="Enter your email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn btn-heading btn-block hover-up btnLogin"
                            style={{ background: "#765550" }}
                          >
                            Verify
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
