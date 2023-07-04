/**
 *
 * Dashboard
 *
 */

import React from 'react';


import { ROLES } from '../../constants';
import dashboardLinks from './links.json';
// import { isDisabledMerchantAccount } from '../../utils/app';
// import Admin from '../../components/Manager/Dashboard/Admin';
// import Merchant from '../../components/Manager/Dashboard/Merchant';
import Customer from '../../components/Manager/Dashboard/Customer';
// import DisabledMerchantAccount from '../../components/Manager/DisabledAccount/Merchant';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProfile } from '../../redux/profleSlice';
import { Navigate } from 'react-router-dom';

function Dashboard(props) {

  const dispatch = useDispatch()
  // const user = useSelector(state => state.profile.user)
  // const user = {role: 'MEMBER'}
  const user = useSelector(state => state.profile.user)
  const isLoading = useSelector(state => state.profile.isLoading)

  const { isMenuOpen = false, toggleDashboardMenu =() =>{} } = props;

  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])
  // if (isDisabledMerchantAccount(user))
  //   return <DisabledMerchantAccount user={user} />;

  return (
    <>
      {isLoading ? (
        <LoadingIndicator inline />
      ) : user?.role === ROLES.Admin ? (
        // <Admin
        //   user={user}
        //   isMenuOpen={isMenuOpen}
        //   links={dashboardLinks[ROLES.Admin]}
        //   toggleMenu={toggleDashboardMenu}
        // />
        <h1>Admin</h1>
      ) : user?.role === ROLES.Merchant && user.merchant ? (
        // <Merchant
        //   user={user}
        //   isMenuOpen={isMenuOpen}
        //   links={dashboardLinks[ROLES.Merchant]}
        //   toggleMenu={toggleDashboardMenu}
        // />
        <h1>Merchant</h1>
      ) : user ? (
        <Customer
          user={user}
          isMenuOpen={isMenuOpen}
          links={dashboardLinks[ROLES.Member]}
          toggleMenu={toggleDashboardMenu}
        />
      ):null}
    </>
  );
}

export default Dashboard;
