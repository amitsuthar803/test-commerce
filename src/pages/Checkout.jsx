import React from 'react';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 className=' text-2xl mb-2'>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.title} x {item.quantity} — ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
          <h3 className='mt-3 font-semibold'>Total: ₹{total}</h3>
          <button className=' bg-teal-800 text-white w-full mt-2 p-1'>Place Order</button>
        </>
      )}
    </div>
  );
};

export default Checkout;
