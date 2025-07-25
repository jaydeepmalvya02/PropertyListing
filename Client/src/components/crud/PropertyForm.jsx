// src/components/PropertyForm.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContex";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PropertyForm = () => {
  const { addProperty } = useContext(AuthContext);
  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    type: "",
    status: "Available",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProperty({ ...formData, id: Date.now() });
    toast.success("Property Successfuly Added")
    navigate('/')
    setFormData({
      title: "",
      location: "",
      price: "",
      image: "",
      type: "",
      status: "Available",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 shadow-xl bg-white rounded-lg"
    >
      <h2 className="text-xl font-bold mb-4">Add Property</h2>
      {["title", "location", "price", "image", "type", "status"].map(
        (field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="w-full mb-3 px-4 py-2 border rounded"
          />
        )
      )}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default PropertyForm;
