import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateBook = () => {
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        language: "",
        desc: "",
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid:id,
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submit = async () => {
        try {
            if (
                !Data.url || !Data.title || !Data.author || !Data.price || !Data.desc || !Data.language
            ) {
                alert("All fields are required");
            } else {
                const response = await axios.put(
                    "http://localhost:1000/api/v1/update-book",
                    Data,
                    { headers }
                );
                setData({
                    url: "",
                    title: "",
                    author: "",
                    price: "",
                    language: "",
                    desc: "",
                });
                alert(response.data.message);
                navigate(`/view-book-details/${id}`)
            }
        } catch (error) {
            alert(error.response.data.message);
            
        }
    };
    useEffect(() => {
        const fetch = async () => {
          const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
          setData(response.data.data);
        };
        fetch();
      }, [id]);

    return (
        <div className="container">
            <h1 className="text-center mb-4">Update Book</h1>
            <div className="card p-4 shadow">
                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Image URL"
                        name="url"
                        value={Data.url}
                        onChange={change}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Book Title"
                        name="title"
                        value={Data.title}
                        onChange={change}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Author"
                        name="author"
                        value={Data.author}
                        onChange={change}
                    />
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Language</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Language"
                            name="language"
                            value={Data.language}
                            onChange={change}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Price"
                            name="price"
                            value={Data.price}
                            onChange={change}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Description"
                        name="desc"
                        value={Data.desc}
                        onChange={change}
                    />
                </div>
                <button
                    className="btn btn-primary w-100"
                    onClick={submit}
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default UpdateBook;
