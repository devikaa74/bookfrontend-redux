import React, { useEffect, useState } from "react";
import Sidebar from "../Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const Profile = () => {
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 flex flex-col md:flex-row lg:h-screen text-white">
      {/* Loading Spinner */}
      {!Profile && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner animation="border" variant="light" />
        </div>
      )}

      {/* Profile Content */}
      {Profile && (
        <>
          {/* Sidebar */}
          <div className="w-full md:w-1/4 lg:w-1/6 bg-zinc-800 p-4">
            <Sidebar data={Profile} />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 lg:w-5/6 p-4">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
