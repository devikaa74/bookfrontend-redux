import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      style={{ backgroundColor: "pink" }}
      className="container w-100 shadow p-4"
    >
      <div className="row">
        {/* Intro Section */}
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <h5>
            <i className="fa-solid fa-book me-2"></i>bookStore
          </h5>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Doloremque ratione asperiores quisquam obcaecati nam dolorum a
            laborum! Repellat quasi illum atque? Quas, minus! Impedit facere ea
            eos iure, sunt error!
          </p>
          <p>Code licensed Luminar, docs CC by 3.0.</p>
          <p>Currently v5.3.2.</p>
        </div>

        {/* Links Section */}
        <div className="col-6 col-md-3 col-lg-2 mb-4">
          <h5>Links</h5>
          <Link to="/" style={{ textDecoration: "none", display: "block" }}>
            Home Page
          </Link>
          <Link to="/login" style={{ textDecoration: "none", display: "block" }}>
            Login Page
          </Link>
          <Link
            to="/register"
            style={{ textDecoration: "none", display: "block" }}
          >
            Register Page
          </Link>
        </div>

        {/* Guides Section */}
        <div className="col-6 col-md-3 col-lg-2 mb-4">
          <h5>Guides</h5>
          <a
            href="https://react.dev/"
            style={{ textDecoration: "none", display: "block" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <a
            href="https://react-bootstrap.github.io/"
            style={{ textDecoration: "none", display: "block" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            React Bootstrap
          </a>
          <a
            href="https://reactrouter.com/en/main"
            style={{ textDecoration: "none", display: "block" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            React Router
          </a>
        </div>

        {/* Contact Us Section */}
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <h5>Contact Us</h5>
          <div className="d-flex">
            <input
              placeholder="Enter your email here"
              type="text"
              className="form-control"
            />
            <button className="btn btn-info ms-2">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="icons d-flex justify-content-start gap-3 mt-3">
            <a
              href="#"
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="#"
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="#"
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a
              href="#"
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="#"
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="#"
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-phone"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <p className="text-center mt-3">
        Copyright &copy; June 2024 Batch, Book Store. Built with React.
      </p>
    </div>
  );
};

export default Footer;
