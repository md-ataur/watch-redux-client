import React from 'react';
import useProducts from '../../../../hooks/useProducts';
import { HiX } from "react-icons/hi";

const ManageProducts = () => {
    const [products, setProducts, loading] = useProducts();

    // Handle Delete
    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            fetch(`https://safe-reef-49405.herokuapp.com/products/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Successfully Deleted');
                        const restData = products.filter(product => product._id !== id);
                        setProducts(restData);
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
                                        Image
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    products.map(product =>
                                        <tr key={product._id}>
                                            <td className="px-6 py-3 text-gray-600 whitespace-nowrap">
                                                <img className="w-16" src={product.image} alt="" />
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div>
                                                        <div className="text-gray-600">
                                                            {product.title}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                <div className="text-gray-600">${product.price}</div>
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap text-center">
                                                <button onClick={() => handleDelete(product._id)} className="font-medium text-red-600 text-lg"><HiX /></button>
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

export default ManageProducts;