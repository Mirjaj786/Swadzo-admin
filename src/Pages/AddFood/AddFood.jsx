import { useState } from "react";
import "./AddFood.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function AddFood() {
  const url = import.meta.env.VITE_API_URL;
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    resturant: "",
    description: "",
    price: "",
    category: "All",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmiitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("resturant", data.resturant);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const token = localStorage.getItem("token");
    const res = await axios.post(`${url}/food/new`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: token,
      },
    });

    if (res.data.success) {
      setData({
        name: "",
        resturant: "",
        description: "",
        price: "",
        category: "All",
      });
      setImage(false);
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };
  return (
    <div className="add">
      <form onSubmit={onSubmiitHandler} className="flex-col">
        <div className="image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload_area"
              className="image"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            name="image"
            id="image"
            hidden
          />
        </div>
        <div className="product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        <div className="product-name flex-col">
          <p>Resturant Name</p>
          <input
            onChange={onChangeHandler}
            value={data.resturant}
            type="text"
            name="resturant"
            placeholder="resturant name/hotel name"
            required
          />
        </div>

        <div className="product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            id="description"
            rows="6"
            placeholder="write description"
            required
          ></textarea>
        </div>

        <div className="category-price">
          <div className="category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" id="category">
              <option value="Select Category?">Select..</option>
              <option value="All">All</option>
              <option value="Salad">Salad</option>
              <option value="RollsDeserts">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="SandwichCake">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Non Veg">Non Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Fish">Fish</option>
            </select>
          </div>
          <div className="price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="&#8377; 299"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add Food
        </button>
      </form>
    </div>
  );
}

export default AddFood;
