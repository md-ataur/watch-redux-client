import React from 'react';
import { useForm } from "react-hook-form";
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { getStoredCart } from '../../utilities/fakedb';

const Checkout = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    const { register, handleSubmit } = useForm();
    const orders = getStoredCart();

    const onSubmit = data => {
        data.status = 'Pending';
        data.orders = orders;
        console.log(data);
    };

    return (
        <div className="max-w-6xl overflow-x-auto m-auto px-4 mt-4 mb-10 md:mt-16 md:mb-20">
            <h2 className="text-3xl text-center text-gray-700 font-semibold mb-10">Billing Details</h2>
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-x-10">
                <div className="col-span-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="text-gray-700 text-lg mb-2 block">Name</label>
                            <input {...register("name", { required: true })} className="appearance-none text-lg border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                        </div>
                        <div className="mb-3">
                            <label className="text-gray-700 text-lg mb-2 block">Email</label>
                            <input {...register("email", { required: true })} className="appearance-none text-lg border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                        </div>
                        <div className="mb-3">
                            <label className="text-gray-700 text-lg mb-2 block">Phone</label>
                            <input {...register("mobile", { required: true })} className="appearance-none text-lg border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                        </div>
                        <div className="mb-5">
                            <label className="text-gray-700 text-lg mb-2 block">City</label>
                            <input {...register("city", { required: true })} className="appearance-none text-lg border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                        </div>
                        <div className="mb-5">
                            <label className="text-gray-700 text-lg mb-2 block">Address</label>
                            <textarea {...register("address", {})} cols="30" rows="3" className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                        </div>
                        <div className="mb-3 text-center">
                            <button type="submit" className=" bg-gray-700 hover:bg-gray-600 text-white text-lg rounded py-3 px-6">Place Order</button>
                        </div>
                    </form>
                </div>
                <div className="col-span-2">
                    <h3 className="text-gray-600 text-lg mb-4">Your Order</h3>
                    {cart.map(item =>
                        <div key={item?._id} className="border-b border-gray-200 text-gray-600 pb-3 mb-3 flex justify-between">
                            <span>{item?.title}</span>
                            <span>{item?.quantity}</span>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Checkout;