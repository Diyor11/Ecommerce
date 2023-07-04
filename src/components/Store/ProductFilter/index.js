/**
 *
 * ProductFilter
 *
 */

import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import {useDispatch} from 'react-redux'
import {setFilter} from '../../../redux/productSlice'
import RangeSlider from '../../Common/RangeSlider';

const priceMarks = {
  1: { label: <p className='fw-normal text-black'>$1</p> },
  2600: { label: <p className='fw-normal text-black'>$2600</p> }
};

const rateMarks = {
  0: {
    label: (
      <span>
        <span className='mr-1'>5</span>
        <i
          className='fa fa-star fa-1x'
          style={{ display: 'contents' }}
          aria-hidden='true'
        ></i>
      </span>
    )
  },
  20: {
    label: (
      <span>
        <span className='mr-1'>4</span>
        <i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </span>
    )
  },
  40: {
    label: (
      <span>
        <span className='mr-1'>3</span>
        <i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </span>
    )
  },
  60: {
    label: (
      <span>
        <span className='mr-1'>2</span>
        <i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </span>
    )
  },
  80: {
    label: (
      <span>
        <span className='mr-1'>1</span>
        <i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </span>
    )
  },
  100: { label: <span>Any</span> }
};

const rating = v => {
  switch (v) {
    case 100:
      return 0;
    case 80:
      return 1;
    case 60:
      return 2;
    case 40:
      return 3;
    case 20:
      return 4;
    default:
      return 5;
  }
};

const ProductFilter = props => {
  
  const dispatch = useDispatch()

  const setPrice = ([min, max]) => dispatch(setFilter({min, max}))
  const setRating = (rate) => dispatch(setFilter({rating: rating(rate)}))
  
  return (
    <div className='product-filter'>
      <Card className='mb-4'>
        <CardHeader tag='h3'>Price</CardHeader>
        <CardBody>
          <div className='mx-2 mb-3'>
            <RangeSlider
              marks={priceMarks}
              defaultValue={[1, 2500]}
              max={2600}
              onChange={setPrice}
            />
          </div>
          
        </CardBody>
      </Card>
      <Card>
        <CardHeader tag='h3'>Rating</CardHeader>
        <CardBody>
          <div className='mx-2 mb-4'>
            <RangeSlider
              type='slider'
              marks={rateMarks}
              step={20}
              defaultValue={[100]}
              onChange={setRating}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductFilter;
