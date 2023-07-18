/**
 *
 * WishList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

import { formatDate } from '../../../utils/date';
import Button from '../../Common/Button';
import { XIcon } from '../../Common/Icon';

const WishList = props => {
  const { wishlist, updateWishlist } = props;

  const getProductImage = item => {
    if (item) {
      const product = item;
      return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <img
            className='item-image'
            alt='product'
            src={`${process.env.REACT_APP_API + product.imageUrl}`}

          />
        </div>
      );
    }
  };

  return (
    <div className='w-list'>
      {wishlist.map((item, index) => (
        <div
          key={index}
          className='d-flex flex-row align-items-center mx-0 mb-3 wishlist-box'
        >
          <Link
            to={`/product/${item._id}`}
            key={index}
            className='d-flex flex-1 align-items-center text-truncate'
          >
            {getProductImage(item)}
            <div className='d-flex flex-column justify-content-center px-3 text-truncate'>
              <h4 className='text-truncate'>{item.name}</h4>
              <p className='mb-2 price'>${item.price}</p>
              <label className='text-truncate'>{`Wishlist Added on ${formatDate(
                item.created
              )}`}</label>
            </div>
          </Link>
          <div className='remove-wishlist-box'>
            <Button
              variant='danger'
              icon={<XIcon className='text-white' width={15} />}
              round={20}
              onClick={e => {
                updateWishlist(false, item._id);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishList;
