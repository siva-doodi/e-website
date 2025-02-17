import React from "react";

const Card = ({ newArrivals }) => {
  return (
    <div className="px-[120px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {newArrivals.map((product) => (
        <div
          key={product.id}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
        >
          {/* Product Image */}
          <a href="#">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={product.thumbnail}
              alt={product.title}
            />
          </a>

          {/* Product Details */}
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {product.title}
              </h5>
            </a>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {product.description}
            </p>

            {/* Read More Button */}
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition"
            >
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
