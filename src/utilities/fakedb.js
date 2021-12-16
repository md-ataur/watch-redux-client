// Item add to the cart
const addToDb = (id, qunt) => {
  const exists = getDb();
  let shoppingCart = {};

  if (!exists) {
    shoppingCart[id] = qunt;
  }
  else {
    shoppingCart = JSON.parse(exists);
    if (shoppingCart[id]) {
      const newCount = qunt;
      shoppingCart[id] = newCount;
    }
    else {
      shoppingCart[id] = qunt;
    }
  }

  updateDb(shoppingCart);
}

// Get cart items
const getDb = () => localStorage.getItem('cart_items');

// Update cart item
const updateDb = cart => {
  localStorage.setItem('cart_items', JSON.stringify(cart));
}

// Remove cart item
const removeFromDb = id => {
  const exists = getDb();
  if (!exists) {

  } else {
    const shoppingCart = JSON.parse(exists);
    delete shoppingCart[id];
    updateDb(shoppingCart);
  }
}

// Get cart items
const getStoredCart = () => {
  const exists = getDb();
  return exists ? JSON.parse(exists) : {};
}

// Clear the cart
const clearTheCart = () => {
  localStorage.removeItem('cart_items');
}

export { addToDb, removeFromDb, clearTheCart, getStoredCart }
