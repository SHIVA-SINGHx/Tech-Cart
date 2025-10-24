import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 gap-10">
        
        {/*  Left Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Latest Electronics at <br className="hidden md:block" /> Best Prices
          </h1>
          <p className="text-lg text-gray-100 max-w-md">
            Discover cutting-edge technology with unbeatable deals on smartphones, laptops, and more.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300">
              Shop Now
            </button>
            <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              View Deals
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-[280px] sm:w-[340px] md:w-[420px] lg:w-[480px]">
            <img
              src="main3.jpg"
              alt="Phones"
              className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
           
            <div className="absolute inset-0 bg-gradient-to-t from-purple-700/30 to-transparent rounded-3xl blur-2xl -z-10"></div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-purple-700/20 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
