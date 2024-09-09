import React, { useState } from 'react';

function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(item) {
        setCartItems([...cartItems, item]);
    }

    function removeFromCart(itemIndex) {
        const newCartItems = [...cartItems];
        newCartItems.splice(itemIndex, 1);
        setCartItems(newCartItems);
    }

    function calculateTotal() {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    }

    return (
        <div>
            <h2>Shopping Cart</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        {item.name} x {item.quantity} - ${item.price * item.quantity}
                        <button onClick={() => removeFromCart(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <p>Total: ${calculateTotal()}</p>
            <button onClick={() => setCartItems([])}>Clear Cart</button>
        </div>
    );
}

export default ShoppingCart;