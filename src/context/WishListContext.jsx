/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, createContext, useContext, useState } from "react";
import { wishlist_url } from "../config/env";
import { MyAccountContext } from "./AccountContext";
import { intBranchID } from "../branch/branch";

export const WishListContext = createContext({});

export const WishListProvider = ({ children }) => {
  const [wishlistItems, setWishListItems] = useState();
  const { userId } = useContext(MyAccountContext);

  const fetchWishlist = async () => {
    try {
      const response = await fetch(
        `${wishlist_url}&tag=get_user_wishlist_web&intUserID=${userId}&intBranchID=${intBranchID}`
      );
      if (response.ok) {
        const wishdata = await response.json();

        setWishListItems(wishdata?.data);
      } else {
        // Log error message if response status is not OK
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Fetch error:", error);
    }
  };

  const addToWishList = async (productId) => {
    let data = new FormData();
    data.append("intUserID", userId);
    data.append("intItemID", productId);

    const response = await fetch(
      `${wishlist_url}&tag=add_user_wishlist_item_web&intBranchID=${intBranchID}`,
      {
        method: "POST",
        body: data,
      }
    );
    if (response.ok) {
      fetchWishlist();
    }
  };
  const deleteWishlist = async (productId) => {
    console.log("product Id", productId.intID);
    let data = new FormData();
    data.append("intUserID", userId);
    data.append("intItemID", productId?.intID);

    const response = await fetch(
      `${wishlist_url}&tag=delete_user_wishlist_item_web&intBranchID=${intBranchID}`,
      {
        method: "POST",
        body: data,
      }
    );
    if (response.ok) {
      fetchWishlist();
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [userId]);

  return (
    <WishListContext.Provider
      value={{
        addToWishList,
        deleteWishlist,
        wishlistItems,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
