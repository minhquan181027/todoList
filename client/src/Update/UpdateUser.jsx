import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import './updateUser.css';

const UpdateUser = () => {
    const { id } = useParams();                       // ✅ destructure
    const navigate = useNavigate();

    const [user, setUser] = useState({                // ✅ [ ]
        name: '',
        email: '',
        address: '',
    });
    const [errors, setErrors] = useState({});         // ✅ [ ]

    // Load data cũ
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:1234/api/user/${id}`);
                setUser({
                    name: res.data.name,
                    email: res.data.email,
                    address: res.data.address,
                });
            } catch (error) {
                toast.error(error.response?.data?.message || error.message);
            }
        };
        fetchUser();                                     // ✅ gọi ngoài, trong useEffect
    }, [id]);                                          // ✅ dependency id

    // Validate
    const validate = () => {
        const newErrors = {};
        if (!user.name.trim()) newErrors.name = 'Vui lòng nhập tên';
        if (!user.email.trim()) newErrors.email = 'Vui lòng nhập email';
        if (!user.address.trim()) newErrors.address = 'Vui lòng nhập address';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    // Submit update — tách riêng, KHÔNG nằm trong inputHandler
    const updateData = async (e) => {
        e.preventDefault();                               // ✅ chặn reload
        if (!validate()) return;                          // ✅ gọi hàm
        try {
            await axios.put(`http://localhost:1234/api/update/user/${id}`, user);
            toast.success('Cập nhật thành công', { position: 'top-right' });
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // JSX ở cấp component — KHÔNG nằm trong handler nào
    return (
        <div>
            <div className="addUser">
                <Link to="/" className="btn btn-secondary">
                    <i className="fa-duotone fa-solid fa-arrow-left"></i>
                </Link>
                <h2>Cập nhật User</h2>
                <form onSubmit={updateData} className="addUserForm">
                    <div className="inputGroup">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            value={user.name}
                            onChange={inputHandler}
                            placeholder="Enter your name"
                            name="name"
                            autoComplete="off"
                        />
                        {errors.name && <p className="error-text">{errors.name}</p>}
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            value={user.email}
                            onChange={inputHandler}
                            placeholder="Enter your Email"
                            name="email"
                            autoComplete="off"
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            value={user.address}
                            onChange={inputHandler}
                            placeholder="Enter your address"
                            name="address"
                            autoComplete="off"
                        />
                        {errors.address && <p className="error-text">{errors.address}</p>}
                    </div>

                    <div className="inputGroup">
                        <button type="submit" className="btn btn-primary">
                            Cập nhật
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;