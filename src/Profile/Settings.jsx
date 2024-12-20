import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState();
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
        setProfileData(response.data); // Assuming response.data is the profile object
        setValue({ address: response.data.address });
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    fetch();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value})
  }

  const submitAddress = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/update-address",Value,
      { headers }
    );
    alert(response.data.message);
    
  };

  return (
    <>
      {ProfileData ? (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl text-zinc-500 mb-8">Settings</h1>
          <div className="flex gap-12">
            <div>
              <label>Username</label>
              <p className="p-2 rounded bg-yellow-500 mt-2">{ProfileData.username}</p>
            </div>
            <div>
              <label>Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2">{ProfileData.email}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label>Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2"
              rows="5"
              placeholder="Address"
              name="address"
              value={Value.address}
              onChange={(e) => setValue({ ...Value, address: e.target.value })}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={submitAddress} className="bg-yellow-500 text-zinc-900 px-3 py-2 rounded">
              Update
            </button>
          </div>
        </div>
      ) : (
        <div>Loading...</div> // Show loading state if ProfileData is not yet fetched
      )}
    </>
  );
};

export default Settings;
