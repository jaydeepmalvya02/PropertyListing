import React from 'react'
import Testimonial from '../components/common/Testimonial'
import PropertyList from '../components/crud/PropertyList';

const Home = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center my-6">
          Property Listings
        </h1>
        <PropertyList />
      </div>
      <div>
        <Testimonial />
      </div>
    </div>
  );
}

export default Home