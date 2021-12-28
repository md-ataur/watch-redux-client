import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [fieldData, setFieldData] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const { loginUser, signInWithGoogle, authError, isLoading } = useAuth();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Call loginUser function
        loginUser(fieldData.email, fieldData.password, location, navigate);
    }

    // Handle Google Login
    const handleGoogleSignIn = () => {
        signInWithGoogle(location, navigate)
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
                        authError &&
                        <p className="text-lg text-red-600 py-3">{authError}</p>
                    }
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
                    <div className="flex items-center justify-center border py-1 px-2 mb-3">
                        <span className="font-medium text-gray-600 mr-1">Sign-In with</span>
                        <button onClick={handleGoogleSignIn} className="text-4xl"><FcGoogle /></button>
                    </div>
                    <p className="text-center text-gray-600 text-lg">Are you registered?<Link className="text-gray-600 hover:text-green-700 text-lg" to="/register"> Register</Link></p>
                </div>
            }
        </div>
    );
};

export default Login;