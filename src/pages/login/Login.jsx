import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/imgs/theme/about.jpeg";
import { login_proces } from "../../config/env";
import { BranchID } from "../../branch/branch";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  //   const handleInputChange = (event) => {
  //     const { name, value } = event.target;
  //     if (name === "email") {
  //       setEmail(value);
  //     } else if (name === "password") {
  //       setPassword(value);
  //     }
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    if (!email || !emailPattern.test(email)) {
      alert("Please enter a valid Gmail address.");
      return;
    }
    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }

    try {
      const response = await fetch(
        `${login_proces}&tag=user_login&strUserName=${email}&strPassword=${password}&intBranchID=${BranchID}&strPlatform=Web`
      );

      const data = await response.json();

      if (response.ok) {
        if (data.status === "0") {
          setErrorMessage("Email/Password not Correct Please Check it");
        } else {
          localStorage.setItem("userId", data?.data?.intUserID);
          localStorage.setItem("strToken", data?.data?.strToken);
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
                    src={img1}
                    alt=""
                  />
                </div>

                <div className="col-lg-6 col-md-8">
                  <div className="login_wrap widget-taber-content background-white">
                    <div className="padding_eight_all bg-white">
                      <div className="heading_s1">
                        <h1 className="mb-5">Login</h1>
                        <p className="mb-30">
                          New User Create account?
                          <a
                            href="/signUp"
                            style={{
                              fontSize: "20px",
                              color: "Green;",
                              textDecoration: "underline",
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
                        <div className="login_footer form-group">
                          <div className="chek-form">
                            <input
                              type="text"
                              required=""
                              name="email"
                              placeholder="Security code *"
                            />
                          </div>
                          <span className="security-code">
                            <b className="text-new">8</b>
                            <b className="text-hot">6</b>
                            <b className="text-sale">7</b>
                            <b className="text-best">5</b>
                          </span>
                        </div>
                        <div className="login_footer form-group mb-50">
                          <div className="chek-form">
                            <div className="custome-checkbox">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="checkbox"
                                id="exampleCheckbox1"
                                value=""
                              />
                              <label
                                className="form-check-label"
                                htmlFor="exampleCheckbox1"
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

// import { useState, useEffect } from "react";

// import { register_url } from "../../config/env";
// import { useNavigate } from "react-router-dom";
// import img1 from "../../assets/imgs/theme/about.jpeg";
// import { intBranchID } from "../../branch/Branch";

// export const Login = () => {
//   const [userPhone, setUserPhone] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();
//   useEffect(() => {
//     document.title = "HORECA SYSTEMS | login";
//   });
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (userPhone.length === 12 || userPhone.length === 11) {
//       try {
//         // Create a new FormData object
//         const formData = new FormData();

//         formData.append("strUserName", userPhone);
//         formData.append("intDeviceType", "2");
//         formData.append("strPlatform", "iOS version 12");

//         const response = await fetch(
//           `${register_url}&intBranchID=${intBranchID}`,
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         if (response.ok) {
//           navigate("/verify", { state: { userPhone } });
//           setUserPhone("");
//           setErrorMessage("");
//         } else {
//           const errorData = await response.json().catch(() => null);
//           console.error(
//             "Error Details:",
//             errorData || "No error details available"
//           );
//         }
//       } catch (error) {
//         console.error("Fetch Error:", error);
//       }
//     } else {
//       setErrorMessage(
//         "Please enter a valid 12-digit phone number. like 923001234567"
//       );
//     }
//   };

//   const handleInputChange = (event) => {
//     const value = event.target.value;
//     if (!isNaN(value)) {
//       setUserPhone(value);
//       if (value.length === 12 || value.length === 11) {
//         setErrorMessage("");
//       }
//     } else {
//       setErrorMessage("Please enter numeric digits only.");
//     }
//   };

//   return (
//     <>
//       <div className="page-header breadcrumb-wrap">
//         <div className="container">
//           <div className="breadcrumb">
//             <a href="/" rel="nofollow">
//               <i className="fi-rs-home mr-5"></i>Home
//             </a>
//             <span></span> Login
//           </div>
//         </div>
//       </div>
//       <div className="page-content pt-150 pb-150">
//         <div className="container">
//           <div className="row">
//             <div className="col-xl-8 col-lg-11 col-md-12 m-auto">
//               <div className="row">
//                 <div className="col-lg-6 pr-30 d-none d-lg-block">
//                   <img
//                     className="border-radius-15"
//                     style={{ width: "400px" }}
//                     src={img1}
//                     alt=""
//                   />
//                 </div>
//                 <div className="col-lg-6 col-md-8">
//                   <div className="login_wrap widget-taber-content background-white">
//                     <div className="padding_eight_all bg-white">
//                       <div className="heading_s1">
//                         <h1 className="mb-5" style={{ color: "#765550" }}>
//                           Login
//                         </h1>
//                       </div>
//                       <form
//                         id="userphone_frm"
//                         action="/verify"
//                         onSubmit={handleSubmit}
//                       >
//                         <div className="form-group">
//                           <input
//                             type="text"
//                             required
//                             name="user_phone"
//                             placeholder="923000000000 *"
//                             id="user_phone"
//                             value={userPhone}
//                             maxLength="12"
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                         {errorMessage && (
//                           <p style={{ color: "red" }}>{errorMessage}</p>
//                         )}
//                         <div className="form-group">
//                           <button
//                             type="submit"
//                             id="login-btn"
//                             className="btn btn-heading btn-block hover-up btnLogin"
//                             style={{ background: "#765550" }}
//                           >
//                             Log in
//                           </button>
//                         </div>
//                       </form>
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
