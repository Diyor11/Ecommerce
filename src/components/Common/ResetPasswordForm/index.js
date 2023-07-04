/**
 *
 * ResetPasswordForm
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../Input';
import Button from '../Button';
import {inputIntegrate} from '../../../utils'

const ResetPasswordForm = props => {
  const {
    handleSubmit, errors, register, resetPassword
  } = props;

  return (
    <div className='reset-password-form'>
      <form onSubmit={handleSubmit(resetPassword)} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'password'}
              error={errors['password']}
              label={'Password'}
              placeholder={'Old Password'}
              {...inputIntegrate({name: 'password'}, register)}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'password'}
              error={errors['newPassword']}
              label={'Confirm Password'}
              placeholder={'Confirm Password'}
              {...inputIntegrate({name: 'newPassword'}, register)}
            />
          </Col>
        </Row>
        <hr />
        <div className='reset-actions'>
          <Button type='submit' text='Reset Password' />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
