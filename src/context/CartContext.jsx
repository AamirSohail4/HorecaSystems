/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, createContext, useContext, useState } from "react";
import { cart_url } from "../config/env";
import { MyAccountContext } from "./AccountContext";
import { intBranchID } from "../branch/branch";

export const CartContext = createContext({});

// provider

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState();
  const [orderItems, setOrderItems] = useState([]);
  const { userId } = useContext(MyAccountContext);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        `${cart_url}&intBranchID=${intBranchID}&intCompanyID=1&tag=get_user_cart_web&intUserID=${userId}`
      );
      if (response.ok) {
        const cartdata = await response.json();
        setCartItems(cartdata?.data);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  const fetchOrdersDetails = async () => {
    try {
      const response = await fetch(
        `${cart_url}&intBranchID=${intBranchID}&intCompanyID=1&tag=get_user_orders_list_web&intUserID=${userId}`
      );
      if (response.ok) {
        const orderData = await response.json();

        setOrderItems(orderData?.data?.orders_list);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const addProducts = async (productId, quantity) => {
    if (userId !== null) {
      let data = new FormData();
      data.append("intUserID", userId);
      data.append("intItemID", productId);
      data.append("dblItemQty", quantity);
      data.append("strItemRemarks", "");
      const response = await fetch(
        `${cart_url}&tag=add_user_cart_item_web&&intBranchID=${intBranchID}intCompanyID=1`,
        {
          method: "POST",
          body: data,
        }
      );
      if (response.ok) {
        fetchCartItems();
      }
    }
  };

  const addToCart = async (productId, quantity) => {
    console.log("quantity", quantity);
    let data = new FormData();
    data.append("intUserID", userId);
    data.append("intItemID", productId);
    data.append("dblItemQty", quantity);
    data.append("strItemRemarks", "");
    const response = await fetch(
      `${cart_url}&tag=update_user_cart_item_web&intBranchID=${intBranchID}&intCompanyID=1`,
      {
        method: "POST",
        body: data,
      }
    );
    if (response.ok) {
      fetchCartItems();
    }
  };

  const clearCartDelete = async () => {
    let data = new FormData();
    data.append("intUserID", userId);
    const response = await fetch(
      `${cart_url}&tag=empty_user_cart_web&intBranchID=${intBranchID}&intCompanyID=1`,
      {
        method: "POST",
        body: data,
      }
    );

    if (response.ok) {
      fetchCartItems();
    }
  };

  // delete single cart item api
  const deleteSingleCartItem = async (product) => {
    let data = new FormData();

    data.append("intUserID", userId);
    data.append("intItemID", product?.item?.intID);

    const response = await fetch(
      `${cart_url}&tag=delete_user_cart_item_web&intBranchID=${intBranchID}&intCompanyID=1`,
      {
        method: "POST",
        body: data,
      }
    );
    if (response.ok) {
      fetchCartItems();
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchOrdersDetails();
  }, [userId]);

  return (
    <CartContext.Provider
      value={{
        addProducts,
        cartItems,
        fetchCartItems,
        addToCart,
        clearCartDelete,
        deleteSingleCartItem,
        fetchOrdersDetails,
        orderItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
