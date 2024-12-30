import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard/BookCard";
import { Spinner } from "react-bootstrap";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-favourite-books",
          { headers }
        );
        setFavouriteBooks(response.data.data || []);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    };
    fetch();
  }, [FavouriteBooks]); // Removed FavouriteBooks from dependency array to prevent infinite loop

  return (
    <div className="container py-5">
      {/* Loading Spinner */}
      {FavouriteBooks.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {/* No Favourite Books Message */}
          {FavouriteBooks.length === 0 && (
            <div className="text-center text-muted fs-3">
              NO FAVOURITE BOOKS ADDED!!
            </div>
          )}

          {/* Favourite Books Grid */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {FavouriteBooks.map((items, i) => (
              <div key={i} className="col">
                <BookCard data={items} favourite={true} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favourites;
