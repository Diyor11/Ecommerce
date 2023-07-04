import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import SelectOption from '../../Common/SelectOption';
import { sortOptions } from '../../../utils/store';
import { setFilter } from '../../../redux/productSlice';

function ShopNavigation() {

    const { diteils, filters} = useSelector(state => state.product)
    const {count, totalProducts, currentPage} = diteils
    const [order, setOrder] = useState(sortOptions[0])

    const dispatch = useDispatch()
    
    const handleSelect = (data) => {
        setOrder(data)
        dispatch(setFilter({order: data.sort}))
    }
    
    const left = filters.limit * (Number(currentPage) - 1) + 1;
    const right = (left + count) -1

  return (
    <Row className='align-items-center mx-0 mb-4 mt-4 mt-lg-0 py-3 py-lg-0 bg-white shop-toolbar'>
            <Col
              xs={{ size: 12, order: 1 }}
              sm={{ size: 12, order: 1 }}
              md={{ size: 5, order: 1 }}
              lg={{ size: 6, order: 1 }}
              className='text-center text-md-left mt-3 mt-md-0 mb-1 mb-md-0'
            >
              <span>Showing: </span>
              {totalProducts > 0
                ? `${left}-${right} products of ${totalProducts} products`
                : `${totalProducts} products`}
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 2, order: 2 }}
              lg={{ size: 2, order: 2 }}
              className='text-right pr-0 d-none d-md-block'
            >
              <span>Sort by</span>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 5, order: 2 }}
              lg={{ size: 4, order: 2 }}
            >
              <SelectOption
                name={'sorting'}
                value={{ value: order.value, label: order.label }}
                options={sortOptions}
                handleSelectChange={handleSelect}
              />
            </Col>
          </Row>
  )
}

export default ShopNavigation