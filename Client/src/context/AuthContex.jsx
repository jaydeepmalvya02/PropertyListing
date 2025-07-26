import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const baseUrl=import.meta.env.VITE_BACKEND_URL
  const [properties, setProperties] = useState([]);

  // Fetch from backend API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
         ` ${baseUrl}/api/property/all`
        );
        if (response.data.success) {
          setProperties(response.data.data);
          console.log(response.data.data);
          
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Optional: Persist locally (optional, can remove if not needed)
  useEffect(() => {
    localStorage.setItem("propertyList", JSON.stringify(properties));
  }, [properties]);

  // Add a new property to the backend and local state
  const addProperty = async (property) => {
    try {
      const response = await axios.post(
       ` ${baseUrl}/api/property/add`,
        property
      );
      if (response.data.success) {
        setProperties((prev) => [...prev, response.data.data]);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const value = {
    properties,
    addProperty,
    baseUrl,
    
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
