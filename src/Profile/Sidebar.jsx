import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";


const Sidebar = ({ data }) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const role = useSelector((state) => state.auth.role);
  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-screen">
      {/* Profile Section */}
      <div className="flex items-center flex-col justify-center mb-6">
        <img
          src={data.avatar}
          className="h-[5vh] md:h-[10vh] lg:h-[15vh] rounded-full"
          alt="User Avatar"
        />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">{data.username}</p>
        <p className="mt-1 text-xl text-zinc-300 font-semibold">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>

      {/* Navigation Links */}
     {role === "user" && (
         <div className="w-full flex flex-col items-center justify-center space-y-4 lg:space-y-2">
         <Link
           to="/profile"
           className="text-zinc-100 w-full py-2 text-center rounded hover:bg-blue-500 transition-all duration-300 no-underline"
         >
           Favourites
         </Link>
         <Link
           to="/profile/orderHistory"
           className="text-zinc-100 w-full py-2 text-center rounded hover:bg-blue-500 transition-all duration-300 no-underline"
         >
           Order History
         </Link>
         <Link
           to="/profile/settings"
           className="text-zinc-100 w-full py-2 text-center rounded hover:bg-blue-500 transition-all duration-300 no-underline"
         >
           Settings
         </Link>
       </div>
 
     )}

     { role === "admin" && (
        <div className="w-full flex flex-col items-center justify-center space-y-4 lg:space-y-2">
        <Link
          to="/profile"
          className="text-zinc-100 w-full py-2 text-center rounded hover:bg-blue-500 transition-all duration-300 no-underline"
        >
          All Orders
        </Link>
        <Link
          to="/profile/add-book"
          className="text-zinc-100 w-full py-2 text-center rounded hover:bg-blue-500 transition-all duration-300 no-underline"
        >
          Add Book
        </Link>
        
      </div>
     )}

      {/* Log Out Button */}
      <button className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300"
       onClick={() => {
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role");
        history("/")
        
       }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
