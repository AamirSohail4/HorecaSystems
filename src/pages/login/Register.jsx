import { useState } from "react";
import img1 from "../../assets/imgs/theme/logo.jpeg";
import { useNavigate } from "react-router-dom";
import { login_proces } from "../../config/env";

export const Register = () => {
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
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

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    const phonePattern = /^0\d{10}$/;

    // Validate formData.useremail
    if (!formData.useremail || !emailPattern.test(formData.useremail)) {
      alert("Please enter a valid Gmail address.");
      return;
    }
    // Validate formData.email
    if (!formData.email || !emailPattern.test(formData.email)) {
      alert("Please enter a valid Gmail address.");
      return;
    }
    // Check if the phone number matches the pattern
    if (!formData.phone || !phonePattern.test(formData.phone)) {
      alert("Please enter a valid 11-digit phone number starting with 0.");
      return;
    }

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
      const response = await fetch(`${login_proces}&tag=user_register`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        // Parse the response data as JSON
        const responseData = await response.json();
        console.log("Response", responseData);
        alert("Thank you For Registering P Verify Your Email");
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
                            <label htmlFor="email">
                              Email <span className="required">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              name="email"
                              placeholder="Enter your email"
                              id="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="phone">
                              Phone <span className="required">*</span>
                            </label>
                            <input
                              type="tel"
                              required
                              name="phone"
                              placeholder="Enter your Phone"
                              id="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                            <small>Format: 03012345678</small>
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

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api_url } from "../../config/env";
// import img1 from "../../assets/imgs/theme/logo.jpeg";
// import { singUp_url } from "../../config/env";
// import { intBranchID } from "../../branch/Branch";

// export const Register = () => {
//   const userId = localStorage.getItem("userId");
//   const roleId = localStorage.getItem("roleId");
//   const [formErrors, setFormErrors] = useState({});
//   const [locatCities, setCities] = useState([]);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setFormErrors({ ...formErrors, [name]: "" });
//   };

//   const handleButtonClick = async () => {
//     const errors = {};

//     // Validate name field

//     if (!formData.firstName.trim()) {
//       errors.firstName = "Name is required";
//     } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName.trim())) {
//       errors.firstName = "Only alphabetic characters are allowed";
//     }

//     if (!formData.lastName.trim()) {
//       errors.lastName = "Name is required";
//     } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName.trim())) {
//       errors.lastName = "Only alphabetic characters are allowed";
//     }

//     // Validate name field

//     // Validate phone field
//     if (!/^\d{11,12}$/.test(formData.phone)) {
//       errors.phone = "Phone must be 11 or 12 digits like 923014788965";
//     }

//     // Validate email field
//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Invalid email address";
//     }

//     // Validate city field
//     if (!formData.city) {
//       errors.city = "City is required";
//     }

//     // Validate address field
//     if (!formData.address.trim()) {
//       errors.address = "Address is required";
//     }

//     if (Object.keys(errors).length > 0) {
//       // If there are errors, update the state and prevent form submission
//       setFormErrors(errors);
//       return;
//     }

//     let data = new FormData();
//     data.append("intUserID", userId);
//     data.append("strFullName", formData.firstName + " " + formData.lastName);
//     data.append("intRoleID", roleId);
//     data.append("strEmail", formData.email);
//     data.append("strAddress", formData.address);
//     data.append("intCityID", formData.city);
//     data.append("strAlternateContactNo", formData.phone);
//     const response = await fetch(
//       `${singUp_url}&intBranchID=${intBranchID}&tag=update_user_profile_web`,
//       {
//         method: "POST",
//         body: data,
//       }
//     );
//     if (response.ok) {
//       navigate("/");
//       resetForm();
//     }
//   };

//   useEffect(() => {
//     document.title = "HORECA SYSTEMS | SingUp";
//     const fetchCities = async () => {
//       try {
//         const response = await fetch(
//           `${api_url}&intBranchID=${intBranchID}&tag=get_city&intCountryID=1`
//         );
//         const data = await response.json();

//         setCities(data.data);
//       } catch (error) {
//         console.error("Error fetching city data:", error);
//       }
//     };

//     fetchCities();
//   }, []);

//   const resetForm = () => {
//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       address: "",
//       city: "",
//     });
//     setFormErrors({});
//   };

//   return (
//     <>
//       <div className="page-header breadcrumb-wrap">
//         <div className="container">
//           <div className="breadcrumb">
//             <a href="/" rel="nofollow">
//               <i className="fi-rs-home mr-5"></i>Home
//             </a>
//             <span></span> Signup
//           </div>
//         </div>
//       </div>

//       <div className="container">
//         <div className="row">
//           <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
//             <div className="row">
//               <div
//                 className="col-lg-6 pr-30 d-none d-lg-block"
//                 style={{ padding: "100px" }}
//               >
//                 <img
//                   className="border-radius-15"
//                   style={{ width: "400px" }}
//                   src={img1}
//                   alt=""
//                 />
//               </div>
//               <div className="col-lg-6 col-md-8">
//                 <div className="login_wrap widget-taber-content background-white">
//                   <div className="padding_eight_all bg-white">
//                     <div className="heading_s1">
//                       <h1 className="mb-5">Customer Account</h1>
//                     </div>
//                     <div className="row">
//                       <div className="form-group col-md-12">
//                         <label>
//                           First Name <span className="required">*</span>
//                         </label>
//                         <input
//                           name="firstName"
//                           required=""
//                           className={`form-control ${
//                             formErrors.firstName ? "is-invalid" : ""
//                           }`}
//                           placeholder="Enter First Name"
//                           type="text"
//                           value={formData.firstName}
//                           onChange={handleInputChange}
//                         />
//                         {formErrors.firstName && (
//                           <div className="invalid-feedback">
//                             {formErrors.firstName}
//                           </div>
//                         )}
//                       </div>
//                       <div className="form-group col-md-12">
//                         <label>
//                           Last Name <span className="required">*</span>
//                         </label>
//                         <input
//                           name="lastName"
//                           required=""
//                           className={`form-control ${
//                             formErrors.lastName ? "is-invalid" : ""
//                           }`}
//                           placeholder="Enter Last Name"
//                           type="text"
//                           value={formData.lastName}
//                           onChange={handleInputChange}
//                         />
//                         {formErrors.lastName && (
//                           <div className="invalid-feedback">
//                             {formErrors.lastName}
//                           </div>
//                         )}
//                       </div>
//                       <div className="form-group col-md-12">
//                         <label>
//                           Email <span className="required">*</span>
//                         </label>
//                         <input
//                           name="email"
//                           required=""
//                           className={`form-control ${
//                             formErrors.email ? "is-invalid" : ""
//                           }`}
//                           placeholder="Enter Email"
//                           type="email"
//                           value={formData.email}
//                           onChange={handleInputChange}
//                         />
//                         {formErrors.email && (
//                           <div className="invalid-feedback">
//                             {formErrors.email}
//                           </div>
//                         )}
//                       </div>
//                       <div className="form-group col-md-12">
//                         <label>
//                           Phone Number <span className="required">*</span>
//                         </label>
//                         <input
//                           name="phone"
//                           maxLength="12"
//                           className={`form-control ${
//                             formErrors.phone ? "is-invalid" : ""
//                           }`}
//                           placeholder="Enter Phone Number"
//                           type="number"
//                           value={formData.phone}
//                           onChange={handleInputChange}
//                         />
//                         {formErrors.phone && (
//                           <div className="invalid-feedback">
//                             {formErrors.phone}
//                           </div>
//                         )}
//                       </div>
//                       <div className="form-group col-md-12">
//                         <label>
//                           Address <span className="required">*</span>
//                         </label>
//                         <input
//                           name="address"
//                           required=""
//                           className={`form-control ${
//                             formErrors.address ? "is-invalid" : ""
//                           }`}
//                           placeholder="Enter address"
//                           type="address"
//                           value={formData.address}
//                           onChange={handleInputChange}
//                         />
//                         {formErrors.address && (
//                           <div className="invalid-feedback">
//                             {formErrors.address}
//                           </div>
//                         )}
//                       </div>

//                       <div className="form-group col-md-12">
//                         <label>
//                           City<span className="required">*</span>
//                         </label>
//                         <select
//                           className={`form-control ${
//                             formErrors.city ? "is-invalid" : ""
//                           }`}
//                           name="city"
//                           id="city"
//                           value={formData.city}
//                           onChange={handleInputChange}
//                         >
//                           {/* Placeholder option */}
//                           <option value="" disabled>
//                             Select a city
//                           </option>
//                           {/* Map through cities to create options */}
//                           {locatCities.map((pakCity, index) => (
//                             <option key={index} value={pakCity.intID}>
//                               {pakCity.strDesc}
//                             </option>
//                           ))}
//                         </select>
//                         {formErrors.city && (
//                           <div className="invalid-feedback">
//                             {formErrors.city}
//                           </div>
//                         )}
//                       </div>
//                       <div className="form-group col-md-12">
//                         <button
//                           id="submit-form-btn"
//                           type="button"
//                           className="btn btn-fill-out submit font-weight-bold btnsignup"
//                           name="submit"
//                           value="Submit"
//                           onClick={handleButtonClick}
//                         >
//                           Create Account
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
