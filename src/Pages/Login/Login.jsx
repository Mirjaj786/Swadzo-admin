import React, { useState } from 'react';
import './Login.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = ({ url, setToken }) => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onLogin = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${url}/user/login`, data);
            if (response.data.success) {
                if (response.data.user.role === "admin") {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    toast.success("Welcome Admin!");
                    navigate("/"); // Redirect to dashboard
                } else {
                    toast.error("You are not an Admin!");
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Login failed or Server Error");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='login'>
            <form onSubmit={onLogin} className="login-container">
                <div className="login-title">
                    <h2>Admin Panel Login</h2>
                </div>
                <div className="login-inputs">
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit' disabled={loading}>
                    {loading ? "Login..." : "Login"}
                </button>
                <p> <Link to="http://localhost:5173/">Go toHome</Link></p>
            </form>
        </div>
    )
}

export default Login;
