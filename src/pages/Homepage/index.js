/**
 *
 * Homepage
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import banners from './banners.json';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/utils';

function Homepage(){
  return (
    <div className='homepage'>
      <Row className='flex-row'>
        <Col xs='12' lg='6' className='order-lg-2 mb-3 px-3 px-md-2'>
          <div className='home-carousel'>
            <CarouselSlider
              swipeable={true}
              showDots={true}
              infinite={true}
              autoPlay={false}
              slides={banners}
              responsive={responsiveOneItemCarousel}
            >
              {banners.map((item, index) => (
                <img key={index} src={item.imageUrl} alt='banner' />
              ))}
            </CarouselSlider>
          </div>
        </Col>
        <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2'>
          <div className='d-flex flex-column h-100 justify-content-between'>
            <img src='/images/banners/banner1.jpg' alt='banner' className='mb-3' />
            <img src='/images/banners/banner4.jpg' alt='banner' />
          </div>
        </Col>
        <Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
          <div className='d-flex flex-column h-100 justify-content-between'>
            <img src='/images/banners/banner1.jpg' alt='banner' className='mb-3' />
            <img src='/images/banners/banner5.jpg' alt='banner' />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Homepage;
