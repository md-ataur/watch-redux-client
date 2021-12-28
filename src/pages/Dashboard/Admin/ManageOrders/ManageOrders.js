import React, { useEffect, useState } from 'react';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState('Shipped');
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/orders`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [toggle]);

    // Handle Update Status
    const handleUpdate = (id) => {
        const orderStatus = { status };
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderStatus)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setToggle(!toggle);
                }
            })

    }

    // Handle Delete
    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Successfully Deleted');
                        const restData = orders.filter(order => order._id !== id);
                        setOrders(restData);
                    }
                })
        }
    }

    return (
        <div className="flex flex-col">
            <div className="-mx-5 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    City
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                orders.map(order =>
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
                                            <div className="text-gray-700">{order.mobile}</div>
                                        </td>
                                        <td className="px-6 py-3 text-gray-700 whitespace-nowrap">
                                            {order.city}
                                        </td>
                                        <td className="px-6 py-3 text-gray-700 whitespace-nowrap">
                                            {order.status === 'Pending' ?
                                                <span className="text-red-600">{order.status}</span>
                                                :
                                                <span className="text-green-700">{order.status}</span>
                                            }
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap font-medium">
                                            <button onClick={() => handleUpdate(order._id)} className="mr-2 bg-gray-500 hover:bg-gray-600 text-sm font-medium text-white rounded py-2 px-3">Update Status</button>
                                            <button onClick={() => handleDelete(order._id)} className="bg-red-600 hover:bg-gray-600 text-sm font-medium text-white rounded py-2 px-3">Delete</button>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageOrders;