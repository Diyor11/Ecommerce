/*
 *
 * Order
 *
 */

import React from 'react';

// import { useSelector } from 'react-redux';
// import { Switch, Route } from 'react-router-dom';

// import { ROLES } from '../../constants';
// import List from './List';
// import Customer from './Customer';
// import Page404 from '../../components/Common/Page404';

function Order() {
  // const user = useSelector(state => state.profile.user);

  return (
    <div className='product-dashboard'>
      {/* <Switch>
        <Route exact path='/dashboard/orders' component={List} />
        {user.role === ROLES.Admin && (
          <Route
            exact
            path='/dashboard/orders/customers'
            component={Customer}
          />
        )}
        <Route path='*' component={Page404} />
      </Switch> */}
    </div>
  );
};

export default Order
