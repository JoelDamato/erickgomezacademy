import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-blue-700 min-h-screen flex flex-col items-center justify-center">
      {/* Card */}
      <div className="relative bg-white rounded-lg shadow-md overflow-visible max-w-lg w-full">
        {/* SVG Shape */}
        <div className="relative">
          <svg
            className="absolute bottom-[-20px] left-0 w-full h-32"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="white"
              d="M0,0L48,26.7C96,53,192,107,288,128C384,149,480,139,576,133.3C672,128,768,128,864,149.3C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Card Content */}
        
        <div className="px-6 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Basic</h3>
            <p className="mt-2 text-sm text-gray-500">Thing</p>
            <p className="mt-2 text-sm text-gray-500">Thing</p>
            <p className="mt-2 text-sm text-gray-500">Thing</p>
            <p className="mt-2 text-sm text-gray-500">Thing</p>
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-800">$20.000</span>{" "}
              <span className="text-sm text-gray-500">/ por mes</span>
            </div>
            <button className="mt-6 bg-gradient-to-r from-red-500 to-yellow-500 text-white px-6 py-2 rounded-md shadow-md hover:shadow-lg hover:from-red-600 hover:to-yellow-600 transition duration-300">
              Adquirir
            </button>
          </div>
        </div>
      </div>
       {/* Card */}
       <div className="relative bg-white rounded-lg shadow-md overflow-visible max-w-lg w-full">
        {/* SVG Shape */}
        <div className="relative">
          <svg
            className="absolute bottom-[-20px] left-0 w-full h-32"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="white"
              d="M0,0L48,26.7C96,53,192,107,288,128C384,149,480,139,576,133.3C672,128,768,128,864,149.3C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Card Content */}
        
        <div className="px-6 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Basic</h3>
            <p className="mt-2 text-sm text-gray-500">Thing</p>
            <p className="mt-2 text-sm text-gray-500">Thing</p>
            <p className="mt-2 text-sm text-gray-500">Thing</p>
            <p className="mt-2 text-sm text-gray-500">Thing</p>
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-800">$20.000</span>{" "}
              <span className="text-sm text-gray-500">/ por mes</span>
            </div>
            <button className="mt-6 bg-gradient-to-r from-red-500 to-yellow-500 text-white px-6 py-2 rounded-md shadow-md hover:shadow-lg hover:from-red-600 hover:to-yellow-600 transition duration-300">
              Adquirir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
