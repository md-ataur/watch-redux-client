import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [fieldData, setFieldData] = useState({});
    const [fieldError, setFieldError] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Basic Validation
        if (fieldData.email === '' || fieldData.password === '') {
            setFieldError('Your field is empty!');
            return;
        } else {
            setFieldError('');
        }
    }

    // Handle field data
    const handleOnBlur = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const newFieldData = { ...fieldData };
        newFieldData[name] = value;
        setFieldData(newFieldData);
    }

    return (
        <div className="max-w-6xl m-auto px-4 my-10 md:mb-20">
            <h2 className="text-4xl text-center text-gray-700 font-semibold mb-4">Login</h2>
            {
                fieldError &&
                <p className="text-lg text-red-600 text-center py-3">{fieldError}</p>
            }
            <div className="max-w-sm mx-auto">
                <form onSubmit={handleFormSubmit} action="">
                    <div className="mb-4">
                        <label className="text-gray-700 text-lg mb-2 block">Email</label>
                        <input onBlur={handleOnBlur} type="email" name="email" className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" placeholder="" />
                    </div>
                    <div className="mb-5">
                        <label className="text-gray-700 text-lg mb-2 block">Password</label>
                        <input onBlur={handleOnBlur} type="password" name="password" className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" placeholder="" />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="w-full bg-gray-600 hover:bg-gray-500 text-white text-lg rounded py-2 px-6">Login</button>
                    </div>
                </form>
                <p className="text-center text-gray-600 text-lg">Are you registered?<Link className="text-gray-600 hover:text-green-700 text-lg" to="/register"> Register</Link></p>
            </div>
        </div>
    );
};

export default Login;