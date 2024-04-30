import Slider from "react-slick";
import he from "he";
import Zoom from "react-img-zoom-gdn";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { allProduct_url } from "../../../config/env";

import { WishListContext } from "../../../context/WishListContext";
import { MyAccountContext } from "../../../context/AccountContext";
import productImg from "../../../assets/imgs/banner/product.jpg";
import { CartContext } from "../../../context/CartContext";

export const ProductDetail = () => {
  const navigate = useNavigate();
  const { strSEOLink } = useParams();
  const { addProducts } = useContext(CartContext);
  const { addToWishList } = useContext(WishListContext);
  const { userId } = useContext(MyAccountContext);
  const [singleproduct, setSingleProduct] = useState();
  const [strSpec, setStrSpec] = useState("");
  const [teacherProfileData, setTeacherProfile] = useState("");
  const [quantity, setQuantity] = useState(1);
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
  const handleDec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleInc = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    async function SingleProductShow() {
      const response = await fetch(
        `${allProduct_url}&&strSEOLink=${strSEOLink}`
      );
      const productData = await response.json();

      setSingleProduct(productData?.data[0]);
      setStrSpec(productData?.data[0]?.strSpecifications);
      setTeacherProfile(productData?.data[0]?.supplier[0]?.strProfile);
    }
    SingleProductShow();
  }, [strSEOLink]);
  console.log("The Porduct fetch on the base of id", singleproduct);

  let profileValue = teacherProfileData;
  const htmlContent = he.decode(strSpec);
  const htmlContent1 = he.decode(profileValue ? profileValue : "");

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const next = () => {
    slider2.current.slickNext();
  };

  const previous = () => {
    slider2.current.slickPrev();
  };

  const PrevArrow = () => {
    return (
      <button
        type="button"
        className="slick-prev slick-arrow"
        onClick={previous}
      >
        <i className="fi-rs-arrow-small-left"></i>
      </button>
    );
  };
  const NextArrow = () => {
    return (
      <button type="button" className="slick-next slick-arrow" onClick={next}>
        <i className="fi-rs-arrow-small-right"></i>
      </button>
    );
  };
  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const thumSetting = {
    asNavFor: nav1,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    dots: false,
    adaptiveHeight: true,

    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="product-detail accordion-detail">
      <div className="row mb-50 mt-30">
        <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
          <div className="detail-gallery">
            <span className="zoom-icon">
              <i className="fi-rs-search"></i>
            </span>

            <Slider
              asNavFor={nav2}
              ref={slider1}
              className="product-image-slider"
              slidesToShow={1}
              slidesToScroll={1}
              arrows={false}
              fade={false}
            >
              <figure className="border-radius-10">
                {singleproduct?.strImageThumbnail ? (
                  <Zoom
                    img={singleproduct?.strImageThumbnail}
                    zoomScale={1.5}
                    height={500}
                    width={500}
                    transitionTime={0.5}
                  />
                ) : (
                  <img src={productImg} alt="Default Product Image" />
                )}
              </figure>
            </Slider>
            <Slider
              ref={slider2}
              {...thumSetting}
              className="slider-nav-thumbnails"
            >
              <div>
                <img
                  src={singleproduct?.strImageThumbnail || productImg}
                  alt="product image"
                />
              </div>
            </Slider>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 col-xs-12">
          <div className="detail-info pr-30 pl-30">
            <h2 className="title-detail">{singleproduct?.strDesc}</h2>
            <div className="clearfix product-price-cover">
              <div className="product-price primary-color float-left">
                <span className="current-price text-brand">
                  {/* {singleproduct?.strUOM} */}
Rs:
                  {new Intl.NumberFormat("en-US", {
                    style: "decimal",
                  }).format(singleproduct?.dblSalePrice)}
                </span>
              </div>
              <div className="contact-info">
                <div className="social-info">
                  <h4>{selectedProductDesc}</h4>
                </div>
              </div>
            </div>
            <div className="detail-extralink mb-50">
              <div className="detail-qty border radius">
                <Link to="#" className="qty-down">
                  <i className="fi-rs-angle-small-down" onClick={handleDec}></i>
                </Link>
                <span className="qty-val">{quantity}</span>
                <Link to="#" className="qty-up" onClick={handleInc}>
                  <i className="fi-rs-angle-small-up"></i>
                </Link>
              </div>
              <div className="product-extra-link2">
                <button
                  type="submit"
                  className="button button-add-to-cart"
                  onClick={() =>
                    handleAddToCart(
                      singleproduct?.intID,
                      quantity,
                      singleproduct?.strDesc
                    )
                  }
                >
                  <i className="fi-rs-shopping-cart"></i>Add to cart
                </button>
                <Link
                  aria-label="Add To Wishlist"
                  className="action-btn"
                  onClick={() => handleHeartClick(singleproduct?.intID)}
                >
                  <i className="fi-rs-heart"></i>
                </Link>
              </div>
            </div>

            <div className="row">
              <div className="font-xs">
                <ul className="mr-50 float-start">
                  <li className="mb-5">
                    Category:
                    <span className="text-brand">
                      {singleproduct?.strItemCategory}
                    </span>
                  </li>
                </ul>
                {/* <ul className="float-start">
                  <li className="mb-5">
                    Syllabus:
                    <Link to="#">
                      {singleproduct?.attributes[4]?.strAttributeValue}
                    </Link>
                  </li>
                  <li className="mb-5">
                    Binding:
                    <Link to="#" rel="tag">
                      Ring Binding
                    </Link>
                  </li>
                  <li>
                    Edition:
                    <span className="in-stock text-brand ml-5">S15-W22</span>
                  </li>
                </ul> */}
              </div>
            </div>
            <br></br>
            {/* <div className="row">
              <div className="short-desc mb-30">
                <div
                  dangerouslySetInnerHTML={{
                    __html: htmlContent,
                  }}
                />
              </div>
            </div> */}
            {/* <div className="row">
              <div className="short-desc mb-30">
                <section className="product-tabs section-padding position-relative">
                  <div className="container">
                    <div
                      className="section-title style-2 wow animate__ animate__fadeIn animated"
                      style={{ visibility: "visible", animationName: "fadeIn" }}
                    >
                      <div>
                        {singleproduct?.supplier[0]?.strDesc ? (
                          <div>
                            <h4>Teacher Profile</h4>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {singleproduct?.supplier[0]?.strDesc &&
                      singleproduct?.supplier[0]?.strProfilePicture && (
                        <div className="col-sm-6">
                          <div className="product-cart-wrap">
                            <div className="product-img-action-wrap">
                              <div className="product-img product-img-zoom">
                                <Link
                                  to={`/teacher/${singleproduct?.supplier[0].strSEOLink}/${singleproduct?.supplier[0].intID}`}
                                >
                                  <img
                                    className="default-img"
                                    src={
                                      singleproduct.supplier[0]
                                        .strProfilePicture
                                    }
                                    alt=""
                                  />
                                  <img
                                    className="hover-img"
                                    src={
                                      singleproduct.supplier[0]
                                        .strProfilePicture
                                    }
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    <div
                      dangerouslySetInnerHTML={{
                        __html: htmlContent1,
                      }}
                    />
                  </div>
                </section>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* <div className="row mt-60">
        {singleproduct?.related_items &&
        singleproduct.related_items.length > 0 ? (
          <h2 className="section-title style-1 mb-30">Related products</h2>
        ) : null}
        <div className="col-12">
          <div className="row related-products">
            {singleproduct?.related_items.map((item, index) => {
              return (
                <div key={index} className="col-lg-3 col-md-4 col-12 col-sm-6">
                  <div className="product-cart-wrap hover-up">
                    <div className="product-img-action-wrap">
                      <div className="product-img product-img-zoom">
                        <Link to={`/product/${item.intID}`} tabIndex="0">
                          <img
                            className="default-img"
                            src={item?.strImage}
                            alt=""
                          />
                          <img
                            className="hover-img"
                            src={item?.strImage}
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="product-action-1">
                        <Link
                          aria-label="Quick view"
                          className="action-btn small hover-up"
                          to={`/product/${item?.intID}`}
                        >
                          <i className="fi-rs-eye"></i>
                        </Link>

                        <Link
                          aria-label="Add To Wishlist"
                          className="action-btn"
                          onClick={() => handleHeartClick(item?.intID)}
                        >
                          <i className="fi-rs-heart"></i>
                        </Link>
                      </div>
                      <div className="product-badges product-badges-position product-badges-mrg"></div>
                    </div>
                    <div className="product-content-wrap">
                      <div className="product-category">
                        <Link to={`/product/${item.intID}`}>
                          {item?.strItemCategory}
                        </Link>
                      </div>
                      <h2>
                        <Link to={`/product/${item.intID}`}>
                          {item?.strDesc}
                        </Link>
                      </h2>
                      <div className="product-card-bottom">
                        <div className="product-price">
                          <span>
                            {item?.strUOM}
                            {new Intl.NumberFormat("en-US", {
                              style: "decimal",
                            }).format(item?.dblSalePrice)}
                          </span>
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
                            <i className="fi-rs-shopping-cart mr-5"></i>Add{" "}
                          </button>

                          <div className="overlay"></div>
                        </div>
                        <div className="contact-info">
                          <div className="social-info">
                            <h4>{selectedProductDesc}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
    </div>
  );
};
