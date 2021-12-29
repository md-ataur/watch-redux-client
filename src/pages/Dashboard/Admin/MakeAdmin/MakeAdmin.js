import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const MakeAdmin = () => {
    const { register, handleSubmit, reset } = useForm();
    const [message, setMessage] = useState('');

    const onSubmit = data => {
        fetch(`https://safe-reef-49405.herokuapp.com/users/admin`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('idToken')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setMessage('User Role Added');
                    reset();
                }
                if (data.modifiedCount === 0) {
                    setMessage('Email not found');
                }
                console.log(data);
            })
    };

    setTimeout(() => {
        setMessage("");
    }, 4000);

    return (
        <div className="max-w-lg mx-auto mt-14">
            {
                message &&
                <p className="text-gray-600 mb-3 text-lg">{message}</p>
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