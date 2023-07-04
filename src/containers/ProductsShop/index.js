/**
 *
 * ProductsShop
 *
 */

import {useEffect, useState} from 'react';
import { useHttp } from '../../hooks';

import ProductList from '../../components/Store/ProductList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { setDiteils, setFilter } from '../../redux/productSlice';

function ProductsShop() {

  const {sendRequest, isLoading} = useHttp()
  const [products, setProducts] = useState([])
  const filters = useSelector(state => state.product.filters)

  const dispatch = useDispatch()  

  useEffect(() => {
    const {order, ...rest} = filters
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
  
  const displayProducts = products && products.length > 0;

  return (
    <div className='products-shop'>
      {isLoading && <LoadingIndicator />}
      {displayProducts && (
        <ProductList
          products={products}
          updateProducts={setProducts}
        />
      )}
      {!isLoading && !displayProducts && (
        <NotFound message='No products found.' />
      )}
    </div>
  );
}

export default ProductsShop;
