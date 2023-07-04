/**
 *
 * BrandsPage
 *
 */

import React from 'react';

import BrandList from '../../components/Store/BrandList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../redux/productSlice';

function BrandsPage() {

  const brands = useSelector(state => state.product.brands)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch])
  
  return (
    <div className='brands-page'>
      <BrandList brands={brands} />
    </div>
  );
}

export default BrandsPage;
