import { Link, useNavigate } from "react-router-dom";
import { allProduct_url } from "../../../../config/env";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../../context/CartContext";
import { WishListContext } from "../../../../context/WishListContext";
import { MyAccountContext } from "../../../../context/AccountContext";
import productImg from "../../../../assets//imgs/banner/product.jpg";

export const PopularProducts = () => {
  const navigate = useNavigate();
  const { userId } = useContext(MyAccountContext);
  const { addProducts } = useContext(CartContext);
  const { addToWishList } = useContext(WishListContext);
  const [myproduct, setMyProduct] = useState([]);
  const [selectedProductDesc, setSelectedProductDesc] = useState("");

  const handleHeartClick = (itemId) => {
    if (userId !== null) {
      addToWishList(itemId);
    } else {
      navigate("/login");
    }
  };
  const handleAddToCart = (productId, quantity, productDesc) => {
    if (userId !== null) {
      addProducts(productId, quantity);
      setSelectedProductDesc(productDesc);
      setTimeout(() => {
        setSelectedProductDesc("");
      }, 4000);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    async function AllProductShow() {
      const response = await fetch(`${allProduct_url}&limit=20`);
      const productData = await response.json();
      setMyProduct(productData.data);
    }
    AllProductShow();
  }, []);

  return (
    <>
      <div className="product-tabs section-padding position-relative">
        <div className="container">
          <div
            className="section-title style-2 wow animate__ animate__fadeIn"
            style={{
              visibility: "visible",
              animationDelay: "0.4s",
              animationName: "fadeIn",
            }}
          >
            <h3>Popular Products</h3>
          </div>
          <div className="row product-grid">
            {myproduct?.map((item, index) => (
              <div key={index} className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <div className="product-cart-wrap mb-30">
                  <div className="product-img-action-wrap">
                    <div className="product-img product-img-zoom">
                      <Link to={`/product/${item.strSEOLink}`}>
                        {item.strImageThumbnail ? (
                          <>
                            <img
                              className="default-img"
                              src={item.strImageThumbnail || productImg}
                              onError={(e) => {
                                e.target.onError = null;
                                e.target.src = productImg;
                              }}
                              alt=""
                            />
                            <img
                              className="hover-img"
                              src={item.strImageThumbnail}
                              alt=""
                              onError={(e) => {
                                e.target.onError = null;
                                e.target.src = productImg;
                              }}
                            />
                          </>
                        ) : (
                          <img
                            className="default-img"
                            src={productImg}
                            alt=""
                          />
                        )}
                      </Link>
                    </div>
                    <div className="product-action-1">
                      <a
                        aria-label="Add To Wishlist"
                        className="action-btn"
                        onClick={() => handleHeartClick(item?.intID)}
                      >
                        <i className="fi-rs-heart"></i>
                      </a>

                      <Link
                        to={`/product/${item.strSEOLink}`}
                        aria-label="Quick view"
                        className="action-btn"
                      >
                        <i className="fi-rs-eye"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="product-content-wrap">
                    <div className="product-category">
                      <Link to={`/product/${item.strSEOLink}`}>
                        {item.strItemCategory}
                      </Link>
                    </div>
                    <h2>
                      <Link to={`/product/${item.strSEOLink}`}>
                        {item.strDesc}
                      </Link>
                    </h2>

                    <div>
                      <span className="font-small text-muted"></span>
                    </div>

                    <div className="product-card-bottom">
                      <div className="product-price">
                        <span>Rs: {item.dblSalePrice}</span>
                      </div>
                      <div className="contact-info">
                        <div className="social-info">
                          <h4>{selectedProductDesc}</h4>
                        </div>
                      </div>
                      <div className="add-cart">
                        <button
                          id="feature-prod-btn1500"
                          type="button"
                          className="btn btn-heading add_in_cart"
                          onClick={() =>
                            handleAddToCart(item.intID, 1, item.strDesc)
                          }
                        >
                          <i className="fi-rs-shopping-cart mr-5"></i>Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
