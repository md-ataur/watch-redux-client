import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    const { id, title, price, desc, image } = product;
    return (
        <div className="border shadow-lg hover:shadow-xl transition px-4 py-7 text-center rounded-md">
            <Link to={`/details/${id}`}>
                <div className="mb-3"><img className="m-auto" src={image} alt="" /></div>
                <h3 className="text-xl text-gray-700 mb-2">{title}</h3>
                <p className="text-lg text-gray-600 font-medium mb-2">${price}</p>
            </Link>
        </div>
    );
};

export default Product;