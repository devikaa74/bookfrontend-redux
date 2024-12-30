import React, { useState } from 'react';
import authImg from '../assets/authImg.jpg';
import { Form, FloatingLabel, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        inputData.username === "" ||
        inputData.email === "" ||
        inputData.password === "" ||
        inputData.address === ""
      ) {
        alert("All Fields Required");
      } else {
        const response = await axios.post('http://localhost:1000/api/v1/sign-up', inputData);
        alert(response.data.message);
        navigate("/LogIn");
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%' }} className='d-flex justify-content-center align-items-center'>
      <div className="container w-75">
        <div className="shadow card p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className='img-fluid' src={authImg} alt="Authentication" />
            </div>
            <div className="col-lg-6">
              <h1 className='mt-2'><i className="fa-solid fa-book"> </i>Book Store</h1>
              <h5>SignUp to your Account</h5>
              <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingInputName" label="Username" className="mb-3">
                  <Form.Control
                    name="username"
                    value={inputData.username}
                    onChange={handleChange}
                    type="text"
                    placeholder="Username"
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                  <Form.Control
                    name="email"
                    value={inputData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="name@example.com"
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password" className='mb-3'>
                  <Form.Control
                    name="password"
                    value={inputData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInput" label="Address" className='mb-3'>
                  <Form.Control
                    name="address"
                    value={inputData.address}
                    onChange={handleChange}
                    type="text"
                    placeholder="Address"
                  />
                </FloatingLabel>

                <div className="mt-3">
                  <button className='btn btn-primary mb-2' type="submit" disabled={loading}>
                    Register
                    {loading && <Spinner className='ms-2' animation="border" size="sm" variant="light" />}
                  </button>
                </div>

                <p>
                  Already a User? Please Click Here to
                  <Link to='/login'> Login</Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
