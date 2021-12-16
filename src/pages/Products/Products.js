import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('../products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
            .finally(() => {
                setLoading(false);
            })
    }, []);


    return (
        <div className="max-w-6xl m-auto px-4 my-10 md:mt-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl text-center uppercase font-medium text-gray-600 mb-8 md:mb-10">All Collection</h2>
            {loading ?
                <div className="text-center py-6 flex justify-around">
                    <button type="button" className="inline-flex items-center rounded text-lg text-white bg-gray-600 py-2 px-4 cursor-not-allowed" disabled>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading
                    </button>
                </div>
                :
                <div className="grid grid-col-1 md:grid-cols-3 gap-x-8 gap-y-10 mb-10">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                        >
                        </Product>)
                    }
                </div>
            }
        </div>
    );
};

export default Products;