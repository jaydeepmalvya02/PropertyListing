import React, { useContext, useState } from "react";
// import propertiesData from "../../data";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContex";

const PropertyList = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const {propertiesData} = useContext(AuthContext)

  const filteredProperties = propertiesData.filter(
    (property) =>
      property.title.toLowerCase().includes(search.toLowerCase()) ||
      property.location.toLowerCase().includes(search.toLowerCase())
  );
  console.log(propertiesData);
  

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by location or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-md w-full md:w-1/2 mb-4 md:mb-0"
        />
        <button
          onClick={() => navigate("/add-property")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-lg shadow-md overflow-hidden border hover:translate-y-[-10px]  translation-x-0 transition-all   "
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
                  onClick={() => navigate(`/property/${property._id}`)}
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
    </div>
  );
};

export default PropertyList;
