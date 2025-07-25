import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AddProperty from "./pages/AddProperty";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Testimonial from "./components/common/Testimonial";
import PropertyDetails from "./components/crud/PropertyDetails";

function App() {
  return (
    <div className="bg-sky-50">
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/add-property" element={<AddProperty/>}></Route>
        <Route path="/property/:id" element={<PropertyDetails/>}></Route>
      </Routes>
      {/* <Testimonial/> */}
      <Footer/>
    </div>
  );
}

export default App;
