import { useEffect, useState } from "react";
import img1 from "../../assets/imgs/theme/logo.jpeg";
import { useNavigate } from "react-router-dom";
import { login_proces,city_url } from "../../config/env";
import {  intBranchID } from "../../branch/branch";

export const Register = () => {
  const [formErrors, setFormErrors] = useState({});
  const [locatCities, setCities] = useState([]);
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  const generateCaptcha = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const [captcha, setCaptcha] = useState(generateCaptcha());

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };
  useEffect(() => {
    document.title = "HORECA SYSTEMS | SingUp";
    const fetchCities = async () => {
      try {
        const response = await fetch(
          `${city_url}&tag=get_city&intCountryID=1`
        );
        const data = await response.json();
        console.log("data of City",data)
        setCities(data.data);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    fetchCities();
  }, []);
  const [formData, setFormData] = useState({
    useremail: "",
    password: "",
    c_password: "",
    fullname: "",
    address: "",
    city: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors({ ...formErrors, [name]: "" });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const phonePattern = /^0\d{10}$/;

    // Validate formData.useremail
    if (!formData.useremail || !emailPattern.test(formData.useremail)) {
      alert("Please enter a valid Gmail address.");
      return;
    }

    // Check if the phone number matches the pattern
    if (!formData.phone || !phonePattern.test(formData.phone)) {
      alert("Please enter a valid 11-digit phone number starting with 0.");
      return;
    }

    // Check if password and confirm password match
    if (formData.password !== formData.c_password) {
      alert("Password and confirm password do not match.");
      return;
    }

    // Check if CAPTCHA input matches the generated CAPTCHA
    // Validate CAPTCHA input
    if (userInput !== captcha.toString()) {
      alert("Incorrect CAPTCHA. Please try again.");
      setCaptcha(generateCaptcha()); // Reset captcha
      setUserInput(""); // Clear user input
      return;
    }

    try {
      // Append additional parameters to FormData
      let data = new FormData();
      data.append("strUserName", formData.useremail);
      data.append("strPassword", formData.password);
      data.append("strFullName", formData.fullname);
      data.append("strEmail", formData.useremail);
      data.append("strPhone", formData.phone);
      data.append("strAddress", formData.address);
      data.append("intCityID", formData.city);
      data.append("intBranchID", intBranchID);
      data.append("intCompanyID", "1");
      data.append("strPlatform", "Web");

      // Send a POST request to the server
      const response = await fetch(`${login_proces}&tag=user_register`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        // Parse the response data as JSON
        const responseData = await response.json();
        console.log("Response", responseData);
        alert("Thank you For Registering Please Verify Your Email");
        const userToken = responseData?.data?.strToken;
        navigate(`/verify?token=${encodeURIComponent(userToken)}`);
      } else {
        console.error("Error:", response.statusText);
        alert("Registration failed. Please try again later.");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error:", error.message);
      alert("Registration failed. Please try again later.");
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
            <span></span> Registration
          </div>
        </div>
      </div>
      <div className="page-content pt-150 pb-150">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
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
                        <h1 className="mb-5">Customer Account</h1>
                      </div>
                      <div className="row">
                        <form onSubmit={handleFormSubmit}>
                          <div className="form-group col-md-12">
                            <label htmlFor="fullname">
                              Name <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              name="fullname"
                              placeholder="Enter your Full Name"
                              id="fullname"
                              value={formData.fullname}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="useremail">
                              User Email <span className="required">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              name="useremail"
                              placeholder="Enter your User Email"
                              id="useremail"
                              value={formData.useremail}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="password">
                              Password <span className="required">*</span>
                            </label>
                            <input
                              type="password"
                              required
                              name="password"
                              placeholder="Enter your password"
                              id="password"
                              value={formData.password}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="c_password">
                              Confirm Password{" "}
                              <span className="required">*</span>
                            </label>
                            <input
                              type="password"
                              required
                              name="c_password"
                              placeholder="Enter your password"
                              id="c_password"
                              value={formData.c_password}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="form-group col-md-12">
                          <label>
                          Phone Number <span className="required">*</span>
                         </label>
                         <input
                           name="phone"
                          maxLength="12"
                          className={`form-control ${
                           formErrors.phone ? "is-invalid" : ""
                          }`}
                           placeholder="Enter Phone Number"
                          type="number"
                           value={formData.phone}
                           onChange={handleInputChange}
                         />
                            <small>Format: 03012345678</small>
                          </div>
                          <div className="form-group col-md-12">
                            <label>
                              City<span className="required">*</span>
                            </label>
                            <select
                              className={`form-control ${
                                formErrors.city ? "is-invalid" : ""
                              }`}
                              name="city"
                              id="city"
                              value={formData.city}
                              onChange={handleInputChange}
                            >
                              {/* Placeholder option */}
                              <option value="" disabled>
                                Select a city
                              </option>
                              {/* Map through cities to create options */}
                              {locatCities.map((pakCity, index) => (
                                <option key={index} value={pakCity.intID}>
                                  {pakCity.strDesc}
                                </option>
                              ))}
                            </select>
                            {formErrors.city && (
                              <div className="invalid-feedback">
                                {formErrors.city}
                              </div>
                            )}
                          </div>
                          <div className="form-group col-md-12">
                            <label>
                              Address <span className="required">*</span>
                            </label>
                            <input
                              name="address"
                              required=""
                              className="form-control"
                              placeholder="Enter address"
                              type="address"
                              value={formData.address}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="login_footer form-group Captcha">
                            <div className="chek-form">
                              <input
                                type="text"
                                required
                                name="captcha"
                                value={userInput}
                                onChange={handleChange}
                                placeholder="CAPTCHA  *"
                                maxLength="4"
                                min="1000"
                                max="9999"
                              />
                            </div>
                            <span className="security-code">{captcha}</span>
                          </div>
                          <div className="form-group col-md-12">
                            <button
                              type="submit"
                              className="btn btn-fill-out submit font-weight-bold btnsignup"
                            >
                              Create Account
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
      </div>
    </>
  );
};


