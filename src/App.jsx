import React, { useState, useEffect } from "react";
import "./index.css";
import Navbar from "./Components/NavBar/NavBar.jsx";
import Sidebar from "./Components/Sidebar/SideBar.jsx";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import AddFood from "./Pages/AddFood/AddFood.jsx";
import ListFood from "./Pages/ListFood/ListFood.jsx";
import Orders from "./Pages/Orders/Orders.jsx";
import Login from "./Pages/Login/Login.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function App() {
  const url = "http://localhost:4000";
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);
    const urlToken = queryParams.get("token");

    if (urlToken) {
      localStorage.setItem("token", urlToken);
      setToken(urlToken);
      window.history.replaceState({}, document.title, "/");
    } else if (!token) {
      toast.error("Please login as a Admin");
      navigate('/login');
    }
  }, [token]);

  return (
    <div>
      <ToastContainer />
      {token === "" ? (
        <Routes>
          <Route path="*" element={<Login url={url} setToken={setToken} />} />
        </Routes>
      ) : (
        <>
          <Navbar />
          <hr />
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Dashboard url={url} />} />
              <Route path="/add_food" element={<AddFood url={url} />} />
              <Route path="/list_food" element={<ListFood url={url} />} />
              <Route path="/orders" element={<Orders url={url} />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
