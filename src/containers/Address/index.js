/*
 *
 * Address
 *
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import Add from './Add';

function Address() {
  return (
    <div className='address-dashboard'>
      <Add />
      <Outlet />
    </div>
  );
}

export default Address;
