import { useState } from "react";
import productImg from "../../../assets/imgs/banner/product.jpg";
export const Index = () => {
  const [imgUrl, setimgUrl] = useState(
    "https://www.weberp.pk/app/msbooks/images/item/377/ACCOUNTING_P1.png"
  );

  const handleImageError = () => {
    setimgUrl(productImg);
  };
  return imgUrl != "" && imgUrl != null ? (
    <img src={imgUrl} alt="Main Image" onError={() => handleImageError()} />
  ) : (
    <img src={imgUrl} alt="Main Image" />
  );
};
