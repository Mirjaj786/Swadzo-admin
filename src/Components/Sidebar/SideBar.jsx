import React from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets.js";
import { NavLink } from "react-router-dom";
function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to={"/"} className="sidebar-option">
          <img src={assets.order_icon} alt="dashboard_icon" />
          <p>Dashboard</p>
        </NavLink>

        <NavLink to={"/add_food"} className="sidebar-option">
          <img src={assets.add_icon} alt="add_icon" />
          <p>Add Item</p>
        </NavLink>

        <NavLink to={"/list_food"} className="sidebar-option">
          <img src={assets.order_icon} alt="Order-icon" />
          <p>List Items</p>
        </NavLink>

        <NavLink to={"/orders"} className="sidebar-option">
          <img src={assets.order_icon} alt="Order-icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
