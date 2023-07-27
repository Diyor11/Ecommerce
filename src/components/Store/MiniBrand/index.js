/**
 *
 * MiniBrand
 *
 */

import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

const MiniBrand = ({toggleBrand}) => {
  const brands = useSelector(state => state.product.brands)

  return (
    <div className='mini-brand'>
    <div className='mini-brand-list'>
      <div className='d-flex align-items-center justify-content-between min-brand-title'>
        <h4 className='mb-0 text-uppercase'>Shop By Brand</h4>
        <Link
          to={'/brands'}
          className='redirect-link'
          role='menuitem'
          onClick={toggleBrand}
        >
          See all
        </Link>
      </div>
      <div className='mini-brand-block'>
        {brands && brands.map((brand, index) => (
          <div key={index} className='brand-item'>
            <Link
              to={`/shop/brand/${brand._id}`}
              className='brand-link'
              role='menuitem'
              onClick={toggleBrand}
            >
              {brand.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default MiniBrand;
