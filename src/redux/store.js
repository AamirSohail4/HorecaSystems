import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";

export const store = configureStore({
  reducer: cartReducer,
});

// const persistConfig = {
//   key: "root",
//   storage,
// };
// const persistedReducer = persistReducer(persistConfig, cartReducer);
// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);
