import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cart_url, shipAddres_url, userInfo_url } from "../config/env";

export const getUserInfoThunk = createAsyncThunk(
  "userInformation",
  async (userId) => {
    const response = await fetch(
      `${userInfo_url}&tag=get_users&intID=${userId}`
    );
    const result = await response.json();
    console.log("Redux Result", result);
    return result?.data[0];
  }
);
export const getAllCartItemsThunk = createAsyncThunk(
  "allCartItems",
  async (userId) => {
    const response = await fetch(
      `${cart_url}&tag=get_user_cart&intUserID=${userId}`
    );
    const res = await response.json();
    return res.data;
  }
);

export const getAllWishlistItemsThunk = createAsyncThunk(
  "allWishlistItem",
  async (userId) => {
    const response = await fetch(
      `${shipAddres_url}&tag=get_user_wishlist&intUserID=${userId}`
    );
    const result = await response.json();
    return result.data;
  }
);
export const getShipmentAddressThunk = createAsyncThunk(
  "shipMentAddressOfUser",
  async (userId) => {
    const response = await fetch(
      `${cart_url}&tag=get_user_shipment_address&intUserID=${userId}`
    );
    const result = await response.json();
    return result.data;
  }
);

const initialState = {
  userinfo: [],
  cartItems: [],
  wishlistItems: [],
  fetchShipmentAddress: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get UserIformation Who Login
    builder.addCase(getUserInfoThunk.fulfilled, (state, action) => {
      state.userinfo = action.payload;
    });
    // get all items
    builder.addCase(getAllCartItemsThunk.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
    // get all Wishtlist Item
    builder.addCase(getAllWishlistItemsThunk.fulfilled, (state, action) => {
      state.wishlistItems = action.payload;
    });
    // get all getShipment Address of Current User
    builder.addCase(getShipmentAddressThunk.fulfilled, (state, action) => {
      state.fetchShipmentAddress = action.payload;
    });
  },
});

// export const { getAllCartItemsThunk } = cartSlice.actions;

export default cartSlice.reducer;
