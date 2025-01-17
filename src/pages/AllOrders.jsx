import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from './SeeUserData';

const AllOrders = () => {
    const [AllOrders, setAllOrders] = useState([]);
    const [Options, setOptions] = useState(-1);
    const [Values, setValues] = useState({ status: "" });
    const [userDiv, setUserDiv] = useState(""); // Added state
    const [userDivData, setUserDivData] = useState(null); // Added state

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(
                    "https://bookbackend-redux.onrender.com/api/v1/get-all-orders",
                    { headers }
                );
                setAllOrders(response.data.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
                alert("Failed to fetch orders. Please try again.");
            }
        };
        fetch();
    }, []); // Empty dependency array to avoid infinite loop

    const change = (e) => {
        const { value } = e.target;
        setValues((prev) => ({ ...prev, status: value }));
    };

    const submitChanges = async (i) => {
        try {
            const id = AllOrders[i]._id;

            // Make the API call to update the status
            const response = await axios.put(
                `https://bookbackend-redux.onrender.com/api/v1/update-status/${id}`,
                Values,
                { headers }
            );

            // Show success message
            alert(response.data.message);

            // Update the state locally
            const updatedOrders = [...AllOrders];
            updatedOrders[i].status = Values.status;
            setAllOrders(updatedOrders);

            // Reset dropdown
            setOptions(-1);
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status. Please try again.");
        }
    };

    const trimmedOrders = AllOrders?.slice(0, -1); // Avoid mutating state

    return (
        <div className="container mt-4">
            {!AllOrders.length && (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            {AllOrders.length > 0 && (
                <>
                    <h1 className="text-center text-success mb-4">Your Order History</h1>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover text-center">
                            <thead className="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Book</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trimmedOrders.map((item, i) => (
                                    <tr key={item._id}>
                                        <td>{i + 1}</td>
                                        <td>{item.book.title}</td>
                                        <td>{item.book.desc.slice(0, 50)}...</td>
                                        <td>Rs.{item.book.price}</td>
                                        <td>
                                            <button
                                                className="btn btn-link p-0"
                                                onClick={() => {
                                                    setOptions(i);
                                                    setValues({ status: item.status }); // Ensure dropdown reflects the current status
                                                }}
                                            >
                                                {item.status === "order placed" ? (
                                                    <span className="text-warning">{item.status}</span>
                                                ) : item.status === "cancelled" ? (
                                                    <span className="text-danger">{item.status}</span>
                                                ) : (
                                                    <span className="text-success">{item.status}</span>
                                                )}
                                            </button>
                                            {Options === i && (
                                                <div className="mt-2">
                                                    <select
                                                        className="form-select"
                                                        name="status"
                                                        onChange={change}
                                                        value={Values.status}
                                                    >
                                                        {[
                                                            "order placed",
                                                            "out of delivery",
                                                            "delivered",
                                                            "cancelled",
                                                        ].map((option, idx) => (
                                                            <option value={option} key={idx}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        className="btn btn-success btn-sm mt-2"
                                                        onClick={() => submitChanges(i)}
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-outline-info btn-sm"
                                                onClick={() => {
                                                    setUserDiv("fixed");
                                                    setUserDivData(item.user);
                                                }}
                                            >
                                                <IoOpenOutline />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            {userDivData && (
                <SeeUserData
                    userDivData={userDivData}
                    userDiv={userDiv}
                    setUserDiv={setUserDiv}
                />
            )}
        </div>
    );
};

export default AllOrders;
