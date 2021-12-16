// Item add to the cart
const addToDb = (id, qunt) => {
  const exists = getDb();
  let shopping_cart = {};
  if (!exists) {
    shopping_cart[id] = qunt;
  }
  else {
    shopping_cart = JSON.parse(exists);
    if (shopping_cart[id]) {
      const newCount = qunt;
      shopping_cart[id] = newCount;
    }
    else {
      shopping_cart[id] = qunt;
    }
  }
  updateDb(shopping_cart);
}

// Get cart items
const getDb = () => localStorage.getItem('shopping_cart');

// Update cart item
const updateDb = cart => {
  localStorage.setItem('shopping_cart', JSON.stringify(cart));
}

// Remove cart item
const removeFromDb = id => {
  const exists = getDb();
  if (!exists) {

  } else {
    const shopping_cart = JSON.parse(exists);
    delete shopping_cart[id];
    updateDb(shopping_cart);
  }
}

// Get cart items
const getStoredCart = () => {
  const exists = getDb();
  return exists ? JSON.parse(exists) : {};
}

// Clear the cart
const clearTheCart = () => {
  localStorage.removeItem('shopping_cart');
}

export { addToDb, removeFromDb, clearTheCart, getStoredCart }
