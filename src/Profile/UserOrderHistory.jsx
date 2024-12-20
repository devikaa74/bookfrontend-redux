import axios from "axios";
import React, { useEffect, useState } from "react";

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          {
            headers,
          }
        );
        setOrderHistory(response.data.data || []);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {OrderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100 flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-5xl text-zinc-500 mb-8">No order history</h1>
          <img
            src="https://cdn.dribbble.com/users/776386/screenshots/2677382/empty-order-history---dribbble.jpg"
            alt="No order history"
            className="h-[20vh] mb-8"
          />
        </div>
      )}

      {OrderHistory.length > 0 && (
        <div className="p-4 text-zinc-100">
          <h1 className="text-2xl sm:text-4xl text-zinc-500 mb-8">Your order history</h1>
          {/* Table Header */}
          <div className="hidden md:flex bg-zinc-800 w-full rounded py-2 px-4 text-center text-sm sm:text-lg">
            <div className="w-[5%]">Sr.</div>
            <div className="w-[20%]">Books</div>
            <div className="w-[40%]">Description</div>
            <div className="w-[10%]">Price</div>
            <div className="w-[15%]">Status</div>
            <div className="w-[10%]">Mode</div>
          </div>
          {/* Table Body */}
          {OrderHistory.map((items, i) => (
            <div
              key={items._id || i}
              className="flex flex-col md:flex-row bg-zinc-800 w-full rounded py-2 px-4 mt-4 text-center gap-2"
            >
              <div className="w-full md:w-[5%] text-sm sm:text-lg">{i + 1}</div>
              <div className="w-full md:w-[20%] text-sm sm:text-lg">{items.book?.title || "Title"}</div>
              <div className="w-full md:w-[40%] text-sm sm:text-lg">
                {items.book?.desc?.slice(0, 50) || "No description"}...
              </div>
              <div className="w-full md:w-[10%] text-sm sm:text-lg">Rs. {items.book?.price || "0"}</div>
              <div
                className={`w-full md:w-[15%] text-sm sm:text-lg ${
                  items.status === "Order placed"
                    ? "text-yellow-500"
                    : items.status === "cancelled"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {items.status}
              </div>
              <div className="hidden md:block w-full md:w-[10%] text-sm text-zinc-400">
                COD
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
