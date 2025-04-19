import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Cardss(props) {
  let dispatch = useDispatchCart();
  let data = useCart();

  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  let options = props.options || {}; // Ensure options is an object
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItems;

  let navigate = useNavigate();

  useEffect(() => {
    if (priceOptions.length > 0) {
      setSize(priceOptions[0]); // Set default size to first option
    }
  }, [priceOptions]);

  const handleQty = (e) => setQty(e.target.value);
  const handleOptions = (e) => setSize(e.target.value);

  const handleAddToCart = () => {
    let existingFood = data.find(
      (item) => item.id === foodItem._id && item.size === size
    );

    let price = qty * (parseInt(options[size]) || 0);

    if (existingFood) {
      dispatch({
        type: "UPDATE",
        id: foodItem._id,
        price: price,
        qty: qty,
      });
    } else {
      dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: price,
        qty: qty,
        size: size,
        img: props.ImgSrc || foodItem.img,
      });
    }
  };

  let price = qty * (parseInt(options[size]) || 0);

  return (
    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
      {/* Image */}
      <img
        src={props.ImgSrc || foodItem.img}
        className="card-img-top"
        alt={foodItem.name}
        style={{ height: "120px", objectFit: "cover" }}
      />

      {/* Card Body */}
      <div className="card-body">
        <h5 className="card-title">{foodItem.name}</h5>

        {/* Quantity Dropdown */}
        <select
          className="m-2 h-100 w-20 bg-success text-black rounded"
          onChange={handleQty}
          value={qty}
        >
          {[...Array(6).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        {/* Size Dropdown */}
        <select
          className="m-2 h-100 w-20 bg-success text-black rounded"
          ref={priceRef}
          onChange={handleOptions}
          value={size}
        >
          {priceOptions.map((data) => (
            <option key={data} value={data}>
              {data}
            </option>
          ))}
        </select>

        {/* Final Price */}
        <div className="d-inline ms-2 h-100 fs-5" style={{ width: "20%" }}>
          ₹{price}/-
        </div>
      </div>

      <hr />

      {/* Add to Cart Button */}
      <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}
