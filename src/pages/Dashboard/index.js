/**
 *
 * Dashboard
 *
 */

import React from 'react';


import { ROLES } from '../../constants';
import dashboardLinks from './links.json';
import Customer from '../../components/Manager/Dashboard/Customer';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProfile } from '../../redux/profleSlice';

function Dashboard(props) {

  const dispatch = useDispatch()
  const user = useSelector(state => state.profile.user)
  const isLoading = useSelector(state => state.profile.isLoading)

  const { isMenuOpen = false, toggleDashboardMenu =() =>{} } = props;

  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  return (
    <>
      {isLoading ? (
        <LoadingIndicator inline />
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
