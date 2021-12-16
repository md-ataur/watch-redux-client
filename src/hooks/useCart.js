import { useEffect, useState } from "react";
import { getStoredCart } from "../utilities/fakedb";

const useCart = (products) => {
    const [cart, setCart] = useState([]);

    // Get data from the local storage
    useEffect(() => {
        if (products.length) {
            const getCartItems = getStoredCart();
            const storedCart = [];
            for (const id in getCartItems) {
                const matchedProduct = products.find(product => product._id === id);
                if (matchedProduct) {
                    const value = getCartItems[id];
                    matchedProduct.quantity = value;
                    storedCart.push(matchedProduct);
                }
            }
            setCart(storedCart);
        }

    }, [products]);

    return [cart, setCart];
}

export default useCart;