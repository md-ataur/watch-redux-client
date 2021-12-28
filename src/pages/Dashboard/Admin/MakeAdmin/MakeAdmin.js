import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const MakeAdmin = () => {
    const { register, handleSubmit, reset } = useForm();
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = data => {
        fetch(`http://localhost:5000/users/admin`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setSuccessMessage('User Role Added');
                    reset();
                }
                // console.log(data);
            })
    };

    setTimeout(() => {
        setSuccessMessage("");
    }, 3000);

    return (
        <div className="max-w-lg mx-auto mt-20">
            {
                successMessage &&
                <p className="text-gray-600 mb-3">{successMessage}</p>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <input {...register("email", { required: true })} placeholder="Email" className="appearance-none w-72 border border-gray-300 shadow-sm py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                    <button type="submit" className=" bg-gray-700 hover:bg-gray-600 text-white py-3 px-6">Submit</button>
                </div>
                <div className="text-left">

                </div>
            </form>
        </div>
    );
};

export default MakeAdmin;