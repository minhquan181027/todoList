import React, { useEffect, useState } from 'react';
import './User.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const User = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [users, setUsers] = useState([]);        // ✅ array rỗng
    const [search, setSearch] = useState('');      // ✅ chuỗi rỗng

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/users`);
                setUsers(Array.isArray(res.data) ? res.data : []);   // ✅ đảm bảo array
            } catch (error) {
                console.log('Error while fetching data', error);
                setUsers([]);
            }
        };
        fetchData();
    }, []);

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${API_URL}/api/delete/user/${userId}`);
            setUsers((prev) => prev.filter((u) => u._id !== userId));
            toast.success('Xóa thành công', { position: 'top-right' });
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // ✅ Filter an toàn
    const filteredUsers = users.filter((user) =>
        (user?.name ?? '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="userTable">
            <div className="d-flex justify-content-between mb-3">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Tìm theo tên..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Link to="/add" className="btn btn-primary">
                    <i className="fa-solid fa-user-plus"></i>
                </Link>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>
                                    <Link to={`/update/${user._id}`} className="btn btn-info">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => deleteUser(user._id)}
                                    >
                                        <i className="fa-duotone fa-solid fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                {users.length === 0
                                    ? 'Chưa có user nào'
                                    : `Không tìm thấy user nào khớp "${search}"`}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default User;