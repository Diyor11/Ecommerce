/*
 *
 * Add
 *
 */

import React from 'react';

import AddAddress from '../../components/Manager/AddAddress';
import SubPage from '../../components/Manager/SubPage';
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../../hooks';
import { useDispatch } from 'react-redux';
import { addAddress } from '../../redux/profleSlice';
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const addressSchema = Yup.object({
  address: Yup.string().required().min(3).max(50),
  city: Yup.string().required().min(3).max(50),
  state: Yup.string().required().min(3).max(50),
  country: Yup.string().required().min(3).max(50),
  zipCode: Yup.string().required().min(3).max(50),
});

function Add(props) {

  const navigate = useNavigate()
  const {sendRequest} = useHttp()
  const { register, handleSubmit, formState: {errors, }} = useForm({
    resolver: yupResolver(addressSchema),
    mode: 'onBlur',
  })
  
  
  const _addAddress = (data) => {
    
    sendRequest({url: '/address', method: 'POST', data}, (address) => {      
      navigate('/dashboard/address')
    }, {})
  }

  return (
    <SubPage
      title='Add Address'
      actionTitle='Cancel'
      handleAction={() => navigate(-1)}
    >
      <AddAddress
        formErrors={errors}
        register={register}
        addAddress={handleSubmit(_addAddress)}
      />
    </SubPage>
  );
}

export default Add;
