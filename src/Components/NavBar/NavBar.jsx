import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import "./NavBar.css";
function NavBar() {
  const [showDropDown, setShowDropDown] = React.useState(false);
  const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

  const logout = () => {

    const isConform = window.confirm("Are you sure you want to logout?");
    if (!isConform) return;
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={assets.logo3} alt="logo_image" className="logo" />
      </Link>
      <p>Admin Panel</p>

      <div className="navbar-profile" onClick={() => setShowDropDown(!showDropDown)}>
        <img
          src={assets.profile_image}
          alt="Profile_image"
          className="profile-pic"
        />
        {showDropDown && (
          <ul className="nav-profile-dropdown">
            <li onClick={() => window.location.href = frontendUrl}>
              <span>User Home</span>
            </li>
            <hr />
            <li onClick={logout}>
              <span>Logout</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default NavBar;
