import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    if (cart.length === 0) return "0.00"; 
    const total = cart.reduce((total, item) => {
      const itemCost = Number(item.cost) || 0;
      const itemQuantity = Number(item.quantity) || 0;
      return total + itemCost * itemQuantity;
    }, 0);
    return total.toFixed(2);
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); 
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      handleRemove(item); 
    }
  };

  const calculateTotalCost = (item) => {
    const itemCost = Number(item.cost) || 0;
    const itemQuantity = Number(item.quantity) || 0;
    return (itemCost * itemQuantity).toFixed(2);
  };

  const showComingSoonMessage = () => {
    alert("Coming Soon");
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${Number(item.cost).toFixed(2)}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
                <button className="get-started-button1" onClick={showComingSoonMessage}>Check out</button>
        
      </div>
    </div>
  );
};

export default CartItem;
