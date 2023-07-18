/*
 *
 * List
 *
 */

import React, { useEffect, useState } from 'react';

import AddressList from '../../components/Manager/AddressList';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useHttp} from '../../hooks'
import LoadingIndicator from '../../components/Common/LoadingIndicator';

function List() {

  const [addresses, setAddress] = useState([])
  const navigate = useNavigate()
  const {sendRequest, isLoading} = useHttp()
  const dispatch = useDispatch()
  
  useEffect(() => {
    sendRequest({url: '/address'}, ({addresses}) => setAddress(addresses))
  }, [dispatch, sendRequest])

  return (
    <>
      <SubPage
        title='Addresses'
        actionTitle={'Add'}
        handleAction={() => navigate('/dashboard/address/add')}
      >
        
        {
          isLoading ? (
            <LoadingIndicator backdrop />
          ) : addresses.length > 0 ? (
            <AddressList addresses={addresses} />
          ) : (
            <NotFound message='No addresses found.' />
          )
        }
      </SubPage>
    </>
  );
}


export default List;