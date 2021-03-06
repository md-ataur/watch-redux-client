import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { addToDb } from '../../utilities/fakedb';

const ProductDetails = () => {
    const { pid } = useParams();
    const [qunt, setQunt] = useState(1);
    const [product, setProduct] = useState([]);
    const [message, setMessage] = useState('');
    const [viewCart, setViewCart] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        fetch(`https://safe-reef-49405.herokuapp.com/products/${pid}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .finally(() => {
                setLoading(false);
            })
    }, []);


    setTimeout(() => {
        setMessage('');
    }, 3000);

    // AddToCart button handler
    const handleAddToCart = (product) => {
        addToDb(product._id, qunt);
        setMessage('Item added to your cart');
        setViewCart(true);
    }

    // Price update
    const updatePrice = product?.price * qunt;

    // Increase handler
    const quantityIncrease = () => {
        setQunt(qunt + 1);
    }
    // Decrease handler
    const quantityDecrease = () => {
        if (qunt > 1) {
            setQunt(qunt - 1);
        }
    }

    return (
        <div className="max-w-6xl m-auto px-4 mt-4 mb-10 md:mt-16 md:mb-20">
            {loading &&
                <div className="text-center flex justify-around">
                    <button type="button" className="inline-flex items-center rounded text-lg text-white bg-gray-600 py-2 px-4 cursor-not-allowed" disabled>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading
                    </button>
                </div>
            }
            {!loading &&
                <div className="md:flex justify-between">
                    <div className="max-w-lg border px-2 py-6 mb-6">
                        <img src={product?.image} alt="" />
                    </div>
                    <div className="md:pl-10 flex-1">
                        <h2 className="text-3xl mb-4">{product?.title}</h2>
                        <p className="text-2xl mb-4">${updatePrice}</p>
                        <p className="mb-4">{product?.desc}</p>
                        <p className="mb-2">Quantity:</p>
                        <div className="w-28 mb-6 flex flex-row items-center justify-between h-12 border border-gray-300">
                            <button onClick={quantityDecrease} className="text-gray-600 h-full w-10 cursor-pointer">
                                <span className="pb-1 block text-2xl font-thin">???</span>
                            </button>
                            <span>{qunt}</span>
                            <button onClick={quantityIncrease} className="text-gray-600 h-full w-10 cursor-pointer">
                                <span className="pb-1 block text-2xl font-thin">+</span>
                            </button>
                        </div>
                        <div>
                            <button onClick={() => handleAddToCart(product)} className="py-2 px-5 mr-2 text-lg rounded bg-gray-700 hover:bg-gray-600 text-white">Add to cart</button>
                            {
                                viewCart &&
                                <Link className="text-lg text-gray-700 hover:opacity-70" to="/cart">View Cart</Link>
                            }
                        </div>
                        {
                            message &&
                            <p className="text-xl text-green-700 my-2">{message}</p>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default ProductDetails;