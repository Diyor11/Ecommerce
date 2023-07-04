/*
 *
 * AccountSecurity
 *
 */

import React from 'react';

import SubPage from '../../components/Manager/SubPage';
import ResetPasswordForm from '../../components/Common/ResetPasswordForm';
import {useHttp} from '../../hooks'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import {logOut} from '../../redux/profleSlice'

const passwordScheme = Yup.object({
  password: Yup.string().required().min(5).max(30),
  newPassword: Yup.string().required().min(5).max(30),
})


function AccountSecurity() {

  const dispatch = useDispatch()
  const {handleSubmit, register, formState: {errors}} = useForm({
    resolver: yupResolver(passwordScheme),
    mode: 'onBlur'
  })
  const {sendRequest} = useHttp()

  const resetAccountPassword = (data) => {
    sendRequest(
      {url: '/auth/reset', method: 'put', data},
      () => {
        dispatch(logOut())
      },
      {}
    )
  }

  return (
    <div className='account-security'>
      <SubPage title={'Account Security'} isMenuOpen={null}>
        <div className='reset-form'>
          <h4>Reset Password</h4>
          <ResetPasswordForm
            resetPassword={resetAccountPassword}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
          />
        </div>
      </SubPage>
    </div>
  );
}

export default AccountSecurity;
