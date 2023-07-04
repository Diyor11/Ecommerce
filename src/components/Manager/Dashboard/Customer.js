/*
 *
 * Customer
 *
 */

import React from 'react';

import { Outlet } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import AccountMenu from '../AccountMenu';

// import { isProviderAllowed } from '../../../utils/app';
// import AccountSecurity from '../../../containers/AccountSecurity';
// import Address from '../../../containers/Address';
// import Order from '../../../containers/Order';
// import Wishlist from '../../../containers/WishList';

const Customer = props => {
  // const { user } = props;

  return (
    <div className='customer'>
      <Row>
        <Col xs='12' md='5' xl='3'>
          <AccountMenu {...props} />
        </Col>
        <Col xs='12' md='7' xl='9'>
          <div className='panel-body'>
            <Outlet />
              {/* <Route exact path='/dashboard' component={Account} /> */}
              {/* {!isProviderAllowed(user.provider) && (
                <Route path='/dashboard/security' component={AccountSecurity} />
              )}
              <Route path='/dashboard/address' component={Address} />
              <Route path='/dashboard/orders' component={Order} />
              <Route path='/dashboard/wishlist' component={Wishlist} /> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Customer;
