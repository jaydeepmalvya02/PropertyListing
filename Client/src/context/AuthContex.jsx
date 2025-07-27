import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const baseUrl=import.meta.env.VITE_BACKEND_URL
  const [propertiesData, setPropertiesData] = useState([]);

  // Fetch from backend API
   const fetchProperties = async () => {
     try {
       const response = await axios.get(` ${baseUrl}/api/property/all`);
       if (response.data.success) {
         setPropertiesData(response.data.data);
         console.log(response.data.data);
       }
     } catch (error) {
       console.error("Error fetching properties:", error);
     }
   };
  useEffect(() => {
   

    fetchProperties();
  }, []);

  // Opt+i
  // onal: Persist locally (optional, can remove if not needed)
  // useEffect(() => {
  //   localStorage.setItem("propertyList", JSON.stringify(propertiesData));
  // }, [propertiesData]);

  // Add a new property to the backend and local state
  const addProperty = async (property) => {
    try {
      const response = await axios.post(
       ` ${baseUrl}/api/property/add`,
        property
      );
      if (response.data.success) {
        
        toast.success("Property Added Successfuly")
        console.log(response.data.data);
        fetchProperties()
      }
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const value = {
    propertiesData,
    addProperty,
    baseUrl,
    fetchProperties,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
