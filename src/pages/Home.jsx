import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { FaTags } from "react-icons/fa";
import Card from "../components/Card";
import CardCarousel from "../components/Crousal";
const Homepage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [flashDeals, setFlashDeals] = useState([]);
  const [countdown, setCountdown] = useState(3600); // Example: 1 hour countdown
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    getproducts();
    getCategory();
    getNewArrivals();
    getFlashDeals();
  }, []); // Empty dependency array ensures this runs only once when the component mounts.

  const getproducts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=10");
      setFeaturedProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products/categories");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNewArrivals = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?sortBy=date&order=desc&limit=8");
      if (res.data && res.data.products) {
        setNewArrivals(res.data.products);
      } else {
        console.error("Products data is missing or undefined:", res.data);
      }
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
    }
  };

  const getFlashDeals = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?discountPercentage_gte=20&limit=6");
      setFlashDeals(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // This `useEffect` runs once when the component mounts
  const filterByCategory = async (name) => {
    try {
      // const res = await axios.get(`https://dummyjson.com/products/category/${name}`);
      // console.log(res)

    } catch (error) {
      console.log(error);
    }
  };
  const handleNext = () => {
    if (currentIndex < featuredProducts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Handle Prev Button Click
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8"> 
    <div className="max-w-screen-xl mx-auto py-8">
      <div className="relative">
        <div className="flex justify-center items-center">
          {/* For Desktop: 5 cards visible at once */}
          <div className="hidden lg:flex space-x-4 overflow-hidden">
            {featuredProducts.slice(currentIndex, currentIndex + 5).map((product) => (
              <div key={product.id} className="min-w-[200px] bg-white  rounded-lg p-4 mb-4">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="mt-2 text-lg font-bold text-gray-900">${product.price}</p>
              </div>
            ))}
          </div>

          {/* For Mobile: 1 card visible at once */}
          <div className="lg:hidden min-w-full">
            {featuredProducts.length > 0 && (
              <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
                <img
                  src={featuredProducts[currentIndex].image}
                  alt={featuredProducts[currentIndex].name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">{featuredProducts[currentIndex].name}</h3>
                <p className="text-sm text-gray-600">{featuredProducts[currentIndex].description}</p>
                <p className="mt-2 text-lg font-bold text-gray-900">${featuredProducts[currentIndex].price}</p>
              </div>
            )}
          </div>
        </div>

        {/* Prev and Next buttons for Mobile */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white cursor-pointer" onClick={handlePrev}>
          <span className="text-3xl text-[#000] shadow rounded-[50%] w-[50px] h-[50px]">{'<'}</span>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white cursor-pointer" onClick={handleNext}>
          <span className="text-3xl text-[#000] shadow rounded-[50%] w-[50px] h-[50px]">{'>'}</span>
        </div>
      </div>
    </div>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Shop by Category</h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-4 md:px-0 overflow-x-auto scrollbar-hide">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/product-listing/${category.slug}`}
              className="flex items-center gap-2 bg-white shadow-lg border border-gray-200 px-5 py-3 rounded-xl text-gray-800 font-medium hover:bg-indigo-50 hover:shadow-xl transition duration-300"
            >
              <FaTags className="text-indigo-500" />
              {category.name}
            </Link>
          ))}

          <button
            onClick={() => filterByCategory("all")}
            className="flex items-center gap-2 bg-white shadow-lg border border-gray-200 px-5 py-3 rounded-xl text-gray-800 font-medium hover:bg-indigo-50 hover:shadow-xl transition duration-300"
            aria-label="Show all categories"
          >
            <FaTags className="text-gray-500" />
            All
          </button>
        </div>
      </section>
      <section className="mb-12 px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900">
          New Arrivals
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="group relative border rounded-lg shadow-lg overflow-hidden bg-white transition-transform transform hover:scale-105"
            >
              
              <div className="relative">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
          
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition duration-300"></div>
              </div>

            
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-md text-gray-600">${product.price}</p>
                <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
     
      <Card  newArrivals={newArrivals}/>
     



      <section className="bg-red-100 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold mb-4 text-center text-red-700">Flash Deals</h2>
        <p className="text-xl font-semibold text-red-700 text-center mb-6">
          Time Left: {Math.floor(countdown / 60)}:{countdown % 60}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {flashDeals.map((product) => (
            <div key={product.id} className="border rounded-lg shadow-lg overflow-hidden">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
                <p className="text-lg text-gray-600">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
