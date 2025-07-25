import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContex";

const PropertyDetails = () => {
  const { id } = useParams();
  const { propertiesData} = useContext(AuthContext);
  const navigate = useNavigate();


  const property = propertiesData.find((p) => p.id === parseInt(id));


  if (!property) {
    return (
      <div className="text-center text-red-500 mt-10">Property not found</div>
    );
  }

  // Related properties (same location but different ID)
  const related = propertiesData.filter(
    (item) => item.location === property.location && item.id !== property.id
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        ← Back
      </button>

      {/* Property Main Card */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-96 object-cover rounded"
          />
          <div>
            <h1 className="text-3xl font-bold mb-3">{property.title}</h1>
            <p className="text-gray-600 mb-1">
              <strong>Location:</strong> {property.location}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Type:</strong> {property.type}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Status:</strong> {property.status}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Price:</strong> ₹{property.price}
            </p>
            <p className="text-gray-700 mb-4">
              Beautiful property located in {property.location}. Ideal for
              families or investment purposes.
            </p>

            {/* Contact Button */}
            <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
              Contact Agent
            </button>
          </div>
        </div>
      </div>

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
                key={item.id}
                className="bg-white shadow p-4 rounded hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/property/${item.id}`)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover rounded mb-2"
                />
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.location}</p>
                <p className="text-sm text-gray-700">₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
