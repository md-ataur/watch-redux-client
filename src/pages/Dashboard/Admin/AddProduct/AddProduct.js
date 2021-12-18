import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm();
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = data => {
        fetch(`https://safe-reef-49405.herokuapp.com/products`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setSuccessMessage('Successfully Product Added');
                    reset();
                }
                console.log(data);
            })
    };

    setTimeout(() => {
        setSuccessMessage("");
    }, 3000);

    return (
        <div className="max-w-sm mx-auto">
            {
                successMessage &&
                <p className="bg-gray-600 text-white text-center py-3 px-4 mb-6">{successMessage}</p>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="text-gray-700 mb-2 block">Product Name</label>
                    <input {...register("title", { required: true })} className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                </div>
                <div className="mb-3">
                    <label className="text-gray-700 mb-2 block">Price</label>
                    <input {...register("price", { required: true })} className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                </div>
                <div className="mb-3">
                    <label className="text-gray-700 mb-2 block">Image URL</label>
                    <input {...register("image", { required: true })} className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                </div>
                <div className="mb-4">
                    <label className="text-gray-700 mb-2 block">Description</label>
                    <textarea {...register("desc", {})} cols="30" rows="3" className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                </div>
                <div className="text-center">
                    <button type="submit" className=" bg-gray-700 hover:bg-gray-600 text-white rounded py-3 px-6">Product Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;