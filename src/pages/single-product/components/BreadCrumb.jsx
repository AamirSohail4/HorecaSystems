/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export const BreadCrumb = ({ title, category }) => {
  return (
    <div className="page-header breadcrumb-wrap">
      <div className="container">
        <div className="breadcrumb">
          <Link to="index.html" rel="nofollow">
            <Icon icon="mynaui:home" />
            Home
          </Link>
          <span></span>
          <Link to="shop-grid-right.html">{category}</Link>
          <span></span> {title}
        </div>
      </div>
    </div>
  );
};
