// src/components/PropertyDetailsModal.jsx
import React from "react";
import Modal from "react-modal";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

Modal.setAppElement("#root"); // Required for accessibility

const PropertyDetailsModal = ({
  isOpen,
  onRequestClose,
  property,
  related,
  onRelatedClick,
}) => {
  if (!property) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Property Details"
      className="max-w-6xl mx-auto mt-10 bg-white rounded-lg p-6 overflow-auto max-h-screen"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center"
    >
      {/* Close Button */}
      <button
        onClick={onRequestClose}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        Close ✖
      </button>

      {/* Main Card */}
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={property.images?.[0] || "https://via.placeholder.com/400"}
          alt={property.title}
          className="w-full h-96 object-cover rounded"
        />
        <div>
          <h1 className="text-3xl font-bold mb-3">{property.title}</h1>
          <p className="text-gray-600 flex items-center gap-2 mb-1">
            <FaMapMarkerAlt /> {property.location}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Type:</strong> {property.type}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Status:</strong> {property.status}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Price:</strong> ₹{property.price.toLocaleString()}
          </p>

          <div className="mt-4 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
            <p className="text-gray-700">
              <strong>Name:</strong> {property.contactName}
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <FaPhone /> {property.phone}
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <FaEnvelope /> {property.email}
            </p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {property.images?.length > 1 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">More Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {property.images.slice(1).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Property image ${idx + 2}`}
                className="h-48 object-cover rounded shadow"
              />
            ))}
          </div>
        </div>
      )}

      {/* Map Placeholder */}
      <div className="bg-gray-100 h-64 mt-8 flex items-center justify-center rounded text-gray-500">
        [📍Map showing location: {property.location}]
      </div>

      {/* Related Properties */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Related Properties</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow p-4 rounded hover:shadow-lg transition cursor-pointer"
                onClick={() => onRelatedClick(item._id)}
              >
                <img
                  src={item.images?.[0] || "https://via.placeholder.com/300"}
                  alt={item.title}
                  className="h-48 w-full object-cover rounded mb-2"
                />
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.location}</p>
                <p className="text-sm text-gray-700">
                  ₹{item.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PropertyDetailsModal;
