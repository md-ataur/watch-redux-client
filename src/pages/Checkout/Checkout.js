import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51Jw1yKJ189VmxbXkTUK986eTAImJKC0ObZ56MrM4yzVx0eVAxoAD5aJEHb0vQgKAJAzfNQCJVlgVPblFz4icXxy000a5Ru44ZY');

const Checkout = () => {
    return (
        <div className="max-w-6xl overflow-x-auto m-auto px-4 mt-4 mb-10 md:mt-16 md:mb-20">
            <h2 className="text-3xl text-center text-gray-700 font-semibold mb-10">Billing Details</h2>
            <div className="max-w-lg mx-auto">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Checkout;