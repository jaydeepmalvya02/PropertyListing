import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Menu, X, Home, PlusCircle, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Cube = () => (
  <mesh rotation={[45, 45, 0]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="skyblue" />
  </mesh>
);

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/", icon: <Home className="h-5 w-5" /> },
    {
      name: "Add Property",
      to: "/add-property",
      icon: <PlusCircle className="h-5 w-5" />,
    },
  ];

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "auto";
  }, [navOpen]);

  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <>
      <nav className="bg-white  max-w-7xl min-w-94 shadow-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            {/* <div className="w-8 h-8 sm:w-10 sm:h-10">
              <Canvas
                camera={{ position: [2, 2, 2] }}
                onCreated={({ gl }) => {
                  gl.getContext().canvas.addEventListener(
                    "webglcontextlost",
                    (event) => {
                      event.preventDefault();
                      console.warn("WebGL context lost");
                    }
                  );
                }}
              >
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={2}
                />
                <Cube />
              </Canvas>
            </div> */}
            <span className="font-bold text-lg sm:text-xl text-gray-800">
              HomeHarbor
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Social Icons */}
            <li>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                <Github className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <button onClick={toggleNav} className="md:hidden text-gray-700">
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className="mt-16 md:mt-20"></div>

      {/* Mobile Drawer */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: navOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-4/5 sm:w-2/3 h-full bg-white shadow-lg z-50 p-6"
      >
        <div className="flex justify-end mb-4">
          <button onClick={toggleNav}>
            <X size={24} className="text-gray-700" />
          </button>
        </div>
        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={toggleNav}
              className="flex items-center gap-3 text-gray-800 hover:text-blue-600 text-base"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          {/* Social Icons */}
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-800 hover:text-blue-600"
          >
            <Github className="h-5 w-5" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-800 hover:text-blue-600"
          >
            <Linkedin className="h-5 w-5" />
            LinkedIn
          </a>
        </nav>
      </motion.div>

      {/* Backdrop */}
      {navOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={toggleNav}
        ></div>
      )}
    </>
  );
};

export default Navbar;
