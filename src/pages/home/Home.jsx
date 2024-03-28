import { useEffect } from "react";
import { NewsLetterForm } from "../../layouts/NewsLetterForm";
import { MainSlider } from "./components/main-slider/MainSlider";
import { PopularProducts } from "./components/products/PopularProducts";
import { BannerSlider } from "./components/banner_slider/BannerSlider";

export const Home = () => {
  useEffect(() => {
    document.title = "HORECA SYSTEMS | Home";
  }, []);

  return (
    <main className="main">
      <MainSlider />
      <PopularProducts />
      <BannerSlider />
      <NewsLetterForm />
    </main>
  );
};
