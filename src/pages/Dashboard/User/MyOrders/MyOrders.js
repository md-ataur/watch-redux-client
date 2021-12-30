import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const email = user.email;
        fetch(`https://safe-reef-49405.herokuapp.com/orders/byemail`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('idToken')}`
            },
            body: JSON.stringify({ email })
        })
            .then(res => res.json())
            .then(data => {
                setMyOrders(data);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            fetch(`https://safe-reef-49405.herokuapp.com/orders/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Successfully Deleted');
                        const restData = myOrders.filter(order => order._id !== id);
                        setMyOrders(restData);
                    }
                })
        }
    }

    return (
        <div className="flex flex-col">
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
                <div className="-mx-5 align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Order List
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    myOrders.map(order =>
                                        <tr key={order._id}>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div>
                                                        <div className="font-medium text-gray-700">
                                                            {order.name}
                                                        </div>
                                                        <div className="text-gray-500">
                                                            {order.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-gray-600 leading-5">
                                                    {order.status === 'Pending' ?
                                                        <span className="text-red-600">{order.status}</span>
                                                        :
                                                        <span className="text-green-700">{order.status}</span>
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap font-medium">
                                                <button onClick={() => handleDelete(order._id)} className="bg-red-600 hover:bg-gray-600 text-sm font-medium text-white rounded py-2 px-3">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    );
};

export default MyOrders;