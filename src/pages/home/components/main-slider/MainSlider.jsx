import { useContext, useRef } from "react";
import Slider from "react-slick";
import { mainSlider } from "./data";
import { AddressContext } from "../../../../context/AddresContext";

export const MainSlider = () => {
  const { mainSlider } = useContext(AddressContext);
  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    dots: true,
    autoplay: true,
    arrows: true,
  };
  // console.log("The Main Slider ",mainSlider)
  return (
    <section className="home-slider position-relative mb-30">
      <div className="container">
        <div className="home-slide-cover mt-30">
          <Slider
            ref={sliderRef}
            {...settings}
            className="hero-slider-1 style-4 dot-style-1 dot-style-1-position-1"
          >
            {mainSlider?.map((item, index) => {
              return (
                <div
                  className={`single-hero-slider single-animation-wrap slide0${index}`}
                  key={index}
                >
                  <div className="slider-content"></div>
                </div>
              );
            })}
          </Slider>
          <div className="slider-arrow hero-slider-1-arrow">
            <span className="slider-btn slider-prev" onClick={next}>
              <i className="fi-rs-angle-left"></i>
            </span>
            <span className="slider-btn slider-next" onClick={previous}>
              <i className="fi-rs-angle-right"></i>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
