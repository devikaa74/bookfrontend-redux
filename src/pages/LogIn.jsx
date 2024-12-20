import React, { useState } from 'react';
import authImg from '../assets/authImg.jpg';
import { Form, FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';


const LogIn = () => {
  const [inputData, setInputData] = useState({
    username: '',
    
    password: '',
   
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if(
        inputData.username === "" ||
        
        inputData.password === "" 
        
      ){
        alert("All Fields Required")
      }
      else{
        
        const response = await axios.post('http://localhost:1000/api/v1/sign-in', inputData);
        // console.log(response.data);

        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));

        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile")


      }
        // alert(response.data.message); // You can show a success message
        // navigate('/login'); // Redirect to login after successful registration
      } catch (error) {
        alert(error.response.data.message);
        // alert('Registration failed. Please try again.');
      } finally {
        setLoading(false); // Hide loading spinner after the request
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
              <h5>LogIn to your Account!</h5>
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
                
                
                <FloatingLabel controlId="floatingPassword" label="Password" className='mb-3'>
                  <Form.Control
                    name="password"
                    value={inputData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                  />
                </FloatingLabel>
                

                <div className="mt-3">
                  <button onClick={handleSubmit} className='btn btn-primary mb-2' type="submit" disabled={loading}>
                    Login
                    {loading && <Spinner className='ms-2' animation="border" size="sm" variant="light" />}
                  </button>
                </div>

                <p>
                  
                    Havn't Registered yet? Please Click Here to .
                    
                  <Link to='/SignUp'>
                     Register
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
