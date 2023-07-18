/*
 *
 * List
 *
 */

import React, { useEffect, useState } from 'react';


import { ROLES } from '../../constants';
import SubPage from '../../components/Manager/SubPage';
import OrderList from '../../components/Manager/OrderList';
import OrderSearch from '../../components/Manager/OrderSearch';
import SearchResultMeta from '../../components/Manager/SearchResultMeta';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
// import Pagination from '../../components/Common/Pagination';
import { useHttp } from '../../hooks';
import { useNavigate } from 'react-router-dom';

function List(props) {
  
  const [search, setSearch] = useState('')
  const [orders, setOrders] = useState([])
  const {sendRequest, isLoading} = useHttp()

  useEffect(() => {
    sendRequest('/order', setOrders)
  
  }, [sendRequest])
  

  const handleOrderSearch = e => {
    if (e.value.length >= 2)
      setSearch(e.value)
    else
      setSearch('')
  };
  
  const navigate = useNavigate()
  const { user = {role: ''}, advancedFilters = [] } = props;
  const isSearch = search.length > 0;
  const filteredOrders = search
    ? setOrders(prev => prev.filter(o => o._id.includes(search)))
    : orders;

  const displayOrders = filteredOrders && filteredOrders.length > 0;

  return (
    <div className='order-dashboard'>
      <SubPage
        title='Your Orders'
        actionTitle={user.role === ROLES.Admin && 'Customer Orders'}
        handleAction={() =>
          user.role === ROLES.Admin &&
          navigate('/dashboard/orders/customers')
        }
      >
        <OrderSearch
          onBlur={handleOrderSearch}
          onSearch={handleOrderSearch}
          onSearchSubmit={handleOrderSearch}
        />

        {isLoading && <LoadingIndicator />}
        {displayOrders && (
          <>
            <SearchResultMeta
              label='orders'
              count={isSearch ? filteredOrders.length : advancedFilters.count}
            />
            <OrderList orders={filteredOrders} />
          </>
        )}
        {!isLoading && !displayOrders && (
          <NotFound message='You have no orders yet.' />
        )}
      </SubPage>
    </div>
  );
}

export default List;
