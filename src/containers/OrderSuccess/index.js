/*
 *
 * OrderSuccess
 *
 */

import React, { useEffect, useState } from 'react';

import { NavLink, useParams } from 'react-router-dom';


import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { useHttp } from '../../hooks';

function OrderSuccess() {
  const {id} = useParams()
  const {sendRequest, isLoading} = useHttp()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    sendRequest(`/order/${id}`, setOrder)
  }, [id, sendRequest])


  return (
    <div className='order-success'>
      {isLoading ? (
        <LoadingIndicator />
      ) : order?._id ? (
        <div className='order-message'>
          <h2>Thank you for your order.</h2>
          <p>
            Order{' '}
            <NavLink
              to={`/order/${order._id}?success`}
              // to={`/order/${order._id}?success`}
              className='order-label'
            >
              #{order._id}
            </NavLink>{' '}
            is complete.
          </p>
          <p>A confirmation email will be sent to you shortly.</p>
          <div className='order-success-actions'>
            <NavLink to='/dashboard/orders' className='btn-link'>
              Manage Orders
            </NavLink>
            <NavLink to='/shop' className='btn-link shopping-btn'>
              Continue Shopping
            </NavLink>
          </div>
        </div>
      ) : (
        <NotFound message='No order found.' />
      )}
    </div>
  );
}

// const mapStateToProps = state => {
//   return {
//     order: state.order.order,
//     isLoading: state.order.isLoading
//   };
// };

export default OrderSuccess;
