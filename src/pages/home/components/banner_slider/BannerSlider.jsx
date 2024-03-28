import { useContext } from "react";
import Slider from "react-slick";

import { AddressContext } from "../../../../context/AddresContext";
export const BannerSlider = () => {
  const { bannerSlider } = useContext(AddressContext);
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <section
      className="newsletter mb-15 wow animate__ animate__fadeIn animated"
      style={{
        visibility: "visible",
        animationDelay: "0.4s",
        animationName: "fadeIn",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="slider-container">
              <Slider {...settings}>
                {bannerSlider?.map((image, index) => (
                  <div
                    key={index}
                    className="banner-img wow animate__ animate__fadeInUp animated"
                    data-wow-delay="0"
                    style={{ visibility: "visible", animationName: "fadeInUp" }}
                  >
                    <img src={image?.strURL} alt={`Slide ${index}`} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
