/*
 *
 * Signup
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';
import { NavLink, Navigate } from 'react-router-dom';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import Checkbox from '../../components/Common/Checkbox';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import SignupProvider from '../../components/Common/SignupProvider';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useHttp } from '../../hooks';
import { logOut, loginUser } from '../../redux/profleSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { inputIntegrate } from '../../utils';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'

const registerScheme = Yup.object({
  email: Yup.string().email().min(5).max(50).required(),
  firstName: Yup.string().required().min(3).max(50),
  lastName: Yup.string().required().min(3).max(50),
  password: Yup.string().required().min(5).max(50),
})

const inputs = [
  {name: 'email', breakpoints: {xs: 12, md: 12}, inputCredentials: {type: 'text', label: 'Email Address', placeholder: 'Please Enter Your Email'}}, 
  {name: 'firstName', breakpoints: {xs: 12, md: 12}, inputCredentials: {type: 'text', label: 'First Name', placeholder: 'Please Enter Your First Name'}}, 
  {name: 'lastName', breakpoints: {xs: 12, lg: 12}, inputCredentials: {type: 'text', label: 'Last Name', placeholder: 'Please Enter Your Last Name'}}, 
  {name: 'password', breakpoints: {xs: 12, lg: 12}, inputCredentials: {type: 'text', label: 'password', placeholder: 'Please Enter Your Password'}}, 
]

function Signup(props) {

    const {sendRequest, isLoading} = useHttp()
    const authenticated = useSelector(state => state.profile.authenticated)
    const profileLoading = useSelector(state => state.profile.isLoading)
    const dispatch = useDispatch()

    const {register, handleSubmit, formState: {errors}} = useForm({
      mode: 'onBlur',
      resolver: yupResolver(registerScheme)
    })

    const inputsData = inputs.map((data) => {
      const {name, inputCredentials, ...rest} = data
  
      return {
        ...rest, 
        inputCredentials: Object.assign(
          inputCredentials, 
          inputIntegrate({inputCredentials, name}, register),
        )
      }
    })

    const _handleSubmit = (data) => {
      sendRequest(
        {url: `/auth/signup`, method: 'post', data},
        (data) => dispatch(loginUser(data)), 
        {}
      ).catch(() => dispatch(logOut()))
    };

  return authenticated ? (<Navigate to='/dashboard' />) :  (
    <div className='signup-form'>
      <h2>Sign Up</h2>
      <hr />
      {(isLoading || profileLoading) && <LoadingIndicator />}
      <form onSubmit={handleSubmit(_handleSubmit)} noValidate>
        <Row>
          <Col
            xs={{ size: 12, order: 2 }}
            md={{ size: '6', order: 1 }}
            className='p-0'
          >
            {inputsData.map(({breakpoints, inputCredentials}) => (
              <Col {...breakpoints} key={inputCredentials.name}>
                <Input
                  error={errors[inputCredentials.name]}
                  {...inputCredentials}
                />
              </Col>
            ))}
          </Col>
          <Col
            xs={{ size: 12, order: 1 }}
            md={{ size: '6', order: 2 }}
            className='mb-2 mb-md-0'
          >
            <SignupProvider />
          </Col>
        </Row>
        <hr />
        <Checkbox
          id={'subscribe'}
          label={'Subscribe to newsletter'}
          checked={false}
          name='isSubscribed'
          onChange={() => {}}
        />
        <div className='d-flex flex-column flex-md-row align-items-md-center justify-content-between'>
          <Button
            type='submit'
            variant='primary'
            text='Sign Up'
          />
          <NavLink className='mt-3 mt-md-0 redirect-link' to={'/login'}>
            Back to login
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default Signup;
