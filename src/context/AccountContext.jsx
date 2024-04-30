/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import { cms_imgs, cms_url, shipAddres_url } from "../config/env";

export const MyAccountContext = createContext({});

export const MyAccountProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [customerId, setCustomerId] = useState(localStorage.getItem("customerId"));
  const [strToken, setStrToken] = useState(localStorage.getItem("strToken"));
  // console.log("user id globel =>>", userId);

  const [userAddress, setUserAddress] = useState();
  const [manuLogo, setManuLogo] = useState();
  const [helpLine, setHelpLine] = useState();
  const [contactInfo, setContactInfo] = useState();
  async function userDetails() {
    // console.log("user id user details funtion===>", userId);
    const response = await fetch(
      `${shipAddres_url}&tag=get_user_shipment_address&intUserID=${userId}`
    );
    const bannerData = await response.json();

    setUserAddress(bannerData?.data);
  }

  async function ManuLogDisplay() {
    const response = await fetch(`${cms_imgs}&intGroupID=7`);
    const userData = await response.json();

    setManuLogo(userData?.data[0]);
  }
  async function HelpLineNoDisplay() {
    const response = await fetch(`${cms_url}&intID=677`);
    const userData = await response.json();

    setHelpLine(userData?.data[0]);
  }
  async function ContectUs() {
    const response = await fetch(`${cms_url}&intID=676`);
    const userData = await response.json();

    setContactInfo(userData?.data[0]);
  }

  useEffect(() => {
    userDetails();
    ManuLogDisplay();
    HelpLineNoDisplay();
    ContectUs();
  }, [userId]);

  return (
    <MyAccountContext.Provider
      value={{
        userId,
        setUserId,
        userAddress,
        manuLogo,
        helpLine,
        loading,
        setLoading,
        contactInfo,
        customerId, 
        setCustomerId,
        strToken, 
        setStrToken
      }}
    >
      {children}
    </MyAccountContext.Provider>
  );
};
