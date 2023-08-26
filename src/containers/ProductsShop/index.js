/**
 *
 * ProductsShop
 *
 */

import {useEffect, useMemo, useState} from 'react';
import { useHttp } from '../../hooks';

import ProductList from '../../components/Store/ProductList';
import NotFound from '../../components/Common/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { setDiteils, setFilter } from '../../redux/productSlice';
import SkeletonList from '../../components/Common/SkeletonList';

function ProductsShop() {

  const {sendRequest, isLoading} = useHttp()
  const [products, setProducts] = useState([])
  const filters = useSelector(state => state.product.filters)

  const dispatch = useDispatch()  

  useEffect(() => {
    const {order, ...rest} = filters  
    setProducts([])  
    sendRequest(
      {url: '/product/list', method: 'get', params: {setSort: order, ...rest}},
      ({products, ...rest}) => {
        setProducts(products)
        dispatch(setDiteils({
          ...rest,
          count: products.length,
        }))
      }
    )
    
  }, [sendRequest, dispatch, filters])

  useEffect(() => {
    return () => dispatch(setFilter({page: 1}))    
  }, [dispatch])
  
  return (
    <div className='products-shop'>
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

export default ProductsShop;
