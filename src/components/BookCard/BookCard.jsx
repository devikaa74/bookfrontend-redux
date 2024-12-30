import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ data, favourite }) => {
  console.log(data);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put(
      "https://bookbackend-redux.onrender.com/api/v1/remove-book-from-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <div className="bg-slate-500 rounded p-4 flex flex-col">
      <Link
        style={{ textDecoration: 'none' }}
        to={`/view-book-details/${data._id}`}
      >
        <div className="bg-slate-600 rounded flex items-center justify-center">
          <img src={data.url} alt="/" className="h-[25vh]" />
        </div>
        <h2 className="mt-4 text-xl">{data.title}</h2>
        <p className="mt-2">by {data.author}</p>
        <p className="mt-2">Rs. {data.price}</p>
      </Link>

      {/* Keep the button inside the card but outside the Link */}
      {favourite && (
        <button
          onClick={handleRemoveBook}
          className="bg-yellow-50 px-4 py-2 rounded text-yellow-500 mt-4 no-underline"
        >
          Remove from favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;
