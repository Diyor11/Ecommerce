/*
 *
 * Login
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import SignupProvider from '../../components/Common/SignupProvider';

import * as Yup from 'yup'
import { useSelector } from 'react-redux';
import { useHttp } from '../../hooks';
import { useDispatch } from 'react-redux';
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

import { inputIntegrate } from '../../utils';
import { fetchProfile, loginUser, logOut } from '../../redux/profleSlice';

const addressSchema = Yup.object({
  email: Yup.string().email().required().min(3).max(50),
  password: Yup.string().required().min(5).max(20),
});


function Login() {

  const {isLoading, sendRequest} = useHttp()
  const authenticated = useSelector(state => state.profile.authenticated)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: {errors }} = useForm({
    resolver: yupResolver(addressSchema),
    mode: 'onBlur',
  })


  
  if (authenticated) return <Navigate to='/dashboard' />;

  const registerLink = () => navigate('/register');

  const _handleSubmit = data => {

    sendRequest(
      {url: `/auth/login`, method: 'post', data },
      (data) => {
        dispatch(loginUser(data))
        dispatch(fetchProfile())
      },
      {}
    ).catch(() => dispatch(logOut()))

  };

  return (
    <div className='login-form'>
      {isLoading && <LoadingIndicator />}
      <h2>Login</h2>
      <hr />
      <div class='container'>
        <form onSubmit={handleSubmit(_handleSubmit)} noValidate>
          <Row>
            <Col
              xs={{ size: 12, order: 2 }}
              md={{ size: '6', order: 1 }}
              className='p-0'
            >
              <Col xs='12' md='12'>
                <Input
                  type={'text'}
                  error={errors['email']}
                  label={'Email Address'}
                  placeholder={'Please Enter Your Email'}
                  {...inputIntegrate({name: 'email'}, register)}
                />
              </Col>
              <Col xs='12' md='12'>
                <Input
                  type={'password'}
                  error={errors['password']}
                  label={'Password'}
                  placeholder={'Please Enter Your Password'}
                  {...inputIntegrate({name: 'password'}, register)}
                />
              </Col>
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
          <div className='d-flex flex-column flex-md-row align-items-md-center justify-content-between'>
            <div className='d-flex justify-content-between align-items-center mb-3 mb-md-0'>
              <Button
                type='submit'
                variant='primary'
                text='Login'
                disabled={isLoading}
              />
              <Button
                text='Create an account'
                variant='link'
                className='ml-md-3'
                onClick={registerLink}
              />
            </div>
            <NavLink
              className='redirect-link forgot-password-link'
              to={'/login'}
            >
              Forgot Password?
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
