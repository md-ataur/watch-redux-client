import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { addToDb } from '../../utilities/fakedb';

const ProductDetails = () => {
    const { pid } = useParams();
    const [qunt, setQunt] = useState(1);
    const [products] = useProducts();
    // const [cart, setCart] = useCart(products);

    const product = products.find((product) => product._id === pid);

    // AddToCart button handler
    const handleAddToCart = (product) => {
        /* const exists = cart.find(item => item._id === product._id);
        let newCart = [];

        if (exists) {
            const restProduct = cart.filter(item => item._id !== product._id);
            exists.quantity = qunt;
            newCart = [...restProduct];
        }
        else {
            product.quantity = qunt;
            newCart = [...cart, product];
        }

        setCart(newCart); */

        // Sent product id and quantity
        addToDb(product._id, qunt);
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
                            <span className="pb-1 block text-2xl font-thin">−</span>
                        </button>
                        <span>{qunt}</span>
                        <button onClick={quantityIncrease} className="text-gray-600 h-full w-10 cursor-pointer">
                            <span className="pb-1 block text-2xl font-thin">+</span>
                        </button>
                    </div>
                    <div>
                        <button onClick={() => handleAddToCart(product)} className="py-2 px-5 text-lg rounded bg-gray-700 hover:bg-gray-600 text-white">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;