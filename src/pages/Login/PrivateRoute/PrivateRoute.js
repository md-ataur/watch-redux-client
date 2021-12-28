import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div className="text-center py-20 pb-32 flex justify-around">
            <button type="button" className="inline-flex items-center rounded text-lg text-white bg-gray-600 py-2 px-4 cursor-not-allowed" disabled>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing
            </button>
        </div>
    }

    return (
        <div>
            {
                user.email ? children : <Navigate to="/login" state={{ from: location }}></Navigate>
            }
        </div>
    );
};

export default PrivateRoute;