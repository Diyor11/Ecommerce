/*
 *
 * Cart
 *
 */

import React, { useEffect, useMemo, useState } from 'react';

import CartList from '../../components/Store/CartList';
import CartSummary from '../../components/Store/CartSummary';
import Checkout from '../../components/Store/Checkout';
import { BagIcon } from '../../components/Common/Icon';
import {FaTimes} from 'react-icons/fa'
import Button from '../../components/Common/Button';
import { useDispatch, useSelector } from 'react-redux';
import SelectOption from '../../components/Common/SelectOption';
import { useHttp } from '../../hooks';
import { clearCart, removeFromCart } from '../../redux/cartSlice';
import { toggleCart } from '../../redux/modalSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart(props){
  
  const {
    isCartOpen,
    authenticated,
    closeCart
  } = props;

  const {products: cartItems, totalPrice} = useSelector(state => state.cart)
  const [addresses, setAddesses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState({})
  const {sendRequest} = useHttp()  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const displayAdress = addresses.length > 0
  const displayCart = useMemo(() => cartItems.length > 0, [cartItems])

  const handleRemoveFromCart = (item) => dispatch(removeFromCart(item._id))
  const handleShopping = () => dispatch(toggleCart(false))
  const handleCheckout = () => {
    navigate('/login')
    handleShopping()
  }
  const placeOrder = () => {
    if(displayAdress) {
      const data = cartItems.map(item => ({_id: item._id, quantity: item.quantity, price: item.price}))
      sendRequest({url: '/order/add', method: 'post', data}, (order) => {
        navigate(`/order/success/${order._id}`)
        dispatch(toggleCart(false))
        dispatch(clearCart())
      })
      
    } else {
      navigate('/dashboard/address/add')
      dispatch(toggleCart(false))
      toast('Please add your address', {type: 'warning'})
    }
  }

  useEffect(() => {
    if(isCartOpen) {
      const token = localStorage.getItem('token')
      if(token && displayCart) {
        sendRequest('/address' , ({addresses: data}) => {
          const options = data.map((address, index) => ({value: index, label: address.address}))
          setAddesses(options)
          setSelectedAddress(options[0])
        })
      }
    } else 
      setAddesses([])
  }, [isCartOpen, sendRequest, displayCart])


  return (
    <div
      className={isCartOpen ? 'mini-cart-open' : 'hidden-mini-cart'}
      aria-hidden={isCartOpen ? false : true}
    >
      <div className='mini-cart'>
        <div className='cart'>
          <div className='cart-header'>
            {isCartOpen && (
              <Button
                borderless
                variant='empty'
                ariaLabel='close the cart'
                icon={<FaTimes />}
                onClick={closeCart}
              />
            )}
          </div>
          {cartItems.length > 0 ? (
            <div className='cart-body'>
              <CartList
                closeCart={closeCart}
                cartItems={cartItems}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            </div>
          ) : (
            <div className='empty-cart'>
              <BagIcon />
              <p>Your shopping cart is empty</p>
            </div>
          )}
          {displayAdress && (
            <div className='select-address'>
              <SelectOption
                error={null}
                label={'Select Address'}
                name={'address'}
                value={selectedAddress}
                options={addresses}
                handleSelectChange={value => {
                  setSelectedAddress(value)
                }}
              />      
            </div>  
          )}
          {cartItems.length > 0 && (
            <div className='cart-checkout'>
              <CartSummary cartTotal={totalPrice} />
              <Checkout
                handleShopping={handleShopping}
                handleCheckout={handleCheckout}
                placeOrder={placeOrder}
                authenticated={authenticated}
              />
            </div>
          )}
        </div>
      </div>
      <div className={isCartOpen ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'} onClick={closeCart} />
    </div>
  );
}


export default Cart;
