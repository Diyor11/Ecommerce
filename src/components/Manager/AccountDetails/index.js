/**
 *
 * AccountDetails
 *
 */

import React, { useRef } from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import {useForm} from 'react-hook-form'
import { inputIntegrate } from '../../../utils';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import Badge from '../../Common/Badge';

const accountScheme = Yup.object({
  firstName: Yup.string().min(3).max(30),
  lastName: Yup.string().min(3).max(30),
  phoneNumber: Yup.string().nullable().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,4}$/gmi, 'Phone number isn\'t valid').transform(val => (val || null)),
})

const AccountDetails = (props) => {

  const { user, updateProfile } = props;
  const defaultValues = useRef({firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber || ''})
  
  const {handleSubmit, formState: {errors}, register} = useForm({
    resolver: yupResolver(accountScheme),
    defaultValues: defaultValues.current,
    mode: 'blur'
  })


  const _handleSubmit = data => {
    data = {...data, phoneNumber: data.phoneNumber || ''}
    
    let shouldUpdate = false
    Object.keys(data).forEach((key) => {
      if(data[key].trim() !== defaultValues.current[key])
        shouldUpdate = true
      return;
    })  
    if(shouldUpdate)
      updateProfile(data)
  };

  return (
    <div className='account-details'>
      <div className='info'>
        <div className='desc'>
          <Badge variant='primary' >
            Member
          </Badge>
        </div>
      </div>
      <form onSubmit={handleSubmit(_handleSubmit)}>
        <Row>
          <Col xs='12' md='6'>
            <Input
              type={'text'}
              label={'First Name'}
              placeholder={'Please Enter Your First Name'}
              error={errors['firstName']}
              {...inputIntegrate({name: 'firstName'}, register)}
            />
          </Col>
          <Col xs='12' md='6'>
            <Input
              type={'text'}
              label={'Last Name'}
              error={errors['lastName']}
              placeholder={'Please Enter Your Last Name'}
              {...inputIntegrate({name: 'lastName'}, register)}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'text'}
              label={'Phone Number'}
              error={errors['phoneNumber']}
              placeholder={'Please Enter Your Phone Number'}
              {...inputIntegrate({name: 'phoneNumber'}, register)}
            />
          </Col>
        </Row>
        <hr />
        <div className='profile-actions'>
          <Button type='submit' variant='secondary' text='Save changes' />
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
