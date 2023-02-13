import { createContext, useState } from "react";


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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { }
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems ( addCartItem (cartItems, productToAdd));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems };
    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    )
}