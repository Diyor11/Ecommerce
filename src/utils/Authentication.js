/**
 *
 * Authentication
 *
 */

import React from 'react';

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Authentication(ComposedComponent) {
  const authenticated = useSelector((state) => state.profile.authenticated)

  return (props) => {
    if (!authenticated) {
      return <Navigate to='/login' />;
    } else {
      return <ComposedComponent {...props}/>;
    }
  }
}
