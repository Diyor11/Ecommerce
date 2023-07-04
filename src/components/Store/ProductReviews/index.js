/**
 *
 * ProductReviews
 *
 */

import React from 'react';
import { Row, Col } from 'reactstrap';

import AddReview from './Add';
import ReviewList from './List';
import ReviewSummary from './Summary';
import { useHttp } from '../../../hooks';

const ProductReviews = props => {

  const {sendRequest} = useHttp()

  const addProductReview = (data) => {
    sendRequest(
      {url: '/review', method: 'post', data},
      () => {},
      {}
    )
  }

  return (
    <div className='mt-md-4 product-reviews'>
      <Row className='flex-row'>
        <Col xs='12' md='5' lg='5' className='mb-3 px-3 px-md-2'>
          {Object.keys(props.reviewsSummary).length > 0 && (
            <ReviewSummary reviewsSummary={props.reviewsSummary} />
          )}
        </Col>
        <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
          {props.reviews.length > 0 && <ReviewList reviews={props.reviews} />}
          <AddReview
            addReview={addProductReview}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProductReviews;
