import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { toast } from 'react-toastify';

import Skeleton from '../../Components/Skeleton/Skeleton';

const Dashboard = ({ url }) => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        topSelling: [],
        lowStock: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await axios.get(`${url}/admin/dashboard`, {
                    headers: { token }
                });
                if (response.data.success) {
                    setStats(response.data.data);
                } else {
                    toast.error(response.data.message || "Error fetching dashboard data");
                    if (response.data.message === "Not Authorized Login Again") {
                        localStorage.removeItem("token");
                        window.location.reload();
                    }
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, [url]);

    if (loading) {
        return (
            <div className='dashboard'>
                <h1>Admin Dashboard</h1>
                <div className="stats-container">
                    <Skeleton width="100%" height="150px" borderRadius="10px" />
                    <Skeleton width="100%" height="150px" borderRadius="10px" />
                    <Skeleton width="100%" height="150px" borderRadius="10px" />
                </div>
                <div className="lists-container">
                    <Skeleton width="100%" height="400px" borderRadius="10px" />
                    <Skeleton width="100%" height="400px" borderRadius="10px" />
                </div>
            </div>
        )
    }

    return (
        <div className='dashboard'>
            <h1>Admin Dashboard</h1>

            <div className="stats-container">
                <div className="stat-card">
                    <h3>Total Orders</h3>
                    <p>{stats.totalOrders}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Revenue</h3>
                    <p>₹{stats.totalRevenue}</p>
                </div>
                <div className="stat-card">
                    <h3>Pending Orders</h3>
                    <p>{stats.pendingOrders}</p>
                </div>
            </div>

            <div className="lists-container">
                <div className="list-section">
                    <h2>Sales Analytics (Top Items)</h2>
                    <div className="chart-container">
                        {stats.topSelling.length > 0 ? (
                            stats.topSelling.map((item, index) => {
                                // Calculate percentage relative to the highest selling item for bar height/width
                                const maxQty = Math.max(...stats.topSelling.map(i => i.quantity));
                                const percent = (item.quantity / maxQty) * 100;
                                return (
                                    <div key={index} className="chart-bar-wrapper">
                                        <div className="chart-label">{item.name}</div>
                                        <div className="chart-bar-bg">
                                            <div
                                                className="chart-bar-fill"
                                                style={{ width: `${percent}%` }}
                                                title={`${item.quantity} sold`}
                                            ></div>
                                        </div>
                                        <div className="chart-value">{item.quantity}</div>
                                    </div>
                                )
                            })
                        ) : <p className="no-data">No data to display</p>}
                    </div>
                </div>

                <div className="list-section">
                    <h2>Top Selling Food</h2>
                    <div className="list-table">
                        <div className="list-table-format title">
                            <b>Name</b>
                            <b>Sold</b>
                        </div>
                        {stats.topSelling.length > 0 ? stats.topSelling.map((item, index) => (
                            <div key={index} className="list-table-format">
                                <p>{item.name}</p>
                                <p>{item.quantity}</p>
                            </div>
                        )) : <p className="no-data">No sales yet.</p>}
                    </div>
                </div>

                <div className="list-section future-feature">
                    <h2>Low Stock / Unavailable</h2>
                    <div className="list-table">
                        <div className="list-table-format title">
                            <b>Name</b>
                            <b>Category</b>
                        </div>
                        {stats.lowStock.length > 0 ? stats.lowStock.map((item, index) => (
                            <div key={index} className="list-table-format">
                                <p>{item.name}</p>
                                <p>{item.category}</p>
                            </div>
                        )) : <p className="no-data">All items in stock.</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
