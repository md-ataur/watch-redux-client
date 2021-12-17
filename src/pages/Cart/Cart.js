import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { HiX } from "react-icons/hi";
import { addToDb, removeFromDb } from '../../utilities/fakedb';

const Cart = () => {
    const [products, setProducts, loading] = useProducts();
    const [toggle, setToggle] = useState(true);
    const [cart, setCart] = useCart(products, toggle);

    // Subtotal
    let subTotalArr = [];
    for (let item of cart) {
        subTotalArr.push(item?.price * item?.quantity);
    }
    let subTotal = subTotalArr.reduce((a, b) => a + b, 0);

    // Shipping, tax and totalPrice
    const shipping = 50;
    const tax = subTotal * 0.05;
    const totalPrice = subTotal + shipping + tax;

    // Remove cart item
    const handleDeleteItem = (id) => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            removeFromDb(id);
            const restItems = cart.filter(item => item._id !== id);
            setCart(restItems);
        }
    }

    // Increase handler
    const quantityIncrease = (id) => {
        const exists = cart.find(item => item._id === id);
        if (exists) {
            let q = exists.quantity += 1;
            addToDb(id, q);
            setToggle(!toggle);
        }
    }

    // Decrease handler
    const quantityDecrease = (id) => {
        const exists = cart.find(item => item._id === id);
        if (exists && exists.quantity > 1) {
            let q = exists.quantity -= 1;
            addToDb(id, q);
            setToggle(!toggle);
        }
    }

    return (
        <div className="max-w-6xl overflow-x-auto m-auto px-4 mt-4 mb-10 md:mt-16 md:mb-20">
            <h2 className="text-center text-3xl text-gray-600 mb-10">Your Cart List</h2>
            {loading ?
                <div className="text-center flex justify-around">
                    <button type="button" className="inline-flex items-center rounded text-lg text-white bg-gray-600 py-2 px-4 cursor-not-allowed" disabled>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading
                    </button>
                </div>
                :
                <div className="w-full">
                    <div className="mb-4 overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 pb-3 text-left font-medium text-gray-600">
                                        Item
                                    </th>
                                    <th scope="col" className="px-6 pb-3 text-left font-medium text-gray-600">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 pb-3 text-left font-medium text-gray-600">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 pb-3 text-left font-medium text-gray-600">
                                        Subtotal
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
                                {cart.map(item =>
                                    <tr key={item?._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <img className="w-24" src={item?.image} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div>
                                                        {item?.title}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>${item?.price}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="w-24 flex flex-row items-center justify-between h-12">
                                                <button onClick={() => quantityDecrease(item?._id)} className="text-gray-600 h-full w-10 cursor-pointer">
                                                    <span className="pb-1 block text-2xl font-thin">−</span>
                                                </button>
                                                <span>{item?.quantity}</span>
                                                <button onClick={() => quantityIncrease(item?._id)} className="text-gray-600 h-full w-10 cursor-pointer">
                                                    <span className="pb-1 block text-2xl font-thin">+</span>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            ${item?.price * item?.quantity}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                                            <button onClick={() => handleDeleteItem(item?._id)} className="text-red-600 text-lg"><HiX /></button>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        subTotal ? "" : <p className="text-xl text-gray-600">Your cart is empty!</p>
                    }
                </div>
            }

            <div className="md:float-right w-full md:w-96 p-4">
                <div>
                    <div className="border-b border-gray-200 text-xl text-gray-600 pb-3 mb-2 flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subTotal.toFixed(2)}</span>
                    </div>
                    <div className="border-b border-gray-200 text-lg text-gray-600 pb-3 mb-2 flex justify-between">
                        <span>Shipping:</span>
                        <span>${subTotal ? shipping : 0}</span>
                    </div>
                    <div className="border-b border-gray-200 text-lg text-gray-600 pb-3 mb-2 flex justify-between">
                        <span>Tax:</span>
                        <span>{subTotal ? 5 : 0}%</span>
                    </div>
                    <div className="pb-3 mb-2 text-2xl text-gray-600 flex justify-between">
                        <span>Total:</span>
                        <span>{subTotal ? totalPrice.toFixed(2) : 0}</span>
                    </div>
                </div>
                <div className="mt-4 float-right"><Link to="/checkout"><button className="text-lg bg-gray-700 hover:bg-gray-600 text-white rounded py-3 px-5">Checkout</button></Link></div>
            </div>
        </div>
    );
};

export default Cart;