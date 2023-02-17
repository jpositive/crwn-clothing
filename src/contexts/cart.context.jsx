import { createContext, useEffect, useReducer, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    //1. find if cart items containts productToAdd
    const existingCartItem = cartItems.length > 0
        ? cartItems.find( 
            (cartItem) => cartItem.id === productToAdd.id
            )
        : false;

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
});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    console.log('state -> ', JSON.stringify(state), ' payload -> ', JSON.stringify(payload));
    switch(type){
        case 'SET_CART_ITEMS':
            return {
                ...state,
                ...payload,                
            };
        case 'SET_IS_CART_OPEN':
            return {
                ...state,
                isCartOpen: payload,
            }


        default: 
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }
}

export const CartProvider = ({ children }) => {
    const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
      useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
          (total, cartItem) => total + cartItem.quantity,
          0
        );
        
        const newCartTotal = newCartItems.reduce(
          (total, cartItem) => total + cartItem.quantity * cartItem.price,
          0
        );

        dispatch({
          type: 'SET_CART_ITEMS',
          payload: {
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            cartCount: newCartCount,
          },
        });
    }
    

    const addItemToCart = (productToAdd) => {
        const newCartItems =  addCartItem (cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems =  removeCartItem (cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };
    const clearItemFromCart = (cartItemToRemove) => {
        const newCartItems = clearCartItem (cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };
    
    const setIsCartOpen = (bool) => {
        dispatch( {type: 'SET_IS_CART_OPEN', payload: bool });
    }

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