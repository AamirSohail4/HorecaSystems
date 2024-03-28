import { Link } from "react-router-dom";

import { ProductDetail } from "./components/ProductDetail";
import { useEffect } from "react";

export const SingleProduct = () => {
  useEffect(() => {
    document.title = "HORECA SYSTEMS | Product";
  });
  return (
    <>
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/" rel="nofollow">
              <i className="fi-rs-home mr-5"></i>Home
            </Link>
            <span></span> <Link to="#"></Link> <span>Product Detail</span>
          </div>
        </div>
      </div>
      <div className="container mb-30" style={{ transform: "none" }}>
        <div
          className="col-xl-11 col-lg-12 m-auto"
          style={{ transform: "none" }}
        >
          <div className="row" style={{ transform: "none" }}>
            <div className="col-xl-12">
              <ProductDetail />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
