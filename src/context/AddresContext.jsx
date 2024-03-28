/* eslint-disable react/prop-types */
import { useState, useEffect, createContext, useContext } from "react";
import { cart_url, cms_imgs, cms_url } from "../config/env";
import { MyAccountContext } from "./AccountContext";

export const AddressContext = createContext();

export const AppProvider = ({ children }) => {
  const [shipmentAddres, setShipmentAddress] = useState();
  const [mainSlider, setMainSlider] = useState();
  const [bannerSlider, setBannerSlider] = useState();
  const [bannerText, setBannerText] = useState();
  const [copyRightText, setcopyRightText] = useState();
  const [socialLinks, setSocialMediaLinks] = useState();
  const [socialLinksinsta, setSocialMediaLinksInsta] = useState();
  
  const { userId } = useContext(MyAccountContext);

  const [user, setUser] = useState();

  const [about, setAbout] = useState([]);

  const AboutPageContent = async () => {
    try {
      const response = await fetch(`${cms_url}&intID=678`);
      if (response.ok) {
        const AboutData = await response.json();

        setAbout(AboutData?.data[0]);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const DisplayShipAddres = async () => {
    try {
      const response = await fetch(
        `${cart_url}&tag=get_user_shipment_address_web&intUserID=${userId}`
      );
      if (response.ok) {
        const shipmentData = await response.json();

        setShipmentAddress(shipmentData?.data);
        setUser(shipmentData?.data[0]);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  const deleteUserAddres = async (productId) => {
    let data = new FormData();
    data.append("intUserID", userId);
    data.append("intID", productId?.intID);

    const response = await fetch(
      `${cart_url}&tag=delete_user_shipment_address_web`,
      {
        method: "POST",
        body: data,
      }
    );
    if (response.ok) {
      DisplayShipAddres();
    }
  };
  const HeroeSliderContent = async () => {
    try {
      const response = await fetch(`${cms_imgs}&intGroupID=5`);
      if (response.ok) {
        const sliderData = await response.json();
        setMainSlider(sliderData?.data);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  const bannerSliderContent = async () => {
    try {
      const response = await fetch(`${cms_imgs}&intGroupID=6`);
      if (response.ok) {
        const sliderData = await response.json();
        setBannerSlider(sliderData?.data);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const bannerTextContent = async () => {
    try {
      const response = await fetch(`${cms_url}&intID=679`);
      if (response.ok) {
        const BannerData = await response.json();

        setBannerText(BannerData?.data[0]);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const copyRightContent = async () => {
    try {
      const response = await fetch(`${cms_url}&intID=680`);
      if (response.ok) {
        const BannerData = await response.json();

        setcopyRightText(BannerData?.data[0]);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const SocialMediaLinks = async () => {
    try {
      const response = await fetch(`${cms_imgs}&intGroupID=8`);
      if (response.ok) {
        const BannerData = await response.json();

        setSocialMediaLinks(BannerData?.data[0]);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  const SocialMediaLinksInsta = async () => {
    try {
      const response = await fetch(`${cms_imgs}&intGroupID=9`);
      if (response.ok) {
        const BannerData = await response.json();

        setSocialMediaLinksInsta(BannerData?.data[0]);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    DisplayShipAddres();
    AboutPageContent();
    HeroeSliderContent();
    bannerSliderContent();
    bannerTextContent();
    copyRightContent();
    SocialMediaLinks();
    SocialMediaLinksInsta();
  }, [userId]);

  return (
    <AddressContext.Provider
      value={{
        DisplayShipAddres,
        shipmentAddres,
        user,
        deleteUserAddres,
        about,
        mainSlider,
        bannerSlider,
        bannerText,
        copyRightText,
        socialLinks,
        socialLinksinsta
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
