/**
 *
 * OrderPage
 *
 */

import React, { useEffect, useState } from 'react';

import OrderDetails from '../../components/Manager/OrderDetails';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { useNavigate, useParams } from 'react-router-dom';
import { useHttp } from '../../hooks';

function OrderPage(props) {

  const [order, setOrder] = useState(null)
  const {sendRequest, isLoading} = useHttp()
  const {id} = useParams()

  useEffect(() => {
    sendRequest(`/order/${id}`, setOrder)
  }, [id ,sendRequest])

  const navigate = useNavigate()
  const cancelOrder = () => {
    sendRequest({url: `/order/${id}`, method: 'delete'}, () => navigate('/dashboard/orders'))
  }

  const {
    user = {},
    updateOrderItemStatus = () => {}
  } = props;

  return (
    <div className='order-page'>
      {isLoading ? (
        <LoadingIndicator backdrop />
      ) : order?._id ? (
        <OrderDetails
          order={order}
          user={user}
          cancelOrder={cancelOrder}
          updateOrderItemStatus={updateOrderItemStatus}
          onBack={() => {
            if (window.location.toString().includes('success')) {
              navigate('/dashboard/orders');
            } else {
              navigate(-1);
            }
          }}
        />
      ) : (
        <NotFound message='No order found.' />
      )}
    </div>
  );
}

// const mapStateToProps = state => {
//   return {
//     user: state.account.user,
//     order: state.order.order,
//     isLoading: state.order.isLoading
//   };
// };

export default OrderPage;
