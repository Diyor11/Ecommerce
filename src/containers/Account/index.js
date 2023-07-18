/*
 *
 * Account
 *
 */

import React from 'react';

import AccountDetails from '../../components/Manager/AccountDetails';
import SubPage from '../../components/Manager/SubPage';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks';
import { updateUser } from '../../redux/profleSlice';

function Account() {
  
  const user = useSelector(state => state.profile.user)
  const {sendRequest} = useHttp()
  const dispatch = useDispatch()

  const updateProfile = (data) => {
    sendRequest(
      {
        url: '/user', 
        method: 'PUT', 
        data
      }, 
      (data) => dispatch(updateUser(data.user)),
      {}
    )
  }

  return (
    <div className='account'>
      <SubPage title={'Account Details'} isMenuOpen={null}>
        <AccountDetails
          user={user}
          updateProfile={updateProfile}
        />
      </SubPage>
    </div>
  );
}

export default Account;
