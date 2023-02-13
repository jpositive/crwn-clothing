import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";
import './cart-dropdown.styles.scss'
import CartItem from "../cart-item/cart-item.component";


const CartDropdown = () => {
    const { cartItems } = useContext( CartContext);
    console.log ('CartDropdown ---', JSON.stringify(cartItems));
    return (
      <div className="cart-dropdown-container">
        <div className="cart-items">
          {cartItems.map((cartItem) => (<CartItem key= {cartItem.id} cartItem={cartItem} />))}
        </div>
        <Button>CHECKOUT</Button>
      </div>
    );
}

export default CartDropdown;