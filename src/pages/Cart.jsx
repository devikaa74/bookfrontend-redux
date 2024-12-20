import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch Cart Items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
        setCart(res.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  // Calculate Total Amount
  useEffect(() => {
    if (Cart && Cart.length > 0) {
      const total = Cart.reduce((sum, item) => sum + item.price, 0);
      setTotal(total);
    } else {
      setTotal(0); // Reset total if cart is empty
    }
  }, [Cart]);

  // Delete Item from Cart
  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/remove-from-cart/${bookid}`,
        {},
        { headers }
      );
      alert(response.data.message);

      // Update Cart State after Deletion
      setCart((prevCart) => prevCart.filter((item) => item._id !== bookid));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Place Order
  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:1000/api/v1/place-order`,
        { order: Cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="bg-zinc-900 px-12 lg:h-screen py-8">
      {Cart.length === 0 ? (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">Empty Cart</h1>
            <img
              src="https://cdni.iconscout.com/illustration/free/thumb/empty-cart-4085814-3385483.png"
              alt="Empty Cart"
              className="lg:h-[50vh]"
            />
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-5xl text-zinc-500 mb-8">Your Cart</h1>
          {Cart.map((items, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={i}
            >
              <img src={items.url} alt="/" className="h-[20vh] md:w-auto object-cover" />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 text-start mt-2 md:mt-0">{items.title}</h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {items.desc.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl flex">Rs. {items.price}</h2>
                <button
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                  onClick={() => deleteItem(items._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <h1 className="text-3xl text-zinc-200">Total Amount: Rs. {Total}</h1>
              <div className="w-[100%] mt-3">
                <button
                  className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full"
                  onClick={PlaceOrder}
                >
                  Place your order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
