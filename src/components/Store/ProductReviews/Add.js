/**
 *
 * Add
 *
 */

import React, { useMemo, useState } from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import { useForm } from 'react-hook-form';
import { inputIntegrate } from '../../../utils';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

const reviewScheme = Yup.object({
  title: Yup.string().min(3).required().max(50),
  review: Yup.string().min(3).required().max(200)
})

const Add = props => {
  const { addReview } = props;

  const {handleSubmit, register, reset, formState: {errors}} = useForm({
    resolver: yupResolver(reviewScheme),
    mode: 'onBlur'
  })
  const [stars, setStars] = useState({value: 0, error: null})  

  const _handleSubmit = (data) => {
    setStars({value: 0, error: null})
    if(stars.value === 0) 
      setStars(prev=> ({...prev, error: ['Please rate product']}))
    else {
      addReview({...data, rating: stars.value})
      reset()
    }
  }  

  return (
    <div className='bg-white p-4 box-shadow-primary add-review'>
      <form onSubmit={handleSubmit(_handleSubmit)} noValidate>
        <h3 className='mb-3'>Add Review</h3>
        <Row>
          <Col xs='12' md='12'>
            <Input
              type={'text'}
              error={errors['title']}
              label={'Title'}
              placeholder={'Enter Review title'}
              {...inputIntegrate({name: 'title'}, register)}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={errors['review']}
              label={'Comment'}
              placeholder={'Write Review'}
              {...inputIntegrate({name: 'review'}, register)}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'stars'}
              error={stars.error ? {message: stars.error}:null}
              label={'Rating'}
              name={'rating'}
              value={stars.value}
              onChange={(_, value) => {
                setStars(prev => ({...prev, value}))
              }}
            />
          </Col>
        </Row>
        <div className='mt-4'>
          <Button type='submit' text='Publish Review' />
        </div>
      </form>
    </div>
  );
};

export default Add;
