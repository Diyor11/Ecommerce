/**
 *
 * Shop
 *
 */

import React, {useEffect} from 'react';

import {Outlet} from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import ProductFilter from '../../components/Store/ProductFilter';
import Pagination from '../../components/Common/Pagination';
import ShopNavigation from '../../components/Manager/ShopNavigation';

function Shop() {

  useEffect(() => {
    document.body.classList.add('shop-page');

    return () => {
      document.body.classList.remove('shop-page');
    }
  }, [])

  return (
    <div className='shop'>
      <Row xs='12'>
        <Col
          xs={{ size: 12, order: 1 }}
          sm={{ size: 12, order: 1 }}
          md={{ size: 12, order: 1 }}
          lg={{ size: 3, order: 1 }}
        >
          <ProductFilter />
        </Col>
        <Col
          xs={{ size: 12, order: 2 }}
          sm={{ size: 12, order: 2 }}
          md={{ size: 12, order: 2 }}
          lg={{ size: 9, order: 2 }}
        >
          <ShopNavigation />
          <Outlet />
          <Pagination />
        </Col>
      </Row>
    </div>
  );
}

export default Shop;
