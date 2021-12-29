import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';


const Dashboard = () => {
    const { user, logout, admin } = useAuth();

    let activeStyle = {
        color: '#18b2cb',
    };

    let activeClassName = "color";

    return (
        <div className="max-w-6xl m-auto py-8 px-4 lg:flex">
            <div className="w-52">
                <div>
                    {!admin &&
                        <div>
                            <div className="mb-3 px-3"><NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className="text-gray-700 hover:text-gray-500 font-medium" to="/dashboard/pay">Pay</NavLink></div>
                            <div className="mb-3 px-3"><NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className="text-gray-700 hover:text-gray-500 font-medium" to="/dashboard/myorders">My Orders</NavLink></div>
                        </div>
                    }
                    {admin &&
                        <div>
                            <div className="mb-3 px-3"><NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className="text-gray-700 hover:text-gray-500 font-medium" to="/dashboard/makeadmin">Make Admin</NavLink></div>
                            <div className="mb-3 px-3"><NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className="text-gray-700 hover:text-gray-500 font-medium" to="/dashboard/manageorders">Manage Orders</NavLink></div>
                            <div className="mb-3 px-3"><NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className="text-gray-700 hover:text-gray-500 font-medium" to="/dashboard/addproduct">Add New Product</NavLink></div>
                            <div className="mb-3 px-3"><NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className="text-gray-700 hover:text-gray-500 font-medium" to="/dashboard/manageproducts">Manage Products</NavLink></div>
                        </div>
                    }
                    <div className="mb-3 px-3">
                        {user.email ?
                            <button className="text-gray-700 hover:text-gray-500 font-medium" onClick={logout}>Logout</button>
                            :
                            <NavLink className="text-gray-700 hover:text-gray-500 font-medium" to="/login">Login</NavLink>
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