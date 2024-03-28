import { Link } from "react-router-dom";
import img1 from "../../../../assets/imgs/banner/teachers.png";
import img2 from "../../../../assets/imgs/banner/dummy-shop.png";

export const ShopMenuBar = () => {
  return (
    <>
      <section className="featured section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 mb-md-4 mb-xl-0"></div>
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 mb-md-4 mb-xl-0">
              <div className="product-cart-wrap hover-up">
                <div className="product-img-action-wrap">
                  <div className="product-img product-img-zoom">
                    <Link to="/teachers" tabIndex="0">
                      <img className="default-img" src={img1} alt="" />
                      <img className="hover-img" src={img1} alt="" />
                    </Link>
                  </div>
                  <div className="product-action-1"></div>
                  <div className="product-badges product-badges-position product-badges-mrg"></div>
                </div>
                <div className="product-content-wrap" id="productContent">
                  <h2>
                    <Link to="/teachers" tabIndex="0">
                      Teachers
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 mb-md-4 mb-xl-0"></div>
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 mb-md-4 mb-xl-0">
              <div className="product-cart-wrap hover-up">
                <div className="product-img-action-wrap">
                  <div className="product-img product-img-zoom">
                    <Link to="/shop" tabIndex="0">
                      <img className="default-img" src={img2} alt="" />
                      <img className="hover-img" src={img2} alt="" />
                    </Link>
                  </div>
                  <div className="product-action-1"></div>
                  <div className="product-badges product-badges-position product-badges-mrg"></div>
                </div>
                <div className="product-content-wrap" id="productContent">
                  <h2>
                    <Link to="/shop" tabIndex="0">
                      Authorized Book Shops
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 mb-md-4 mb-xl-0"></div>
          </div>
        </div>
      </section>
    </>
  );
};
