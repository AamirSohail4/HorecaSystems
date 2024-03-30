import "animate.css";
import "./assets/css/main.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Router } from "./router/Router";
import { AppProvider } from "./context/AddresContext";
import { CartProvider } from "./context/CartContext";
import { PaymentProvider } from "./context/PaymentMethod";
import { MyAccountProvider } from "./context/AccountContext";
import { WishListProvider } from "./context/WishListContext";
import { ScrollToTop } from "./component/ScrollToTop";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export const App = () => {
  return (
    <MyAccountProvider>
      <Provider store={store}>
        <WishListProvider>
          <CartProvider>
            <PaymentProvider>
              <AppProvider>
                <ScrollToTop />
                <Router />
              </AppProvider>
            </PaymentProvider>
          </CartProvider>
        </WishListProvider>
      </Provider>
    </MyAccountProvider>
  );
};
