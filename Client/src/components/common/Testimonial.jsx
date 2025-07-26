import React from "react";
import { MessageSquareQuote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rohan Mehta",
    title: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    comment:
      "This property platform made my house hunt effortless. Great listings and amazing UI!",
  },
  {
    id: 2,
    name: "Priya Sharma",
    title: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    comment:
      "I loved how easy it was to find verified properties. The design is super intuitive.",
  },
  {
    id: 3,
    name: "Aman Gupta",
    title: "Marketing Lead",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
    comment:
      "Highly recommend this platform. I found my dream apartment within a week!",
  },
];

const Testimonial = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 md:px-12 lg:px-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">What Our Users Say</h2>
        <p className="text-gray-500">Real stories from happy clients</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-full border-4 border-indigo-500 mb-4 object-cover"
            />
            <MessageSquareQuote className="text-indigo-500 w-6 h-6 mb-2" />
            <p className="text-gray-700 italic mb-4">"{item.comment}"</p>
            <h4 className="font-bold text-lg">{item.name}</h4>
            <p className="text-sm text-gray-500">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
