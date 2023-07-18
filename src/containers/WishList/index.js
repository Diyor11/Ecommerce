/*
 *
 * WishList
 *
 */

import React, { useEffect, useState } from 'react';

import SubPage from '../../components/Manager/SubPage';
import WishList from '../../components/Manager/WishList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { useHttp } from '../../hooks';

function Wishlist(props) {
  
  const [wishList, setWithList] = useState([])
  const {sendRequest, isLoading} = useHttp()

  useEffect(() => {
    sendRequest('/wishlist', (data) => {
      if(data.wishList)
        setWithList(data.wishList)
    })
  }, [sendRequest])

  const updateWishlist = (isLiked, id) => {
    sendRequest(
      {url: '/wishlist', method: 'post', data: {product: id, isLiked}},
      (data) => {
        setWithList(products => products.filter(item => item._id !==  data._id))
        setWithList((prev) => {
          return prev.filter(item => item._id !== id)
        })
      }
    )
  }

  const displayWishlist = wishList.length > 0;



  return (
    <div className='wishlist-dashboard'>
      <SubPage title={'Your Wishlist'} isMenuOpen={null}>
        {isLoading && <LoadingIndicator />}
        {displayWishlist && (
          <WishList wishlist={wishList} updateWishlist={updateWishlist} />
        )}
        {!isLoading && !displayWishlist && (
          <NotFound message='You have no items in your wishlist yet.' />
        )}
      </SubPage>
    </div>
    );
}

export default Wishlist;
