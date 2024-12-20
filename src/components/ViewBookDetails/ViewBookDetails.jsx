import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GrLanguage } from 'react-icons/gr';
import { FaHeart, FaCartArrowDown } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState({});
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
      setData(response.data.data);
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  }
  const handleFavourite = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/add-book-to-favourite",{},{ headers })
    alert(response.data.message);
  }
  const handleCart = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/add-to-cart",{},{ headers })
    alert(response.data.message);
  };

  const deleteBook = async ()=> {
    const response = await axios.delete("http://localhost:1000/api/v1/delete-book",
      {headers}
    );
    alert(response.data.message);
    navigate("/all-books")
  };
  
  

  return (
    <>
      {Data && (
        <div className="container-fluid bg-dark text-white py-4">
          <div className="row align-items-center">
            {/* Image Section */}
            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
              <img
                src={Data.url}
                alt="Book Cover"
                className="img-fluid rounded"
                style={{ maxHeight: '80vh', objectFit: 'contain', width: '100%' }}
              />
            </div>

            {/* Buttons Section */}
            {isLoggedIn && role === "user" && (
              <div className="col-12 col-lg-1 d-flex flex-lg-column justify-content-center align-items-center gap-3 mb-4 mb-lg-0">
                <button onClick={handleFavourite} className="bg-white rounded-full text-3xl p-3">
                  <FaHeart className="text-red-500" />
                </button>
                <button onClick={handleCart} className="bg-white rounded-full text-3xl p-3">
                  <FaCartArrowDown className="text-green-500" />
                </button>
              </div>
            )}
            {isLoggedIn && role === "admin" && (
              <div className="col-12 col-lg-1 d-flex flex-lg-column justify-content-center align-items-center gap-3 mb-4 mb-lg-0">
                <Link to={`/updateBook/${id}`} className="bg-white rounded-full text-3xl p-3">
                  <FaEdit className="text-green-500" />
                </Link>
                <button className="bg-white rounded-full text-3xl p-3" onClick={deleteBook}>
                  <MdDelete className="text-red-500" />
                </button>
              </div>
            )}

            {/* Book Details Section */}
            <div className="col-12 col-lg-5 text-light">
              <h1 className="text-3xl">{Data.title}</h1>
              <p className="mt-2">by {Data.author}</p>
              <p className="mt-3">{Data.desc}</p>

              <div className="d-flex align-items-center gap-2 mt-4">
                <GrLanguage className="text-xl" />
                <p className="mb-0">{Data.language}</p>
              </div>

              <p className="mt-4 text-xl">Price: Rs. {Data.price}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
