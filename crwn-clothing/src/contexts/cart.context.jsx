import { createContext, useState, useEffect } from "react";

// Helper function to add a product to the cart or increment its quantity
const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  );

  // if found, increment quantity
  if (existingCartItem) {
    // Product already in cart, increment quantity
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    // Product not in cart, add it
    // return new array with modified cartItems/ new cartItem
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  setCartItems: () => {},
  cartCount: 0
});

/*

product
{
  id, name, price, imageUrl
}

cartItem
{
  id, name, price, imageUrl, quantity
}
*/

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
      const newCartCount = cartItems.reduce((total, cartItem) => 
      total + cartItem.quantity, 0);
      setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
      setCartItems(addCartItem(cartItems, productToAdd));
    };

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };

    return (
      <CartContext.Provider value={value}>
        {children}
      </CartContext.Provider>
    );
};