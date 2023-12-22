import React from 'react';
import { BiCart } from 'react-icons/bi';

const CartWidget = () => {
  const itemCount = 3; 

  return (
    <div className="cart-widget ml-auto">
      <BiCart />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartWidget;
