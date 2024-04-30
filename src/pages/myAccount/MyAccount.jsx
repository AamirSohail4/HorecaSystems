/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyAccountContext } from "../../context/AccountContext";
import {  cart_url, city_url } from "../../config/env";
import { WishListContext } from "../../context/WishListContext";
import { CartContext } from "../../context/CartContext";
import { report_url } from "../../config/env";
import {} from "../../redux/cartSlice";

import { AddressContext } from "../../context/AddresContext";
import { intBranchID } from "../../branch/branch";

export const MyAccount = () => {
  const { wishlistItems, deleteWishlist } = useContext(WishListContext);
  const { shipmentAddres,  deleteUserAddres } = useContext(AddressContext);
  const { userId ,customerId,strToken } = useContext(MyAccountContext);
  const { addProducts, orderItems } = useContext(CartContext);
  const [locatCities, setCities] = useState([]);
  const [selectedProductDesc, setSelectedProductDesc] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    // Main Section For  Customer Ledger 
    const fetchData = async () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const startOfYear = new Date(currentYear, 0, 1); // January is month 0
      const formattedCurrentDate = formatDate(currentDate);
      const formattedStartOfYear = formatDate(startOfYear);
  
      const url = `${report_url}&tag=show_report&intReportID=6&strToken=${strToken}`;
  
      const formData = new URLSearchParams();
      formData.append('intCustomerID', customerId);
      formData.append('dtDate',formattedStartOfYear );
      formData.append('dtDate2', formattedCurrentDate);
  
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      };
  
      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        setResponse(data?.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setResponse(null);
      }
    };

    const formatDate = (date) => {
      // Format date as 'YYYY-MM-DD'
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    //End Main Section Ledger
  const handleSectionClick = async (section) => {
    setActiveSection(section);
    if (section === "account") {
      // window.location.reload();
    }
  };

  const handleAddToCart = (productId, quantity, productDesc) => {
    addProducts(productId, quantity);
    setSelectedProductDesc(productDesc);
    setTimeout(() => {
      setSelectedProductDesc("");
    }, 4000);
  };

  const handleLogout = () => {
    // Remove items from local storage
    localStorage.removeItem('customerId');
    localStorage.removeItem('userId');
    localStorage.removeItem('strToken');

    // Clear variables
    let customerId = null;
    let userId = null;
    let strToken = null;
    window.location.reload();
    window.location.href = "/";
};


  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    address: "",
    city: "", // You might want to set a default value for city if needed
    alter_phone: "",
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          `${city_url}&tag=get_city&intCountryID=1`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch city data");
        }
        const data = await response.json();
        setCities(data.data);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          
          `${cart_url}&intCompanyID=1&intBranchID=${intBranchID}&tag=get_users&intID=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        const user = userData?.data[0];
       
        setFormData({
          full_name: user?.strFullName,
          email: user?.strEmail,
          address: user?.strAddress,
          city: user?.intCityID, // Adjust this according to your data structure
          alter_phone: user?.strContactNo,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    fetchCities();
  }, [userId]);

  const handleUpdateClick = async () => {
    try {

      const formDataToUpdate = new FormData();
      formDataToUpdate.append("intUserID", userId);
      formDataToUpdate.append("strFullName", formData.full_name);
      formDataToUpdate.append("strEmail", formData.email);
      formDataToUpdate.append("intRoleID", "");
      formDataToUpdate.append("strAddress", formData.address);
      formDataToUpdate.append("intCityID", formData.city);
      formDataToUpdate.append("strAlternateContactNo", formData.alter_phone);

      const response = await fetch(
        `${cart_url}&tag=update_user_profile_web&intCompanyID=1&intBranchID=${intBranchID}`,
        {
          method: "POST",
          body: formDataToUpdate,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      // Handle successful update
      alert("Address Update Success Fully");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  console.log("City of Shipiment Addres,",shipmentAddres)
  const TableHeadings = ['strDoc', 'dtDate',  'dblDebit', 'dblCredit','dblBalance', 'strReferenceNo', 'strRemarks'];
  const transformHeading = (heading) => {
    // Remove 'str' and 'int' prefixes
    let transformedHeading = heading.replace(/^(str|dbl|dt)/, '');
    // Convert to camel case
    transformedHeading = transformedHeading.replace(/([A-Z])/g, ' $1').trim();
    // Capitalize first letter
    transformedHeading = transformedHeading.charAt(0).toUpperCase() + transformedHeading.slice(1);
    return transformedHeading;
  };
  
  return (
    <>
      <main className="main">
        <div className="page-header breadcrumb-wrap">
          <div className="container">
            <div className="breadcrumb">
              <a href="/" rel="nofollow">
                <i className="fi-rs-home mr-5"></i>Home
              </a>
              <span></span> Profile
            </div>
          </div>
        </div>
        <div
          className="page-content pt-150 pb-150"
          style={{ backgroundColor: "rgb(255, 255, 255)" }}
        >
          <div
            className="container"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
          >
            <div
              className="row"
              style={{ backgroundColor: "rgb(255, 255, 255)" }}
            >
              <div
                className="col-lg-10 m-auto"
                style={{ backgroundColor: "rgb(255, 255, 255)" }}
              >
                <div
                  className="row"
                  style={{ backgroundColor: "rgb(255, 255, 255)" }}
                >
                  <div
                    className="col-md-3"
                    style={{ backgroundColor: "rgb(255, 255, 255)" }}
                  >
                    <div
                      className="dashboard-menu"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    >
                      <ul className="nav flex-column" role="tablist">
                        <li className="nav-item">
                          <Link
                            to=""
                            className={`nav-link ${
                              activeSection === "dashboard" ? "active" : ""
                            }`}
                            onClick={() => handleSectionClick("dashboard")}
                          >
                            <i className="fi-rs-settings-sliders mr-10"></i>
                            Dashboard
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to=""
                            className={`nav-link ${
                              activeSection === "wishlist" ? "active" : ""
                            }`}
                            onClick={() => handleSectionClick("wishlist")}
                          >
                            <i className="fi-rs-heart mr-10"></i>Wishlist
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to=""
                            className={`nav-link ${
                              activeSection === "orders" ? "active" : ""
                            }`}
                            onClick={() => handleSectionClick("orders")}
                          >
                            <i className="fi-rs-heart mr-10"></i>Orders
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to=""
                            className={`nav-link ${
                              activeSection === "address" ? "active" : ""
                            }`}
                            onClick={() => handleSectionClick("address")}
                          >
                            <i className="fi-rs-heart mr-10"></i>My Address
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to=""
                            className={`nav-link ${
                              activeSection === "account" ? "active" : ""
                            }`}
                            onClick={() => handleSectionClick("account")}
                          >
                            <i className="fi-rs-heart mr-10"></i>My Account
                          </Link>
                        </li>
                        <li className="nav-item">
                        <Link
                          to=""
                          className={`nav-link ${
                            activeSection === "ledger" ? "active" : ""
                          }`}
                          onClick={(event) => {
                            handleSectionClick("ledger");
                            fetchData();
                          }}
                        >
                          <i className="fi-rs-heart mr-10"></i>My Ledger
                        </Link>
                      </li>

                        <li className="nav-item">
                          <a
                            className="nav-link btnLogout"
                            href="#"
                            onClick={handleLogout}
                          >
                            <i className="fi-rs-sign-out mr-10"></i>Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="tab-content account dashboard-content pl-50">
                      <div
                        style={{
                          display: `${
                            activeSection === "dashboard" ? "block" : "none"
                          }`,
                        }}
                      >
                        <div className="card">
                          <div className="card-header">
                            <h3 className="mb-0">
                              Hello
                              {formData.alter_phone}
                            </h3>
                          </div>
                          <div className="card-body">
                            <p>
                              From your account dashboard. you can easily check
                              &amp; view your
                              <a>recent orders</a>
                              <br></br>
                              manage your
                              <a>shipping and billing addresses</a>
                              and
                              <a>edit your account details.</a>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* WishList*/}
                      <div
                        style={{
                          display: `${
                            activeSection === "wishlist" ? "block" : "none"
                          }`,
                        }}
                      >
                        <div className="card">
                          <div className="card-header">
                            <h3 className="mb-0">Your Wishlist</h3>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {wishlistItems?.map((item, index) => (
                                    <tr key={index}>
                                      <td className="image product-thumbnail">
                                        <img src={item?.strImageThumbnail} />
                                      </td>
                                      <td>{item?.strDesc}</td>
                                      <td>
                                        {new Intl.NumberFormat("en-US", {
                                          style: "decimal",
                                        }).format(item?.dblSalePrice)}
                                      </td>
                                      <td>
                                        <td>
                                          <div className="contact-info">
                                            <div className="social-info">
                                              <h4>{selectedProductDesc}</h4>
                                            </div>
                                          </div>
                                        </td>
                                        <button
                                          style={{ border: "none" }}
                                          type="button"
                                          className="add add_in_cart"
                                          onClick={() =>
                                            handleAddToCart(
                                              item?.intID,
                                              1,
                                              item?.strDesc
                                            )
                                          }
                                        >
                                          Add to Cart
                                        </button>
                                        <button
                                          onClick={() => deleteWishlist(item)}
                                          style={{
                                            border: "none",
                                            backgroundColor: "white",
                                          }}
                                          className="btn-small d-block text-danger btnWishlistDel"
                                        >
                                          Delete
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* WishList*/}
                      {/* Order*/}

                      <div
                        style={{
                          display: `${
                            activeSection === "orders" ? "block" : "none"
                          }`,
                        }}
                      >
                        <div className="card">
                          <div className="card-header">
                            <h3 className="mb-0">Your Orders</h3>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Order</th>
                                    <th>Date</th>
                                    <th>Customer Name</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orderItems?.map((item, index) => (
                                    <tr key={index}>
                                      <th>{item?.strCode}</th>
                                      <th>{item?.dtDate}</th>
                                      <th>{item?.strCustomerDesc}</th>
                                      <th>{item?.strOrderStatus}</th>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div
                        style={{
                          display: `${
                            activeSection === "address" ? "block" : "none"
                          }`,
                        }}
                      >
                        <div className="card">
                          <div className="card-header">
                            <h3 className="mb-0">Your Addresses</h3>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>No.</th>
                                    <th>Contact Person</th>
                                    <th>Address</th>
                                    <th>Zipcode</th>
                                    <th>Phone</th>
                                    <th>City</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {shipmentAddres?.map((item, index) => {
                                   
                                    return (
                                      <tr key={index}>
                                        <td>{item?.intID}</td>
                                        <td>
                                          {item?.strShipmentContactPerson}
                                        </td>
                                        <td>{item?.strShipmentAddress}</td>
                                        <td></td>
                                        <td>{item?.strShipmentPhone}</td>
                                        <td>{item?.strShipmentCity} </td>
                                        <td>
                                          {index !== 0 && (
                                            <button
                                              onClick={() =>
                                                deleteUserAddres(item)
                                              }
                                              style={{
                                                border: "none",
                                                backgroundColor: "white",
                                              }}
                                              className="btn-small d-block text-danger btnWishlistDel"
                                            >
                                              Delete
                                            </button>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                       {/* Ledger Data */}
                      <div
                        style={{
                          display: `${activeSection === "ledger" ? "block" : "none"}`,
                        }}
                      >
                        <div className="card">
                          <div className="card-header">
                            <h3 className="mb-0"> Ledger Details</h3>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                <tr>
                                  {/* Render modified table headings */}
                                  {TableHeadings.map((heading, index) => (
                                    <th key={index}>{transformHeading(heading)}</th>
                                  ))}
                                </tr>
                                </thead>
                                <tbody>
                                {response && response.length > 0 ? (
                                  response.map((item, index) => (
                                    <tr key={index}>
                                      <td>{item?.strDoc}</td>
                                      <td>{item?.dtDate}</td>
                                      <td>{item?.dblDebit}</td>
                                      <td>{item?.dblCredit}</td>
                                      <td>{item?.dblBalance}</td>
                                      <td>{item?.strReferenceNo}</td>
                                     
                                      <td>{item?.strRemarks}</td>
                                     
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="10" style={{ textAlign: "center" }}>
                                     Customer Data Not Available
                                    </td>
                                  </tr>
                                )}
                              </tbody>

                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* My Account */}
                      <div
                        style={{
                          display: `${
                            activeSection === "account" ? "block" : "none"
                          }`,
                        }}
                      >
                        <div className="card">
                          <div className="card-header">
                            <h5>Account Details</h5>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="form-group col-md-6">
                                <label>
                                  Full Name <span className="required">*</span>
                                </label>

                                <input
                                  required
                                  className="form-control "
                                  name="full_name"
                                  id="full_name"
                                  type="text"
                                  value={formData.full_name}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      full_name: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label>
                                  Email Address
                                  <span className="required">*</span>
                                </label>
                                <input
                                  required=""
                                  className="form-control "
                                  name="email"
                                  id="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      email: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="form-group col-md-12">
                                <label>
                                  Address <span className="required">*</span>
                                </label>
                                <input
                                  required=""
                                  className="form-control "
                                  name="address"
                                  id="user_address"
                                  type="text"
                                  value={formData.address}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      address: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <select
                                className="form-control"
                                name="city"
                                id="city"
                                value={formData.city}
                                onChange={(e) => {
                                  const selectedCityId = e.target.value;

                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    city: selectedCityId,
                                  }));
                                }}
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

                              <div
                                className="form-group col-md-6"
                                style={{
                                  backgroundColor: "rgb(255, 255, 255)",
                                }}
                              >
                                <label>
                                  Alter Contact No/
                                  <span className="required">*</span>
                                </label>
                                <input
                                  required=""
                                  className="form-control "
                                  name="alter_phone"
                                  id="alter_phone"
                                  maxLength="12"
                                  type="text"
                                  value={formData.alter_phone}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      alter_phone: e.target.value,
                                    })
                                  }
                                />
                              </div>

                              <div className="col-md-12">
                                <button
                                  id="update-profile-btn"
                                  type="button"
                                  className="btn btn-fill-out submit font-weight-bold btnUpdateProfile"
                                  name="submit"
                                  value="Submit"
                                  onClick={handleUpdateClick}
                                >
                                  Save Change
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
            </div>
          </div>
        </div>

        <div
          className="modal fade custom-modal"
          id="show-order-detail"
          tabIndex="-1"
          aria-labelledby="onloadModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="modal-body">
                <div className="row">
                  <div className="col">
                    <h4 style={{ backgroundColor: "#F0F0F0" }}>
                      Order Number#
                      <div
                        style={{ color: "red", display: "inline" }}
                        id="order-code-show"
                      ></div>
                    </h4>
                    <div className="row">
                      <div className="col">
                        <h6>Date</h6>
                      </div>
                      <div className="col">
                        <p id="order-date-show"></p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <h6>Name</h6>
                      </div>
                      <div className="col">
                        <p id="order-name-show"></p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <h6>Phone</h6>
                      </div>
                      <div className="col">
                        <p
                          style={{ display: "inline" }}
                          id="order-phone-show"
                        ></p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <h6>Order Total</h6>
                      </div>
                      <div className="col">
                        <p style={{ display: "inline" }} id="order-total"></p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <h4 style={{ backgroundColor: "#F0F0F0" }}>
                      Shipment Address
                    </h4>

                    <div className="row">
                      <div className="col">
                        <h6>Contact Person</h6>
                      </div>
                      <div className="col">
                        <p id="contact-per"></p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <h6>Shipment Address</h6>
                      </div>
                      <div className="col">
                        <p id="shipment-address"></p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <h6>Shipment City</h6>
                      </div>
                      <div className="col">
                        <p id="shipment-city"></p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <h6>Shipment Phone</h6>
                      </div>
                      <div className="col">
                        <p id="shipment-phone"></p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <h6>Shipment Country</h6>
                      </div>
                      <div className="col">
                        <p id="shipment-country"></p>
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="row">
                  <table className="table">
                    <thead>
                      <tr
                        style={{ backgroundColor: "#F0F0F0", border: "none" }}
                      >
                        <th style={{ width: "10%" }}></th>
                        <th style={{ width: "45%" }}>Product Name</th>
                        <th style={{ width: "15%" }}>Item Category</th>
                        <th style={{ width: "10%", textAlign: "right" }}>
                          Unit Price
                        </th>
                        <th style={{ width: "10%", textAlign: "right" }}>
                          QTY
                        </th>
                        <th style={{ width: "10%", textAlign: "right" }}>
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody id="order-detail-show"></tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-3"></div>
                  <div className="col-9">
                    <div id="sub-total-row" className="row">
                      <div className="col"></div>
                      <div className="col">
                        <div className="row" id="sub-total-row">
                          <div className="col">
                            <h6>Sub Total</h6>
                          </div>
                          <div className="col" style={{ textAlign: "right" }}>
                            <p id="subtotal-amount"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="discount-row" className="row">
                      <div className="col"></div>
                      <div className="col">
                        <div className="row" id="disc-amount-row">
                          <div className="col">
                            <h6>Discount</h6>
                          </div>
                          <div className="col" style={{ textAlign: "right" }}>
                            <p id="disc-amount"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col"></div>
                      <div className="col">
                        <div
                          className="row"
                          style={{ backgroundColor: "#4FA0CF" }}
                        >
                          <div className="col">
                            <h5 style={{ color: "white" }}>Grand Total</h5>
                          </div>
                          <div className="col">
                            <h5
                              id="total-amount"
                              style={{ textAlign: "right", color: "white" }}
                            ></h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
