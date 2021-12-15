import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';

const ProductDetails = () => {
    const { pid } = useParams();
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const product = products.find((product) => product.id === pid);
    console.log(product);

    useEffect(() => {
        fetch('../products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    const updatePrice = product?.price * quantity;

    const quantityIncrease = () => {
        setQuantity(quantity + 1);
    }

    const quantityDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <div className="max-w-6xl m-auto px-4 my-10 md:mt-16 md:mb-20">
            <div className="flex justify-between">
                <div className="max-w-lg border px-2 py-6">
                    <img src={product?.image} alt="" />
                </div>
                <div className="pl-20 flex-1">
                    <h2 className="text-3xl mb-4">{product?.title}</h2>
                    <p className="text-2xl mb-4">${updatePrice}</p>
                    <p className="mb-4">{product?.desc}</p>
                    <p className="mb-2">Quantity:</p>
                    <div class="w-32 mb-6 flex flex-row items-center justify-center h-12 border border-gray-300">
                        <button onClick={quantityDecrease} class="text-gray-600 h-full w-20 cursor-pointer">
                            <span class="pb-1 block text-2xl font-thin">−</span>
                        </button>
                        <span>{quantity}</span>
                        <button onClick={quantityIncrease} class="text-gray-600 h-full w-20 cursor-pointer">
                            <span class="pb-1 block text-2xl font-thin">+</span>
                        </button>
                    </div>
                    <div>
                        <button className="py-2 px-5 text-lg rounded bg-gray-700 hover:bg-gray-600 text-white">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;