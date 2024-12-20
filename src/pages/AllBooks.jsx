import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard/BookCard';

const AllBooks = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:1000/api/v1/get-all-books');
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="bg-dark text-white py-5">
      <div className="container">
        <h4 className="text-3xl mb-4">All Books!</h4>
        <div className="row">
          {Data && Data.map((items, i) => (
            <div key={i} className="col-12 col-sm-6 col-md-3 mb-4">
              <BookCard data={items} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
