import React from 'react';
import landingImg from '../../assets/landingImg.gif'; 
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div style={{ minHeight: '100vh' }} className="d-flex justify-content-center align-items-center rounded shadow w-100">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <h1 style={{ fontSize: '80px' }} className='animate__animated animate__backInDown '><i className="fa-solid fa-book"> </i>Book Store</h1>
          <p style={{ textAlign: 'justify' }}>Discover a Wide Selection Of Books Suitable For Every Reader's Taste. Shop Now. Read Customer Reviews & Find Best Sellers. Free, Easy Returns On Millions Of Items!!!
          </p>
                    
            {/* <Link to={'/dashboard'} className='btn btn-warning'>MANAGE YOUR PROJECTS</Link> */}
          
            <Link to="/Login" className='btn btn-warning'>Buy Now</Link>
                  
         </div>
        <div className="col-lg-6">
          <img className='img-fluid' src={landingImg} alt="landing" />
        </div>
      </div>
    </div>
  </div>

  );
};

export default Hero;
