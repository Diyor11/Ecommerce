/*
 *
 * List
 *
 */

import React, { useEffect, useMemo, useState } from 'react';


import SubPage from '../../components/Manager/SubPage';
import OrderList from '../../components/Manager/OrderList';
import OrderSearch from '../../components/Manager/OrderSearch';
import SearchResultMeta from '../../components/Manager/SearchResultMeta';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { useHttp } from '../../hooks';
import { getSearch } from '../../utils';

function List(props) {
  
  const [search, setSearch] = useState('')
  const [orders, setOrders] = useState([])
  const {sendRequest, isLoading} = useHttp()

  useEffect(() => {
    sendRequest('/order', setOrders)
  
  }, [sendRequest])
  

  const handleOrderSearch = e => {
    if (e.value.length >= 3)
      setSearch(e.value)
    else
      setSearch('')
  };
  
  const isSearch = search.length > 0;
  const filteredOrders = useMemo(() => {
    return getSearch(search, orders, '_id')
  }, [search, orders])

  const displayOrders = filteredOrders && filteredOrders.length > 0;

  console.log(filteredOrders);
  

  return (
    <div className='order-dashboard'>
      <SubPage
        title='Your Orders'
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
              count={isSearch ? filteredOrders.length : orders.length}
            />
            <OrderList orders={filteredOrders} />
          </>
        )}
        {!isLoading && !true && (
          <NotFound message='You have no orders yet.' />
        )}
      </SubPage>
    </div>
  );
}

export default List;
