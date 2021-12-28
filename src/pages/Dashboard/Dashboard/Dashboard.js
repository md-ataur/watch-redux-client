import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';


const Dashboard = () => {
    const { user, logout, admin } = useAuth();

    return (
        <div className="max-w-6xl m-auto py-8 px-4 lg:flex">
            <div className="w-52">
                <div>
                    {!admin &&
                        <div>
                            <div className="mb-3 px-3"><Link className="text-gray-700 hover:text-gray-500 font-medium" to="/dashboard/pay">Pay</Link></div>
                            <div className="mb-3 px-3"><Link className="text-gray-700 hover:text-gray-500 font-medium" to="/dashboard/myorders">My Orders</Link></div>
                            <div className="mb-3 px-3"><Link className="text-gray-700 hover:text-gray-500 font-medium" to="/dashboard/review">Review</Link></div>
                        </div>
                    }
                    {admin &&
                        <div>
                            <div className="mb-3 px-3"><Link className="text-gray-700 hover:text-gray-500 font-medium" to="/dashboard/makeadmin">Make Admin</Link></div>
                            <div className="mb-3 px-3"><Link className="text-gray-700 hover:text-gray-500 font-medium" to="/dashboard/manageorders">Manage Orders</Link></div>
                            <div className="mb-3 px-3"><Link className="text-gray-700 hover:text-gray-500 font-medium" to="/dashboard/addproduct">Add Product</Link></div>
                            <div className="mb-3 px-3"><Link className="text-gray-700 hover:text-gray-500 font-medium" to="/dashboard/manageproducts">Manage Products</Link></div>
                        </div>
                    }
                    <div className="mb-3 px-3">
                        {user.email ?
                            <button className="text-gray-700 hover:text-gray-500 font-medium" onClick={logout}>Logout</button>
                            :
                            <Link className="text-gray-700 hover:text-gray-500 font-medium" to="/login">Login</Link>
                        }
                    </div>
                </div>
            </div>
            <div className="flex-1 px-5 border-l-2">
                <div className="mb-8 shadow-md px-5 pb-5">
                    <h2 className="text-xl font-medium text-gray-700">Dashboard</h2>
                </div>
                <div className="px-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;