import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login_proces } from "../../config/env";
import { intBranchID } from "../../branch/branch";
import { AddressContext } from "../../context/AddresContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [userInput, setUserInput] = useState("");
  const { about } = useContext(AddressContext);
  const navigate = useNavigate();

  const generateCaptcha = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };
  const [captcha, setCaptcha] = useState(generateCaptcha());

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate email pattern
    if (!email || !emailPattern.test(email)) {
      alert("Please enter a valid Gmail address.");
      return;
    }

    // Validate presence of email and password
    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }

    // Validate CAPTCHA input
    if (userInput !== captcha.toString()) {
      alert("Incorrect CAPTCHA. Please try again.");
      setCaptcha(generateCaptcha()); // Reset captcha
      setUserInput(""); // Clear user input
      return;
    }

    try {
      const response = await fetch(
        `${login_proces}&tag=user_login&strUserName=${email}&strPassword=${password}&intBranchID=${intBranchID}&strPlatform=Web`
      );

      const data = await response.json();

      if (response.ok) {
        if (data.status === "0") {
          setErrorMessage("Email/Password not Correct Please Check it");
        } else {
        
          localStorage.setItem("userId", data?.data?.intUserID);
          localStorage.setItem("strToken", data?.data?.strToken);
          localStorage.setItem("customerId", data?.data?.intCustomerID);
          if (rememberMe) {
            // Check if "Remember Me" checkbox is checked
            // Set cookie for remembering the user
            document.cookie = `rememberedUser=${email};expires=${new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            )};path=/`;
          }
          navigate("/");
          window.location.reload(true);
          setEmail("");
          setPassword("");
        }
      } else {
        console.log("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log("Login failed. Please try again later.");
    }
  };

  useEffect(() => {
    document.title = "HORECA SYSTEMS | login";
  }, []);
  return (
    <>
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          <div className="breadcrumb">
            <a href="/" rel="nofollow">
              <i className="fi-rs-home mr-5"></i>Home
            </a>
            <span></span> Login
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
                    src={about?.strHeaderImagePath}
                    alt=""
                  />
                </div>

                <div className="col-lg-6 col-md-8">
                  <div className="login_wrap widget-taber-content background-white">
                    <div className="padding_eight_all bg-white">
                      <div className="heading_s1">
                        <h1
                          className="mb-5"
                          style={{
                            marginTop: "10px",
                            marginBottom: "3px",
                          }}
                        >
                          Login
                        </h1>
                        <p className="mb-30">
                          Don&#39;t have an account ?
                          <a
                            href="/signUp"
                            style={{
                              fontSize: "16px",
                              color: "Green",
                              textDecoration: "underline",
                              marginTop: "10px",
                              marginBottom: "5px",
                            }}
                          >
                            Create here
                          </a>
                        </p>
                      </div>
                      <form id="loginForm" onSubmit={handleSubmit}>
                        {errorMessage && (
                          <p style={{ fontSize: "20px", color: "red" }}>
                            {errorMessage}
                          </p>
                        )}

                        <div className="form-group">
                          <input
                            type="email"
                            required
                            name="email"
                            placeholder="Enter your email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            required
                            name="password"
                            placeholder="Enter your password "
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="login_footer form-group Captcha">
                          <div className="chek-form">
                            <input
                              type="text"
                              required
                              name="captcha"
                              value={userInput}
                              onChange={handleInputChange}
                              placeholder="CAPTCHA  *"
                              maxLength="4"
                              min="1000"
                              max="9999"
                            />
                          </div>
                          <span className="security-code">{captcha}</span>
                        </div>
                        <div className="login_footer form-group mb-50">
                          <div className="chek-form">
                            <div className="custome-checkbox">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="rememberMe"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="rememberMe"
                              >
                                <span>Remember me</span>
                              </label>
                            </div>
                          </div>
                          <a className="text-muted" href="#">
                            Forgot password?
                          </a>
                        </div>
                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn btn-heading btn-block hover-up"
                            name="login"
                            style={{ backgroundColor: "#7e3829" }}
                          >
                            Log in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* /** */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
