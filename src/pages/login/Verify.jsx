import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verify_url, api_url } from "../../config/env";
import { MyAccountContext } from "../../context/AccountContext";
import img1 from "../../assets/imgs/theme/logo.jpeg";
import { intBranchID } from "../../branch/Branch";

export const Verify = () => {
  const { userId, setUserId } = useContext(MyAccountContext);
  const [pinValues, setPinValues] = useState(["", "", "", "", "", ""]); // State to store pin values
  const navigate = useNavigate();
  const { state } = useLocation();
  const userPhone = state && state.userPhone;

  const handlePinChange = (index, value) => {
    // Check if the value is numeric and not empty
    if (/^\d+$/.test(value)) {
      const newPinValues = [...pinValues];
      newPinValues[index] = value;
      setPinValues(newPinValues);
      if (index < 5) {
        document.getElementById(`pinInput${index + 1}`).focus();
      }
    }
  };

  const handleVerifyCode = async () => {
    const enteredPin = pinValues.join("");
    const formData = new FormData();
    formData.append("strUserName", userPhone);
    formData.append("strValidCode", enteredPin);

    try {
      // Make an API request using Fetch
      const response = await fetch(`${verify_url}&intBranchID=${intBranchID}`, {
        method: "POST",
        body: formData,
      });

      setPinValues(["", "", "", "", "", ""]);

      document.getElementById("pinInput0").focus();

      if (enteredPin.length === pinValues.length) {
        if (response.ok) {
          const responseData = await response.json();
          const userRollId = responseData["data"]["intRoleID"];
          const UserId = responseData["data"]["intUserID"];
          localStorage.setItem("userId", UserId);
          localStorage.setItem("roleId", userRollId);
          setUserId(UserId);
          console.log("role id", userRollId);
          console.log("user id ", userId);

          const response1 = await fetch(
            `${api_url}&intBranchID=${intBranchID}&tag=get_users&intID=${UserId}`
          );
          if (response1.ok) {
            const res = await response1.json();
            // console.log("dddddd", res);
            if (
              res.data[0]?.strFullName === "" ||
              res.data[0]?.strFullName === null ||
              res.data[0]?.strFullName === undefined
            ) {
              navigate("/signUp");
            } else {
              navigate("/");
            }
            // console.log("user data", res.data[0]?.strFullName);
          }
        } else {
          // console.error("API Error:", response.status, response.statusText);
          // console.error("Error Details:");
          // Handle API error if needed
        }
      } else {
        console.error("Invalid pin length");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      // Handle fetch error if needed
    }
  };
  useEffect(() => {
    document.title = "HORECA SYSTEMS | Verify";
  });
  return (
    <>
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          <div className="breadcrumb">
            <a href="/" rel="nofollow">
              <i className="fi-rs-home mr-5"></i>Home
            </a>
            <span></span> Verify User
          </div>
        </div>
      </div>
      <input id="getphoneno" type="hidden" value="03014786408" />

      <form id="GOSignup" action="/signup"></form>

      <div className="page-content pt-150 pb-150">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
              <div className="row">
                <div className="col-lg-4 pr-30 d-none d-lg-block">
                  <img
                    className="border-radius-15"
                    style={{ width: "400px" }}
                    src={img1}
                    alt=""
                  />
                </div>
                <div className="col-lg-8 col-md-8">
                  <div className="login_wrap widget-taber-content background-white ">
                    <div className="padding_eight_all bg-white">
                      <div className="heading_s1">
                        <h1 className="mb-30">Enter Verification Code</h1>
                      </div>
                      <div
                        className="row w-100"
                        style={{ backgroundColor: "rgb(255, 255, 255)" }}
                      >
                        <div className="pincode-input-container">
                          {pinValues.map((value, index) => (
                            <input
                              key={index}
                              type="password"
                              maxLength="1"
                              autoComplete="off"
                              required
                              id={`pinInput${index}`}
                              className={`form-control pincode-input-text ${
                                index === 0
                                  ? "first"
                                  : index === 5
                                  ? "last"
                                  : "mid"
                              }`}
                              value={value}
                              onChange={(e) =>
                                handlePinChange(index, e.target.value)
                              }
                            />
                          ))}
                          <div className="text-danger pincode-input-error"></div>
                        </div>

                        <button
                          id="code-verify-btn"
                          type="button"
                          className="btn btn-heading btn-block hover-up pin-sub"
                          onClick={handleVerifyCode}
                        >
                          Submit
                        </button>
                      </div>
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
