import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import useAuth from '../../../hooks/useAuth';
import { HiOutlineMenu, HiOutlineShoppingCart, HiX } from "react-icons/hi";
import logo from '../../../images/logo.png';
import useCart from '../../../hooks/useCart';
import useProducts from '../../../hooks/useProducts';

const Header = () => {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const { user, logout } = useAuth();

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
                    <div className="w-32">
                        <Link to="/"><img src={logo} alt="" /></Link>
                    </div>
                    <button
                        className="text-gray-700 cursor-pointer text-3xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
                        type="button"
                        onClick={() => setNavbarOpen(!navbarOpen)}
                    >
                        {
                            navbarOpen ? <HiX /> : <HiOutlineMenu />
                        }
                    </button>
                </div>
                <div
                    className={
                        "md:flex flex-grow items-center transition" +
                        (navbarOpen ? " md:flex" : " hidden")
                    }
                    id="example-navbar-danger"
                >
                    <ul className="md:flex flex-col md:flex-row list-none md:ml-auto text-center md:text-left">
                        <li className="nav-item md:px-4 py-2.5 uppercase leading-snug text-gray-700 hover:opacity-75">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="nav-item md:px-4 py-2.5 uppercase leading-snug text-gray-700 hover:opacity-75">
                            <Link to="/watches">Watches</Link>
                        </li>
                        <li className="nav-item md:px-4 py-2.5 uppercase leading-snug text-gray-700 hover:opacity-75">
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item md:px-4 py-2.5 uppercase leading-snug text-gray-700 hover:opacity-75">
                            <Link to="/cart" className="flex justify-center"><span className="text-2xl mr-1"><HiOutlineShoppingCart /></span> <span>Cart</span></Link>
                        </li>
                        {user.email ?
                            <button className="nav-item md:px-4 py-2.5 uppercase leading-snug text-gray-700 hover:opacity-75" onClick={logout}>Logout</button>
                            :
                            <Link to="/login" className="nav-item md:px-4 py-2.5 uppercase leading-snug text-gray-700 hover:opacity-75">Login</Link>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;