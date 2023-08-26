/**
 *
 * CategoryShop
 *
 */

import React, {useEffect, useState} from 'react';
import ProductList from '../../components/Store/ProductList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { useHttp } from '../../hooks';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDiteils } from '../../redux/productSlice';
import SkeletonList from '../../components/Common/SkeletonList';

function CategoryShop(){

  const {sendRequest, isLoading} = useHttp()
  const [products, setProducts] = useState([])
  const filters = useSelector(state => state.product.filters)
  const params = useParams()
  const dispatch = useDispatch()
  
  useEffect(() => {
    const {order, ...rest} = filters
    sendRequest(
      {url: `/product/list?category=${params.slug}`, method: 'get', params: {setSort: order, ...rest}},
      ({products, ...rest}) => {
        setProducts(products)
        dispatch(setDiteils({
          ...rest,
          count: products.length,
        }))
      }
    )
  }, [sendRequest, params.slug, filters, dispatch])



  useEffect(() => {
    let prevSlug = ''
    if(params?.slug !== prevSlug) {
      setProducts([])
      prevSlug = params.slug
    }    
  }, [params.slug])

  return (
    <div className='category-shop'>
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

export default CategoryShop;
