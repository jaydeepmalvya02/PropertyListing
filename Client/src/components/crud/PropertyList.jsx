import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { AuthContext } from "../../context/AuthContex";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Set accessibility root
Modal.setAppElement("#root");

const PropertyList = () => {
  const [search, setSearch] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const { propertiesData } = useContext(AuthContext);
  const navigate=useNavigate()
  const filteredProperties = propertiesData.filter(
    (property) =>
      property.title.toLowerCase().includes(search.toLowerCase()) ||
      property.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleCloseModal = () => setSelectedProperty(null);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Search & Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by location or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-md w-full md:w-1/2 mb-4 md:mb-0"
        />
        <button
          onClick={() => navigate('/add-property')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Property
        </button>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-lg shadow-md overflow-hidden border hover:translate-y-[-10px] transition-all"
          >
            <img
              src={property.images?.[1] || "https://via.placeholder.com/400"}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{property.title}</h2>
              <p className="text-gray-600">{property.location}</p>
              <p className="mt-1 text-sm text-gray-800">
                ₹{property.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                {property.bedrooms} BHK • {property.bathrooms} Bath •{" "}
                {property.area}
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setSelectedProperty(property)}
                  className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-100"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredProperties.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No properties match your search.
          </p>
        )}
      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <Modal
          isOpen={!!selectedProperty}
          onRequestClose={handleCloseModal}
          contentLabel="Property Details"
          className="max-w-6xl mx-auto mt-10 bg-white rounded-lg p-6 overflow-auto max-h-[90vh]"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50"
        >
          <button
            onClick={handleCloseModal}
            className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            ✖ Close
          </button>

          <div className="grid md:grid-cols-2 gap-6">
            <img
              src={
                selectedProperty.images?.[0] ||
                "https://via.placeholder.com/400"
              }
              alt={selectedProperty.title}
              className="w-full h-96 object-cover rounded"
            />
            <div>
              <h1 className="text-3xl font-bold mb-3">
                {selectedProperty.title}
              </h1>
              <p className="text-gray-600 flex items-center gap-2 mb-1">
                <FaMapMarkerAlt /> {selectedProperty.location}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Type:</strong> {selectedProperty.type}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Status:</strong> {selectedProperty.status}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Price:</strong> ₹
                {selectedProperty.price.toLocaleString()}
              </p>

              <div className="mt-4 border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
                <p className="text-gray-700">
                  <strong>Name:</strong> {selectedProperty.contactName}
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <FaPhone /> {selectedProperty.phone}
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <FaEnvelope /> {selectedProperty.email}
                </p>
              </div>
            </div>
          </div>

          {/* Gallery */}
          {selectedProperty.images?.length > 1 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">More Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedProperty.images.slice(1).map((img, idx) => (
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
            [📍Map showing location: {selectedProperty.location}]
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PropertyList;
