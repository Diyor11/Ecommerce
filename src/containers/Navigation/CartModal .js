import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../../redux/modalSlice';
import Cart from '../Cart';

const CartModal = ({ authenticated }) => {
  const isCartOpen = useSelector((state) => state.modal.cartOpen);
  const dispatch = useDispatch();

  const toggleCartModal = () => dispatch(toggleCart());

  return (
    <Cart
      isCartOpen={isCartOpen}
      authenticated={authenticated}
      closeCart={toggleCartModal}
    />
  );
};

export default CartModal;