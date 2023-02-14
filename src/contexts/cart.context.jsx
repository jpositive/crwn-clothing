import { createContext, useEffect, useState } from "react";


const addCartItem = (cartItems, productToAdd) => {

    console.log ('addCartItem---cartItems:', cartItems);
    console.log ('addCartItem---productToAdd.id:', productToAdd.id);
    
    //1. find if cart items containts productToAdd
    const existingCartItem = cartItems.length > 0
        ? cartItems.find( 
            (cartItem) => cartItem.id === productToAdd.id
            )
        : false;

    console.log ('addCartItem---existingCartItem:', existingCartItem);
    //2. if found increment Qty else make new entry to cart item

    if(existingCartItem){
        return cartItems.map ( (cartItem) => 
            cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem)
    }
    //3. return new array with modified cartItems / new cart Item 

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find cart item to REMOVE
    const existingCartItem = cartItems.find (
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    //Check if Quantity = 1 - if yes remove the item and RETURN
    if(existingCartItem.quantity === 1){
        return cartItems.filter ( cartItem => cartItem.id !== cartItemToRemove.id);
    }
    // return back cartItems with reduced Quantity
    return cartItems.map ( (cartItem) => 
        cartItem.id === cartItemToRemove.id 
        ? {...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem)

}
const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter ( cartItem => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
      const newCartCount = cartItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0
      );
      setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
      const newCartTotal = cartItems.reduce(
        (cartTotal, cartItem) => cartTotal + (cartItem.quantity * cartItem.price),
        0
      );
      setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems ( addCartItem (cartItems, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems ( removeCartItem (cartItems, cartItemToRemove));
    };
    const clearItemFromCart = (cartItemToRemove) => {
        setCartItems ( clearCartItem (cartItems, cartItemToRemove));
    };
    

    const value = {
      isCartOpen,
      setIsCartOpen,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      cartItems,
      cartCount,
      cartTotal
    };
    return (
      <CartContext.Provider value={value}> {children} </CartContext.Provider>
    );
}