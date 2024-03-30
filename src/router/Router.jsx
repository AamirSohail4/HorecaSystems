import { Routes, Route } from "react-router-dom";
import { FrontendLayout } from "../layouts/FrontendLayout";
import { Home } from "../pages/home/Home";
import { SingleProduct } from "../pages/single-product/SingleProduct";
import { ShopCart } from "../pages/cart/ShopCart";
import { ShopCheckout } from "../pages/cart/ShopCheckout";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/login/Register";
import { About } from "../pages/about/About";
import { MyAccount } from "../pages/myAccount/MyAccount";
import { PrivacyPolicy } from "../pages/privacyPolicy/PrivacyPolicy";
import { Contact } from "../pages/contact/Contact";
import { PurchaseGuide } from "../pages/purchaseGuide/PurchaseGuide";
import { Terms } from "../pages/termsAndServices/Terms";
import { PageNotFound } from "../pages/pagenotFound/PageNotFound";
import { ProductsGrid } from "../pages/allproduct/ProductsGrid";
import { QuickView } from "../pages/cart/QuickView";
import { Categories } from "../pages/allproduct/Category/Categories";
import { Verify } from "../pages/login/Verify";
import { ManuCategory } from "../pages/allproduct/Category/ManuCategory";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Index } from "../pages/allproduct/Category";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<FrontendLayout />}>
        <Route index element={<Home />} />
        <Route path="allProducts/:page?" element={<ProductsGrid />} />
        <Route path="product/:strSEOLink" element={<SingleProduct />} />
        <Route path="signUp" element={<Register />} />
        <Route path="login" element={<Login />} />

        <Route path="about" element={<About />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="contact" element={<Contact />} />
        <Route path="purchase-guide" element={<PurchaseGuide />} />
        <Route path="terms" element={<Terms />} />
        <Route path="quick-view" element={<QuickView />} />
        <Route path="teachers/page-404" element={<PageNotFound />} />
        <Route
          path="categories"
          element={<Categories element={<Categories />} />}
        />
        <Route path="index" element={<Index />} />
        <Route
          path="Category"
          element={<ManuCategory element={<ManuCategory />} />}
        />
        <Route path="verify" element={<Verify />} />
      </Route>
      <Route path="/admin" element={<DashboardLayout />}>
        <Route path="myaccount" element={<MyAccount />} />
        <Route path="checkout" element={<ShopCheckout />} />
        <Route path="cart" element={<ShopCart />} />
      </Route>
    </Routes>
  );
};
