import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    const [fieldData, setFieldData] = useState({});
    const [fieldError, setFieldError] = useState('');
    const navigate = useNavigate();
    const { registerUser, authError, isLoading } = useAuth();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Password Validation
        if (fieldData.password !== fieldData.password2) {
            setFieldError('Did not match your password');
            return;
        } else {
            setFieldError('');
        }

        // Call registerUser function
        registerUser(fieldData.email, fieldData.password, fieldData.name, navigate);
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
            <h2 className="text-4xl text-center text-gray-700 font-semibold mb-4">Register</h2>
            {isLoading &&
                <div className="text-center py-6 flex justify-around">
                    <button type="button" className="inline-flex items-center rounded text-lg text-white bg-gray-600 py-2 px-4 cursor-not-allowed" disabled>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing
                    </button>
                </div>
            }
            {!isLoading &&
                <div className="max-w-sm mx-auto">
                    {
                        fieldError &&
                        <p className="text-lg text-red-600 py-3">{fieldError}</p>
                    }
                    {
                        authError &&
                        <p className="text-lg text-red-600 py-3">{authError}</p>
                    }
                    <form onSubmit={handleFormSubmit} action="">
                        <div className="mb-4">
                            <label className="text-gray-700 text-lg mb-2 block">Name</label>
                            <input onBlur={handleOnBlur} type="text" name="name" required className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" placeholder="" />
                        </div>
                        <div className="mb-4">
                            <label className="text-gray-700 text-lg mb-2 block">Email</label>
                            <input onBlur={handleOnBlur} type="email" name="email" required className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" placeholder="" />
                        </div>
                        <div className="mb-5">
                            <label className="text-gray-700 text-lg mb-2 block">Password</label>
                            <input onBlur={handleOnBlur} type="password" name="password" required className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" placeholder="" />
                        </div>
                        <div className="mb-5">
                            <label className="text-gray-700 text-lg mb-2 block">Re-Type Password</label>
                            <input onBlur={handleOnBlur} type="password" name="password2" required className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" placeholder="" />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="w-full bg-gray-600 hover:bg-gray-500 text-white text-lg rounded py-2 px-6">Create account</button>
                        </div>
                    </form>
                    <p className="text-center text-gray-600 text-lg">Already have an account?<Link className="text-gray-600 hover:text-green-700 text-lg" to="/login"> Login</Link></p>
                </div>
            }
        </div>
    );
};

export default Register;