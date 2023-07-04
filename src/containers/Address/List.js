/*
 *
 * List
 *
 */

import React, { useEffect, useState } from 'react';

import AddressList from '../../components/Manager/AddressList';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useHttp} from '../../hooks'
// import {setAddresses} from '../../redux/profleSlice'

function List() {

  const [addresses, setAddress] = useState([])
  const navigate = useNavigate()
  const {sendRequest} = useHttp()
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
        {addresses.length > 0 ? (
          <AddressList addresses={addresses} />
        ) : (
          <NotFound message='No addresses found.' />
        )}
      </SubPage>
    </>
  );
}

// const mapStateToProps = state => {
//   return {
//     addresses: state.address.addresses
//   };
// };

export default List;