import { useNavigate } from "react-router-dom";
import img1 from "../../assets/imgs/theme/logo.jpeg";
import { useState } from "react";
import { user_register } from "../../config/env";

export const SignUp = () => {
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const [Token, setToken] = useState();
  const [formData, setFormData] = useState({
    useremail: "",
    password: "",
    fullname: "",
    email: "",
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

  const handleButtonClick = async () => {
    try {
      // Append additional parameters to FormData
      let data = new FormData();
      data.append("strUserName", formData.useremail);
      data.append("strPassword", formData.password);
      data.append("strFullName", formData.fullname);
      data.append("strEmail", formData.email);
      data.append("strPhone", formData.phone);
      data.append("intBranchID", "1");
      data.append("intCompanyID", "1");
      data.append("strPlatform", "Web");

      // Send a POST request to the server
      const response = await fetch(`${user_register}&tag=user_register`, {
        method: "POST",
        body: data,
      });

      // Check if the response is successful (status code 2xx)
      if (response.ok) {
        // Parse the response data as JSON
        const responseData = await response.json();

        // Extract the user token from the response data
        const userToken = responseData?.data?.strToken;

        navigate(`/veri?token=${encodeURIComponent(userToken)}`);
      } else {
        // Handle the case where the response is not OK (status code is not 2xx)
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error:", error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      useremail: "",
      password: "",
      fullname: "",
      email: "",
      phone: "",
    });
    setFormErrors({});
  };

  return (
    <>
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          <div className="breadcrumb">
            <a href="/" rel="nofollow">
              <i className="fi-rs-home mr-5"></i>Home
            </a>
            <span></span> Signup
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
            <div className="row">
              <div
                className="col-lg-6 pr-30 d-none d-lg-block"
                style={{ padding: "100px" }}
              >
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
                      <div className="form-group col-md-12">
                        <label>
                          Name <span className="required">*</span>
                        </label>
                        <div className="form-group">
                          <input
                            type="fullname"
                            required
                            name="fullname"
                            placeholder="Enter your Full Name"
                            id="fullname"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-12">
                        <label>
                          UserEmail <span className="required">*</span>
                        </label>
                        <div className="form-group">
                          <input
                            type="useremail"
                            required
                            name="useremail"
                            placeholder="Enter your User email"
                            id="useremail"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-12">
                        <label>
                          Password <span className="required">*</span>
                        </label>
                        <div className="form-group">
                          <input
                            type="password"
                            required
                            name="password"
                            placeholder="Enter your password"
                            id="password"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-12">
                        <label>
                          Email <span className="required">*</span>
                        </label>
                        <div className="form-group">
                          <input
                            type="email"
                            required
                            name="email"
                            placeholder="Enter your email"
                            id="email"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="form-group col-md-12">
                        <label>
                          Phone <span className="required">*</span>
                        </label>
                        <div className="form-group">
                          <input
                            type="phone"
                            required
                            name="phone"
                            placeholder="Enter your Phone"
                            id="phone"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-12">
                        <button
                          id="submit-form-btn"
                          type="button"
                          className="btn btn-fill-out submit font-weight-bold btnsignup"
                          name="submit"
                          value="Submit"
                          onClick={handleButtonClick}
                        >
                          Create Account
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
