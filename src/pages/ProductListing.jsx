import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

function ProductListingPage() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch(); // Redux dispatch function
    const navigate = useNavigate();
    useEffect(() => {
        getProducts();
    }, [categoryId]);

    const getProducts = async () => {
        try {
            const res = await axios.get(`https://dummyjson.com/products/category/${categoryId}`);
            setProducts(res.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Handle Add to Cart
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        console.log(product);

    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Product Listing for Category {categoryId}</h1>

            <div>
                {products.length === 0 ? (
                    <p>No products found for this category.</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <li key={product.id} className="bg-white border rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
                                <div className="relative">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.name}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="absolute top-0 left-0 bg-gray-900 bg-opacity-50 text-white text-lg p-2">
                                        {product.name}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-700 mb-4">{product.description}</p>
                                    <p className="text-xl font-bold text-gray-900">Price: ${product.price}</p>
                                </div>
                                <div className="p-6 bg-gray-100">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => navigate("/cart")}
                                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                                    >
                                        Go to Cart
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default ProductListingPage;
