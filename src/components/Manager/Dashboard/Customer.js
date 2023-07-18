/*
 *
 * Customer
 *
 */

import React from 'react';

import { Outlet } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import AccountMenu from '../AccountMenu';

const Customer = props => {
  return (
    <div className='customer'>
      <Row>
        <Col xs='12' md='5' xl='3'>
          <AccountMenu {...props} />
        </Col>
        <Col xs='12' md='7' xl='9'>
          <div className='panel-body'>
            <Outlet />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Customer;
