import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContex.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PropertyForm = () => {
  const { addProperty, baseUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    type: "",
    status: "Available",
    contactName: "",
    email: "",
    phone: "",
  });

  const [images, setImages] = useState([]); // [{ file, preview, uploaded, url }]
  const [progress, setProgress] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4 - images.length);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      uploaded: false,
      url: "",
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleUpload = async (index) => {
    const imageToUpload = images[index];
    const formData = new FormData();
    formData.append("image", imageToUpload.file);

    try {
      setProgress((prev) => ({ ...prev, [index]: 0 }));

      const response = await axios.post(`${baseUrl}/api/upload/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress((prev) => ({ ...prev, [index]: percent }));
        },
      });

      const url = response.data.url;
      setImages((prev) =>
        prev.map((img, i) =>
          i === index ? { ...img, uploaded: true, url } : img
        )
      );
      toast.success(`Image ${index + 1} uploaded successfully!`);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Image upload failed.");
    }
  };

  const handleDelete = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[index];
      return newProgress;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.some((img) => !img.uploaded)) {
      toast.error("Please upload all selected images.");
      return;
    }

    const imageUrls = images.map((img) => img.url);
    addProperty({
      title: formData.title,
      description:formData.description,
      location: formData.location,
      price: formData.price,
      type: formData.type,
      status: formData.status,
      contactName: formData.contactName,
      email: formData.contactEmail, // 🔁 corrected
      phone: formData.contactPhone, // 🔁 corrected
      images: imageUrls, // 🔁 match backend field name
    });

    toast.success("Property Successfully Added");
    navigate("/");

    setFormData({
      title: "",
      description: "",
      location: "",
      price: "",
      type: "",
      status: "Available",
      contactName: "",
      email: "",
      phone: "",
    });
    setImages([]);
    setProgress({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-5"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Add Property
      </h2>

      {/* Input Fields */}
      {["title", "location", "price", "type", "status","description"].map((field) => (
        <div key={field}>
          <label className="block mb-1 text-gray-600">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
            placeholder={`Enter ${field}`}
          />
        </div>
      ))}
      {/* <div>
        <label className="block mb-1 text-gray-600">Description</label>
        <textarea placeholder="Short Description" className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400" />
      </div> */}

      {/* Contact Info */}
      <hr />
      <h3 className="text-xl font-semibold text-gray-700">Contact Info</h3>
      {[
        { label: "Name", name: "contactName", type: "text" },
        { label: "Email", name: "contactEmail", type: "email" },
        { label: "Phone", name: "contactPhone", type: "tel" },
      ].map((field) => (
        <div key={field.name}>
          <label className="block mb-1 text-gray-600">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
            placeholder={`Enter ${field.label}`}
          />
        </div>
      ))}

      {/* Image Upload */}
      <hr />
      <h3 className="text-xl font-semibold text-gray-700">
        Upload Images (Max 4)
      </h3>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        disabled={images.length >= 4}
        className="mb-4"
      />

      {/* Preview + Upload Button + Progress */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative border rounded p-2 shadow-sm">
            <img
              src={img.preview}
              alt={`preview-${index}`}
              className="w-full h-28 object-cover rounded"
            />
            <div className="flex justify-between mt-2 text-sm">
              {!img.uploaded ? (
                <button
                  type="button"
                  onClick={() => handleUpload(index)}
                  className="text-green-600 hover:underline"
                >
                  Upload
                </button>
              ) : (
                <span className="text-green-700">Uploaded</span>
              )}
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>

            {/* Progress Bar */}
            {!img.uploaded && progress[index] >= 0 && (
              <div className="w-full bg-gray-200 h-2 rounded mt-2">
                <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${progress[index]}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
      >
        Submit Property
      </button>
    </form>
  );
};

export default PropertyForm;
