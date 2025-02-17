import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/cartSlice";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <li key={item.id} className="bg-white border rounded-lg shadow-md overflow-hidden">
              <img src={item.thumbnail} alt={item.name} className="w-full h-56 object-cover" />
              <div className="p-6">
                <p className="text-xl font-bold">{item.name}</p>
                <p className="text-gray-700">{item.description}</p>
                <p className="text-xl font-bold text-gray-900">Price: ${item.price}</p>
              </div>
              <div className="p-6 bg-gray-100">
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPage;
