import React from "react";
import "./Orders.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets.js";
import Skeleton from '../../Components/Skeleton/Skeleton';

function Orders({ url }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/listorders`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      const res = await axios.post(`${url}/order/updatestatus`, {
        orderId: orderId,
        status: newStatus,
      });

      if (res.data.success) {
        await fetchOrders();
      }

      toast.success("Order status updated");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status");
      return;
    }
  };
  return (
    <div className="order add">
      <h3 className="order-title">All Orders</h3>

      <div className="order-list">
        {loading ? (
          Array(3).fill(0).map((_, index) => (
            <div className="order-card" key={index} style={{ gap: '20px' }}>
              <Skeleton width="100px" height="80px" borderRadius="4px" />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Skeleton width="60%" height="20px" borderRadius="4px" />
                <Skeleton width="80%" height="20px" borderRadius="4px" />
                <Skeleton width="40%" height="20px" borderRadius="4px" />
              </div>
            </div>
          ))
        ) : (orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-icon">
              <img src={assets.parcel_icon} alt="Parcel" />
            </div>

            <div className="order-details">
              <p className="order-items">
                <strong>Items:</strong>{" "}
                {order.items.map((item, index) =>
                  index === order.items.length - 1
                    ? `${item.name} × ${item.quantity}`
                    : `${item.name} × ${item.quantity}, `
                )}
              </p>

              <p className="order-customer">👤 {order.address.fullName}</p>

              <p className="order-address">
                📍 {order.address.landmark}, {order.address.fullAddress},
                {order.address.city} - {order.address.pincode},
                {order.address.state}
              </p>

              <p className="order-phone">📞 {order.address.phone}</p>
            </div>

            <div className="order-meta">
              <p className="order-count">
                Items: <strong>{order.items.length}</strong>
              </p>

              <p className="order-price">₹ {order.amount}</p>

              <select
                onChange={(event) => statusHandler(event, order._id)}
                className="order-status"
                value={order.status}
              >
                <option value="Preparing">Preparing</option>
                <option value="Pending">Pending</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancel">Cancel</option>
              </select>
            </div>
          </div>
        )))}
      </div>
    </div >
  );
}

export default Orders;
