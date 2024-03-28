import { PaymentContext } from "../../context/PaymentMethod";
import { useContext, useEffect } from "react";
import { cart_url } from "../../config/env";
import { MyAccountContext } from "../../context/AccountContext";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AddressContext } from "../../context/AddresContext";
import { intBranchID } from "../../branch/branch";

export const ShopCheckout = () => {
  const navigate = useNavigate();
  const { userId } = useContext(MyAccountContext);
  const { shipmentAddress, showPaymentMode } = useContext(PaymentContext);
  const { shipmentAddres } = useContext(AddressContext);
  const { cartItems, clearCartDelete, fetchOrdersDetails } =
    useContext(CartContext);
  const { state } = useLocation();

  const addresId = state && state.shipmentaddresValue;

  const shipingAddres = shipmentAddres?.find((item) => item.intID === addresId);

  const selectedPaymentId = state && state.selectedPayment;
  const shipmentID = shipmentAddress?.shipmentaddresValue;

  const paymentMethod = showPaymentMode?.find(
    (item) => item.intID === selectedPaymentId
  );
  const PyamentModId = selectedPaymentId;
  console.log("paymentid", intBranchID);

  const handleOrder = async () => {
    const intShipmentAddressID = shipmentID;
    const intPaymentModeID = PyamentModId;
    const dblSubTotal = subtotal;
    let data = new FormData();
    data.append("intUserID", userId);
    data.append("intShipmentAddressID", intShipmentAddressID);
    data.append("intPaymentModeID", intPaymentModeID);
    data.append("dblSubTotal", dblSubTotal);

    // console.log("Form Data:", data);
    const response = await fetch(
      `${cart_url}&intBranchID=${intBranchID}&tag=add_user_cart_order_web&intCompanyID=1`,
      {
        method: "POST",
        body: data,
      }
    );
    if (response.ok) {
      await response.json();
      clearCartDelete();
      fetchOrdersDetails();
      navigate("/");
    }
  };

  const calculateTotal = () => {
    if (!cartItems || !cartItems.length) {
      return 0; // Return 0 if cartItems is not defined or empty
    }

    // Calculate the subtotal for each item and sum them up
    const total = cartItems.reduce(
      (acc, item) =>
        acc +
        parseFloat(item?.item?.dblSalePrice) * parseFloat(item?.dblItemQty),
      0
    );

    return total;
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PKR",

    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  });
  const subtotal = calculateTotal();
  useEffect(() => {
    document.title = "HORECA SYSTEMS | Checkout";
  }, []);
  return (
    <div className="container mb-80 mt-50">
      <div className="container mb-80 mt-50">
        <div className="row">
          <div className="col-lg-12">
            <div className="border p-40 cart-totals ml-30 mb-50">
              <div className="d-flex align-items-end justify-content-between mb-30">
                <h4>Your Order</h4>
                <h6 className="text-muted grandTotal"></h6>
              </div>
              <div className="d-flex align-items-end justify-content-between mb-10">
                <h5>Payment Mode</h5>
                <h6 className="text-muted">{paymentMethod?.strDesc}</h6>
              </div>
              <div className="d-flex align-items-end justify-content-between mb-10">
                <h5>Shipment</h5>
                <h6 className="text-muted">
                  {shipingAddres?.strShipmentAddress}
                </h6>
              </div>
              <div className="divider-2 mb-30"></div>
              <div className="table-responsive order_table checkout">
                <table className="table no-border">
                  <tbody id="cartTable">
                    {cartItems?.map((item, index) => {
                      return (
                        <tr key={index} className="">
                          <td className="custome-checkbox pl-30"></td>
                          <td className="image product-thumbnail pt-40">
                            <img src={item?.item?.strImage} alt="#" />
                          </td>
                          <td className="product-des product-name">
                            <h6 className="mb-5">
                              <a
                                className="product-name mb-10 text-heading"
                                href=""
                              >
                                {item?.item?.strDesc}
                              </a>
                            </h6>
                          </td>
                          <td className="price" data-title="Price">
                            <h4 className="text-body">
                              {item?.item?.strUOM}

                              {parseFloat(
                                item?.item?.dblSalePrice
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </h4>
                          </td>
                          <td
                            className="text-center detail-info"
                            data-title="Stock"
                          >
                            <div className="detail-extralink mr-15">
                              <div className="detail-qty border radius">
                                <span className="qty-val item-qty">
                                  {item?.dblItemQty}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="price" data-title="Price">
                            <h4 className="text-brand">
                              {formatter.format(
                                parseFloat(item?.item?.dblSalePrice) *
                                  parseFloat(item?.dblItemQty)
                              )}
                            </h4>
                          </td>
                          <td
                            className="action text-center"
                            data-title="Remove"
                          ></td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td className="image product-thumbnail"></td>
                      <td> </td>
                      <td></td>
                      <td></td>

                      <td>
                        <h4 className="text-brand ">
                          <div>
                            <div
                              className="text-muted"
                              style={{
                                display: "inline-block",
                                paddingRight: "52px",
                              }}
                            >
                              Total
                            </div>
                            <div style={{ display: "inline-block" }}>
                              Rs.
                              {new Intl.NumberFormat("en-US", {
                                style: "decimal",
                              }).format(calculateTotal())}
                            </div>
                          </div>
                        </h4>

                        <input
                          type="hidden"
                          name="grandTotal"
                          id="grandTotal"
                          value="1000"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="payment ml-30" style={{ textAlign: "right" }}>
                <button
                  id="check-out-btn"
                  className="btn btn-fill-out btn-block mt-30 btnCheckout"
                  type="button"
                  onClick={handleOrder}
                >
                  Place an Order<i className="fi-rs-sign-out ml-15"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
