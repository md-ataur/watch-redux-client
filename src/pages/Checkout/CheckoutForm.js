import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';

const CheckoutForm = () => {
    const [products, setProducts, loading] = useProducts();
    const [toggle, setToggle] = useState(true);
    const [cart, setCart] = useCart(products, toggle);
    const { register, handleSubmit, reset } = useForm();
    const orders = getStoredCart();
    const { user } = useAuth();
    // Stripe
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    // Error
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);


    // Subtotal
    let subTotalArr = [];
    for (let item of cart) {
        subTotalArr.push(item?.price * item?.quantity);
    }
    let subTotal = subTotalArr.reduce((a, b) => a + b, 0);

    // Shipping, tax and totalPrice
    const shipping = 50;
    const tax = subTotal * 0.05;
    const totalPrice = subTotal ? subTotal + shipping + tax : 0;


    // Hitted to the strip api
    useEffect(() => {
        fetch(`https://safe-reef-49405.herokuapp.com/create-payment-intent`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ totalPrice })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))

    }, [totalPrice]);


    // Handle submit
    const onSubmit = async data => {

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        setProcessing(true);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        // Payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            },
        );

        if (intentError) {
            setError(intentError.message);
            setSuccess('');
        } else {
            setError('');
            setSuccess('Payment Processed Successfully');
            // console.log(paymentIntent);
            setProcessing(false);

            // Order information inserting to DB
            data.status = 'Pending';
            data.orders = orders;
            data.amount = paymentIntent.amount;
            data.transaction = paymentIntent.client_secret.split('_secret')[0];
            data.created = paymentIntent.created;

            fetch(`https://safe-reef-49405.herokuapp.com/orders`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess('Received your order');
                        reset();
                        clearTheCart();
                        setToggle(!toggle);
                    }
                });
        }

        // Error message
        if (error) {
            setError(error.message);
            setSuccess('');
        } else {
            setError('');
            // console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (
        <>
            <div className="text-lg">
                {
                    success && <p style={{ color: 'green', marginBottom: '15px' }}>{success}</p>
                }
                {
                    error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>
                }
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="text-gray-700 mb-2 block">Name</label>
                    <input {...register("name", { required: true })} value={user?.displayName} readOnly className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                </div>
                <div className="mb-3">
                    <label className="text-gray-700 mb-2 block">Email</label>
                    <input {...register("email", { required: true })} value={user?.email} readOnly className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                </div>
                <div className="mb-3">
                    <label className="text-gray-700 mb-2 block">Phone</label>
                    <input {...register("mobile", { required: true })} className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                </div>
                <div className="mb-3">
                    <label className="text-gray-700 mb-2 block">City</label>
                    <input {...register("city", { required: true })} className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                </div>
                <div className="mb-3">
                    <label className="text-gray-700 mb-2 block">Address</label>
                    <textarea {...register("address", {})} cols="30" rows="3" className="appearance-none border border-gray-300 shadow-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                </div>
                <div className="mb-3">
                    <label className="text-gray-700 mb-3 block">Payment</label>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                {processing ? <p className="mt-4">Loading</p> :
                    <button type="submit" disabled={!stripe || success} className="bg-gray-700 hover:bg-gray-600 text-white rounded py-2 px-6 mt-5">
                        Pay (${totalPrice})
                    </button>
                }
            </form>
        </>
    );
};

export default CheckoutForm;