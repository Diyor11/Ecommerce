/**
 *
 * ProductList
 *
 */

import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import AddToWishList from '../AddToWishList';
import { useHttp } from '../../../hooks';
import { useSelector } from 'react-redux';
import {AiFillStar} from 'react-icons/ai'

const ProductList = ({ products, updateProducts }) => {
  const {sendRequest} = useHttp()
  const isAuth = useSelector(state => state.profile.authenticated)
  const navigate = useNavigate()

  const updateWishlist = (isLiked, id) => {
    if(isAuth) {
      sendRequest({
        url: '/wishlist', 
        method: 'post', 
        data: {product: id, isLiked}
      }, () => updateProducts(products => {
        return products.map(product => product._id === id ? {...product, isLiked} :product)
      }),
      {message: 'Success updated wishlist'}
      )
    } else {
      navigate('/login')
    }
  }


  return (
    <div className='product-list'>
      {products.map((product, index) => (
        <div key={index} className='mb-3 mb-md-0'>
          <div className='product-container'>
            <div className='item-box'>
              <div className='add-wishlist-box'>
                <AddToWishList
                  id={product._id}
                  liked={product?.isLiked ?? false}
                  updateWishlist={updateWishlist}
                />
              </div>

              <div className='item-link'>
                <Link
                  to={`/product/${product._id}`}
                  className='d-flex flex-column h-100'
                >
                  <div className='item-image-container'>
                    <div className='item-image-box'>
                      <img
                        alt='product'
                        className='item-image'
                        src={`${process.env.REACT_APP_API + product.imageUrl}`}
                      />
                    </div>
                  </div>
                  <div className='item-body'>
                    <div className='item-details p-3'>
                      <h1 className='item-name'>{product.name}</h1>
                      {product.brand && Object.keys(product.brand).length > 0 && (
                        <p className='by'>
                          By <span>{product.brand.name}</span>
                        </p>
                      )}
                      <p className='item-desc mb-0'>{product.description}</p>
                    </div>
                  </div>
                  <div className='d-flex flex-row justify-content-between align-items-center px-4 mb-2 item-footer'>
                    <p className='price mb-0'>${product.price}</p>
                    <p className='mb-0'>
                      <span className='fs-16 fw-normal mr-1'>
                        {parseFloat(product?.averageRating).toFixed(1)}
                      </span>
                      <AiFillStar style={{ color: '#ffb302' }} />
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
