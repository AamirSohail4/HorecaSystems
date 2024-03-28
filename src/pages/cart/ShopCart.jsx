import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { useState } from "react";
import { api_url, cart_url } from "../../config/env";
import { Link, useNavigate } from "react-router-dom";
import { PaymentContext } from "../../context/PaymentMethod";
import { MyAccountContext } from "../../context/AccountContext";
import { AddressContext } from "../../context/AddresContext";

export const ShopCart = () => {
  const { userId } = useContext(MyAccountContext);
  const navigatie = useNavigate();
  const { cartItems, clearCartDelete, deleteSingleCartItem, addToCart } =
    useContext(CartContext);
  const { showPaymentMode } = useContext(PaymentContext);
  const { DisplayShipAddres, shipmentAddres } = useContext(AddressContext);
  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [locatCities, setCities] = useState([]);
  const [shipmentaddresValue, setShipmentaddresValue] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handelShipmentValue = async (itemValue) => {
    setShipmentaddresValue(itemValue);
  };

  const handleCheckout = () => {
    if (!selectedPayment || !shipmentaddresValue) {
      alert("Please Select a Payment option and a Shipment address.");
      return;
    } else {
      navigatie("/admin/checkout", {
        state: { selectedPayment, shipmentaddresValue },
      });
    }
  };
  const handleAddModalClick = () => {
    setOpen(!open);
  };

  const handlePaymentSelection = async (value) => {
    const modeValue = value;
    // console.log("mode value", modeValue);

    setSelectedPayment(value);

    if (modeValue === "3") {
      try {
        const response = await fetch(
          `${cart_url}&tag=get_payment_mode_detail&intCompanyID=1&intPaymentModeID=${modeValue}`
        );

        const data = await response.json();

        setPaymentDetails(data?.data?.strDetails);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    }
  };

  const handleDec = async (q, productID) => {
    if (q > 1) {
      let qq = q - 1;
      addToCart(productID, qq);
    }
  };

  const handleInc = (q, productID) => {
    if (q >= 1) {
      let qq = parseInt(q) + 1;
      addToCart(productID, qq);
    }
  };

  const calculateTotal = () => {
    if (!cartItems || !cartItems.length) {
      return 0; // Return 0 if cartItem is not defined or empty
    }

    // Calculate the subtotal for each item and sum them up
    const total = cartItems.reduce(
      (acc, item) =>
        acc +
        parseFloat(item?.item?.dblSalePrice) * parseFloat(item?.dblItemQty),
      0
    );

    // Apply number formatting to the total
    const formattedTotal = total.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });

    return formattedTotal;
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    document.title = "HORECA SYSTEMS | Cart";
    const fetchCities = async () => {
      try {
        const response = await fetch(`${api_url}&tag=get_city&intCountryID=1`);
        const data = await response.json();
        setCities(data.data);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    fetchCities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleButtonClick = async () => {
    const errors = {};

    // Validate name field

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      errors.name = "Only alphabetic characters are allowed";
    }
    // Validate phone field
    if (!/^\d{11,12}$/.test(formData.phone)) {
      errors.phone = "Phone must be 11 or 12 digits like 923014788965";
    }

    // Validate email field
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    // Validate city field
    if (!formData.city) {
      errors.city = "City is required";
    }

    // Validate address field
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }

    if (Object.keys(errors).length > 0) {
      // If there are errors, update the state and prevent form submission
      setFormErrors(errors);
      return;
    }

    let data = new FormData();
    data.append("intUserID", userId);
    data.append("strShipmentContactPerson", formData.name);
    data.append("strShipmentPhone", formData.phone);
    data.append("strShipmentEmail", formData.email);
    data.append("intShipmentCityID", formData.city);
    data.append("strShipmentAddress", formData.address);

    const response = await fetch(
      `${cart_url}&tag=add_user_shipment_address_web`,
      {
        method: "POST",
        body: data,
      }
    );

    if (response.ok) {
      alert("Shipment Address is updated");
      DisplayShipAddres();
      handleAddModalClick();
    }

    // Reset the form after submission
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
    });

    setFormErrors({});
  };
  const handleDelete = (item) => {
    deleteSingleCartItem(item);
  };
  const handleDeleteAllCart = () => {
    clearCartDelete();
  };
  return (
    <>
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/" rel="nofollow">
              <i className="fi-rs-home mr-5"></i>Home
            </Link>
            <Link to="/allproducts">
              <span>Shop</span>
            </Link>
            <span></span> Cart
          </div>
        </div>
      </div>

      <div
        className="container mb-80 mt-50"
        style={{ backgroundColor: "rgb(255, 255, 255)" }}
      >
        <div className="row">
          <div className="col-lg-8 mb-40">
            <h1 className="heading-2 mb-10">Your Cart</h1>
            <div className="d-flex justify-content-between">
              <h6 className="text-body">products in your cart</h6>
              <h6 className="text-body">
                <button
                  id="clr-cart"
                  style={{ border: "none", backgroundColor: "white" }}
                  className="text-muted clear-cart btnCartEmpty"
                  onClick={handleDeleteAllCart}
                >
                  <i className="fi-rs-trash mr-5"></i>
                  Clear Cart
                </button>
              </h6>
            </div>
          </div>
        </div>
        <div className="row" style={{ backgroundColor: "rgb(255, 255, 255" }}>
          <div
            className="col-lg-8"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
          >
            <div
              className="table-responsive shopping-summery"
              style={{ backgroundColor: "rgb(255, 255, 255)" }}
            >
              <table className="table table-wishlist">
                <thead>
                  <tr className="main-heading">
                    <th className="custome-checkbox start pl-30"></th>
                    <th scope="col" colSpan="2">
                      Product
                    </th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col" className="end">
                      Remove
                    </th>
                  </tr>
                </thead>

                <tbody id="cartTable">
                  {cartItems?.map((item, index) => {
                    const productID = item?.item?.intID;
                    return (
                      <tr key={index} className="">
                        <td className="custome-checkbox pl-30"></td>
                        <td className="image product-thumbnail pt-40">
                          <img src={item?.item?.strImage} alt="#" />
                        </td>
                        <td className="product-des product-name">
                          <h6 className="mb-5">
                            <a className="product-name mb-10 text-heading">
                              {item?.item?.strDesc}
                            </a>
                          </h6>
                        </td>
                        <td className="price" data-title="Price">
                          <h4 className="text-body">
                            {item?.item?.strUOM}
                            {new Intl.NumberFormat("en-US", {
                              style: "decimal",
                            }).format(parseFloat(item?.item?.dblSalePrice))}

                            {/* {parseFloat(
                              item?.item?.dblSalePrice
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })} */}
                          </h4>
                        </td>
                        <td
                          className="text-center detail-info"
                          data-title="Stock"
                        >
                          <div className="detail-extralink mr-15">
                            <div className="detail-qty border radius">
                              <a
                                className="qty-down cartQtyUpdate"
                                data-pid="1866"
                                data-type="down"
                              >
                                <i
                                  className="fi-rs-angle-small-down"
                                  onClick={() =>
                                    handleDec(item?.dblItemQty, productID)
                                  }
                                ></i>
                              </a>
                              <span className="qty-val item-qty">
                                {item?.dblItemQty}
                              </span>
                              <a
                                className="qty-up cartQtyUpdate"
                                data-pid="1866"
                                data-type="up"
                              >
                                <i
                                  className="fi-rs-angle-small-up"
                                  onClick={() =>
                                    handleInc(item?.dblItemQty, productID)
                                  }
                                ></i>
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="price" data-title="Price">
                          <h4 className="text-brand">
                            {/* {item?.item?.strUOM} */}
                            {new Intl.NumberFormat("en-US", {
                              style: "decimal",
                            }).format(
                              parseFloat(item?.item?.dblSalePrice) *
                                parseFloat(item?.dblItemQty)
                            )}
                            {/* {formatter.format(
                              parseFloat(item?.item?.dblSalePrice) *
                                parseFloat(item?.dblItemQty)
                            )} */}
                          </h4>
                        </td>
                        <td className="action text-center" data-title="Remove">
                          <button
                            style={{ border: "none", backgroundColor: "white" }}
                            id="del-btn1866"
                            className="text-body cartTableDel"
                            data-pid="1866"
                            onClick={() => handleDelete(item)}
                          >
                            <i className="fi-rs-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="divider-2 mb-30"></div>

            <div id="snackbar123"></div>

            <div className="row mt-50">
              <div className="col-lg-12">
                <div className="p-40">
                  <h4 className="mb-10">Apply Coupon</h4>
                  <p className="mb-30">
                    <span className="font-lg text-muted">
                      Using A Promo Code?
                    </span>
                  </p>
                  <form action="#">
                    <div className="d-flex justify-content-between">
                      <input
                        id="get-coupon-value"
                        className="font-medium mr-15 coupon"
                        name="Coupon"
                        placeholder="Enter Your Coupon"
                      />
                      <button className="btn" id="apply-coupon">
                        <i className="fi-rs-label mr-10"></i>Apply
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="border p-md-4 cart-totals ml-30">
              <div className="table-responsive">
                <table className="table no-border">
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <div className="payment">
                          <div className="d-flex justify-content-between mb-15 align-items-center">
                            <div>
                              <h5 className="text-muted">Payment Method</h5>
                            </div>
                          </div>

                          <div className="payment_option">
                            {showPaymentMode?.map((item, index) => (
                              <div key={index} className="custome-radio">
                                <input
                                  className="form-check-input"
                                  required
                                  type="radio"
                                  name="payment_option"
                                  id={`paymentRadios${index}`}
                                  value={item.intID}
                                  checked={selectedPayment === item.intID}
                                  onChange={() =>
                                    handlePaymentSelection(item.intID)
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`paymentRadios${index}`}
                                  data-bs-toggle="collapse"
                                  data-target="#bankTranfer"
                                  aria-controls="bankTranfer"
                                >
                                  {item.strDesc}
                                </label>
                              </div>
                            ))}
                            <div id="bankTranfer">
                              {paymentDetails && (
                                <div id="bank detail" className="Detail_dta">
                                  {selectedPayment === "3" ? (
                                    <>
                                      <p className="Detail_dta">
                                        {paymentDetails.toUpperCase()}
                                      </p>
                                    </>
                                  ) : selectedPayment === "1" ? (
                                    <p>Cash on Delivery</p>
                                  ) : null}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <div className="payment">
                          <div className="d-flex justify-content-between mb-15 align-items-center">
                            <div>
                              <h5 className="text-muted">Shipping Address</h5>
                            </div>
                            <div>
                              <button
                                type="button"
                                className="btn btn-outline-info waves-effect px-3 btnAddShipment"
                                onClick={handleAddModalClick}
                              >
                                Add
                              </button>
                            </div>
                          </div>

                          <div className="payment_option">
                            {shipmentAddres?.map((item, index) => {
                              return (
                                <div key={index} className="custome-radio">
                                  <input
                                    className="form-check-input"
                                    required
                                    type="radio"
                                    name="shipment_option"
                                    data-name=" "
                                    id={`exampleRadios0${index}`}
                                    value={item.intID}
                                    onChange={() =>
                                      handelShipmentValue(item.intID)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`exampleRadios0${index}`}
                                    data-bs-toggle="collapse"
                                    data-target="#bankTranfer"
                                    aria-controls="bankTranfer"
                                  >
                                    {item.strShipmentAddress}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="cart_total_label">
                        <h6 className="text-muted">Subtotal</h6>
                      </td>
                      <td className="cart_total_amount">
                        <input id="get-subtotal" type="hidden" value="11950" />

                        <h4 id="set-subtotal" className="text-brand text-end">
                          {calculateTotal()}
                        </h4>
                      </td>
                    </tr>

                    <tr id="discount-available" hidden="">
                      <td className="cart_total_label">
                        <h6 className="text-muted">Discount</h6>
                      </td>
                      <td className="cart_total_amount">
                        <input
                          id="get-discount-price"
                          type="hidden"
                          value="0"
                        />
                        <input
                          id="get-discount-amount"
                          type="hidden"
                          value="0"
                        />
                        <input id="get-discount-per" type="hidden" value="0" />
                        <h4
                          id="set-discount-price"
                          className="text-brand text-end"
                        >
                          Rs 0
                        </h4>
                      </td>
                    </tr>

                    <tr>
                      <td className="cart_total_label">
                        <h6 className="text-muted">Total</h6>
                      </td>
                      <td className="cart_total_amount">
                        <input id="get-total" type="hidden" value="11950" />
                        <h4 id="set-total" className="text-brand text-end">
                          Rs {calculateTotal()}
                        </h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                // to="/checkout"
                type="button"
                onClick={handleCheckout}
                className="btn mb-20 w-100 btnValidateCheckout"
              >
                Proceed To CheckOut<i className="fi-rs-sign-out ml-15"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal  custom-modal iqbal"
        style={{
          display: `${open === true ? "block" : "none"}`,
          backgroundColor: "rgba(0, 0, 0,0.2)",
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <button
              type="button"
              className="btn-close"
              onClick={handleAddModalClick}
            ></button>
            <div className="modal-body">
              <div
                className="deal"
                style={{
                  backgroundImage: "url('assets/imgs/banner/popup-1.png')",
                }}
              >
                <div className="deal-top">
                  <h4 className="mb-10 text-brand-2">Add Address</h4>
                </div>
                <div>
                  <div className="card-body">
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label>
                          Contact Person <span className="required">*</span>
                        </label>
                        <input
                          required=""
                          className={`form-control ${
                            formErrors.name ? "is-invalid" : ""
                          }`}
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                        {formErrors.name && (
                          <div className="invalid-feedback">
                            {formErrors.name}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-6">
                        <label>
                          Contact No <span className="required">*</span>
                        </label>
                        <input
                          required=""
                          className={`form-control ${
                            formErrors.phone ? "is-invalid" : ""
                          }`}
                          name="phone"
                          id="phone"
                          type="text"
                          value={formData.phone}
                          onChange={handleInputChange}
                          maxLength={12}
                        />
                        {formErrors.phone && (
                          <div className="invalid-feedback">
                            {formErrors.phone}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-6">
                        <label>
                          Email Address <span className="required">*</span>
                        </label>
                        <input
                          required=""
                          className={`form-control ${
                            formErrors.email ? "is-invalid" : ""
                          }`}
                          name="email"
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        {formErrors.email && (
                          <div className="invalid-feedback">
                            {formErrors.email}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-6">
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
                          <option value="" disabled>
                            Select a city
                          </option>
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
                          required=""
                          className={`form-control ${
                            formErrors.address ? "is-invalid" : ""
                          }`}
                          name="address"
                          id="address"
                          type="text"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                        {formErrors.address && (
                          <div className="invalid-feedback">
                            {formErrors.address}
                          </div>
                        )}
                      </div>

                      <div className="col-md-12">
                        <button
                          id="address-btn"
                          type="button"
                          className="btn btn-fill-out submit font-weight-bold btnAddAddress"
                          name="submit"
                          value="Submit"
                          onClick={handleButtonClick}
                        >
                          Add Address
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
