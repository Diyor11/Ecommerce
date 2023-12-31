/**
 *
 * BrandsShop
 *
 */

import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { useHttp } from '../../hooks';
import { setDiteils } from '../../redux/productSlice';

import ProductList from '../../components/Store/ProductList';
import NotFound from '../../components/Common/NotFound';
import SkeletonList from '../../components/Common/SkeletonList';

function BrandsShop() {

  const {sendRequest, isLoading} = useHttp()
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  const params = useParams()
  const filters = useSelector(state => state.product.filters)

  useEffect(() => {
    const {order, ...rest} = filters
    sendRequest(
      {url: `/product/list?brand=${params.slug}`, method: 'get', params: {setSort: order, ...rest}},
      ({products, ...rest}) => {
        setProducts(products)
        dispatch(setDiteils({
          ...rest,
          count: products.length,
        }))
      }
    )
  }, [sendRequest, params.slug, dispatch, filters])

  useEffect(() => {
    let prevSlug = ''
    if(params?.slug !== prevSlug) {
      setProducts([])
      prevSlug = params.slug
    }    
  }, [params.slug])

  return (
    <div className='brands-shop'>
      {isLoading ? (
        <SkeletonList />
      ) : products?.length > 0 ? (
        <ProductList
          products={products}
          updateProducts={setProducts}
        />
      ) : (
        <NotFound message='No products found.' />
      )}
    </div>
  );
}

export default BrandsShop;
