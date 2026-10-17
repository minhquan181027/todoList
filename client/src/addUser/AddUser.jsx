import React, { useState } from 'react'
import './AddUser.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const AddUser = () => {
    const users = {
        name: "",
        email: "",
        address: ""
    }
    const [user, setUser] = useState(users);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const inputHandler = (e) => {
        const { name, value } = e.target;

        setUser((pre) => ({
            ...pre, [name]: value
        }))
        if (errors[name]) {
            setErrors((pre) => ({
                ...pre, [name]: ""
            }))
        }
    }
    const validate = () => {
        let newErrors = {};
        if (!user.name.trim()) newErrors.name = "vui lòng nhập tên"
        if (!user.email.trim()) newErrors.email = "vui lòng nhập email"
        if (!user.address.trim()) newErrors.address = "vui lòng nhập address"
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    const submitForm = async (e) => {
        e.preventDefault();
        if (!validate()) return
        try {
            // Dùng try/catch với await cho code gọn gàng
            await axios.post("http://localhost:1234/api/user", user);
            console.log("User created successfully");
            toast.success("Thêm user thành công", { position: "top-right" })
            navigate("/");

        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setErrors((pre) => ({
                    ...pre, email: err.response.data.message
                }))
            } else {
                alert("error")
            }
        }
    }



    return (
        <div>
            <div className='addUser'>
                <Link to='/' type="buttons" className="btn btn-secondary"><i className="fa-duotone fa-solid fa-arrow-left"></i></Link>
                <h2>Add new User</h2>
                <form onSubmit={submitForm} className='addUserForm' >
                    <div className='inputGroup'>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text' value={user.name} onChange={inputHandler} placeholder='Enter your name' name='name' autoComplete='off'>

                        </input>
                        {errors.name && <p className='error-text'>{errors.name}</p>}

                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' value={user.email} onChange={inputHandler} placeholder='Enter your Email' name='email' autoComplete='off'></input>
                        {errors.email && <p className='error-text'>{errors.email}</p>}

                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='address'>Address:</label>
                        <input type='text' value={user.address} onChange={inputHandler} placeholder='Enter your address' name='address' autoComplete='off'></input>
                        {errors.address && <p className='error-text'>{errors.address}</p>}

                    </div>
                    <div className='inputGroup'>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUser
