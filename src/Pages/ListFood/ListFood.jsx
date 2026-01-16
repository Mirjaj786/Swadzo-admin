import React, { useEffect, useState } from "react";
import "./ListFood.css";
import axios from "axios";
import { toast } from "react-toastify";

import Skeleton from '../../Components/Skeleton/Skeleton';

function ListFood({ url }) {

  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/food/list`);

      if (response.data.success) {
        setFoodList(response.data.data);
      } else {
        toast.error("Error fetching food list!");
      }
    } catch (error) {
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  const removeFood = async (food_id) => {
    try {
      const isConfirm = confirm("are you sure to delete?");
      if (!isConfirm) return;
      const token = localStorage.getItem("token");
      const res = await axios.post(`${url}/food/remove`, { id: food_id }, { headers: { token } });
      if (res.data.success) {
        toast.success("Food removed.");
      }
      await fetchFoodList();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="food-list add flex-col">
      <p>Foods</p>

      <div className="food-list-table">
        <div className="food-list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {loading ? (
          Array(5).fill(0).map((_, index) => (
            <div key={index} className="food-list-table-format">
              <Skeleton width="100%" height="50px" borderRadius="4px" />
              <Skeleton width="100%" height="20px" borderRadius="4px" />
              <Skeleton width="100%" height="20px" borderRadius="4px" />
              <Skeleton width="100%" height="20px" borderRadius="4px" />
              <Skeleton width="100%" height="20px" borderRadius="4px" />
            </div>
          ))
        ) : (foodList.map((food, index) => (
          <div key={food._id || index} className="food-list-table-format">
            <img
              className="food-image"
              src={`${url}/images/${food.image}`}
              alt={food.name}
            />
            <p>{food.name}</p>
            <p>{food.category}</p>
            <p>₹ {food.price}</p>
            <p onClick={() => removeFood(food._id)} className="delete">
              X
            </p>
          </div>
        )))}
      </div>
    </div>
  );
}

export default ListFood;
