import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';

const Checkout = () => {
    const [products, setProducts, loading] = useProducts();
    const [toggle, setToggle] = useState(true);
    const [cart, setCart] = useCart(products, toggle);
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const orders = getStoredCart();
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = data => {
        data.status = 'Pending';
        data.orders = orders;

        fetch(`https://safe-reef-49405.herokuapp.com/orders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setSuccessMessage('Received your order');
                    reset();
                    clearTheCart();
                    setToggle(!toggle);
                }
                console.log(data);
            })
    };

    return (
        <div className="max-w-6xl overflow-x-auto m-auto px-4 mt-4 mb-10 md:mt-16 md:mb-20">
            <h2 className="text-3xl text-center text-gray-700 font-semibold mb-10">Billing Details</h2>
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-10">
                <div className="col-span-4">
                    {
                        successMessage &&
                        <p className="bg-gray-600 text-white text-center py-3 px-4 mb-6">{successMessage}</p>
                    }
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="text-gray-700 mb-2 block">Name</label>
                            <input {...register("name", { required: true })} value={user?.displayName} readOnly className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                        </div>
                        <div className="mb-3">
                            <label className="text-gray-700 mb-2 block">Email</label>
                            <input {...register("email", { required: true })} value={user?.email} readOnly className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                        </div>
                        <div className="mb-3">
                            <label className="text-gray-700 mb-2 block">Phone</label>
                            <input {...register("mobile", { required: true })} className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                        </div>
                        <div className="mb-5">
                            <label className="text-gray-700 mb-2 block">City</label>
                            <input {...register("city", { required: true })} className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                        </div>
                        <div className="mb-4">
                            <label className="text-gray-700 mb-2 block">Address</label>
                            <textarea {...register("address", {})} cols="30" rows="3" className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                        </div>
                        <div className="text-center">
                            <button type="submit" className=" bg-gray-700 hover:bg-gray-600 text-white rounded py-3 px-6">Place Order</button>
                        </div>
                    </form>
                </div>
                <div className="col-span-3">
                    <h3 className="text-gray-600 text-lg mb-5">Your Orders</h3>
                    {loading ?
                        <div>
                            <button type="button" className="inline-flex items-center rounded text-lg text-white bg-gray-600 py-2 px-4 cursor-not-allowed" disabled>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading
                            </button>
                        </div>
                        :
                        <div>
                            {cart.map(item =>
                                <div key={item?._id} className="border-b border-gray-200 text-gray-600 pb-3 mb-3 flex justify-between">
                                    <span>{item?.title}</span>
                                    <span>{item?.quantity}</span>
                                </div>)
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Checkout;