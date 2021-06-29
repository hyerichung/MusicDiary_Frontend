import React from "react";
import HeaderWithLogo from "./HeaderWithLogo";
import DefaultHeader from "./DefaultHeader";

const Header = ({ logo }) => {
  return <>{logo ? <HeaderWithLogo /> : <DefaultHeader />}</>;
};

export default Header;
