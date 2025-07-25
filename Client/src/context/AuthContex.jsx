import { createContext, useState, useEffect } from "react";
 import propertiesData from "../data";
 // import dummy data

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [properties, setProperties] = useState(() => {
    const stored = localStorage.getItem("propertyList");
    return stored ? JSON.parse(stored) : propertiesData; // merge with dummy
  });

  useEffect(() => {
    localStorage.setItem("propertyList", JSON.stringify(properties));
  }, [properties]);

  const addProperty = (property) => {
    setProperties((prev) => [...prev, property]);
  };

  const value = {
    properties,
    addProperty,
    propertiesData
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
