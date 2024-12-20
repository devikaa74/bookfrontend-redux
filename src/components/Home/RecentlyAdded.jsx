import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import { Link } from 'react-router-dom';

const RecentlyAdded = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:1000/api/v1/get-recent-books');
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="mt-4 px-4">
      <h4 className="text-center text-3xl mb-4">New Arrivals!</h4>
      
        <div className="row">
          {Data &&
            Data.map((items, i) => (
              <div key={i} className="col-12 col-sm-6 col-md-3 mb-4">
                <BookCard data={items} />
              </div>
            ))}
            <Link to='/login' className='text-center mb-5'>click here to view All Books</Link>
        </div>

        {/* <h4 className="text-center text-3xl mb-4">Our Collections</h4>
        <div className="marquee-container"> */}
        {/* First row */}
        {/* <div className="marquee">
          {Data.map((item, i) => (
            <div key={i} className="book-card">
              <BookCard data={item} />
            </div>
          ))}
        </div> */}

        {/* Second row */}
        {/* <div className="marquee reverse">
          {Data.map((item, i) => (
            <div key={i} className="book-card">
              <BookCard data={item} />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default RecentlyAdded;
