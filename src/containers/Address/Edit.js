/*
 *
 * Edit
 *
 */

import EditAddress from '../../components/Manager/EditAddress';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHttp } from '../../hooks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const addressSchema = Yup.object({
  address: Yup.string().required().min(3).max(50),
  city: Yup.string().required().min(3).max(50),
  state: Yup.string().required().min(3).max(50),
  country: Yup.string().required().min(3).max(50),
  zipCode: Yup.string().required().min(3).max(50),
});

function Edit() {
  const {id} = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {sendRequest} = useHttp()
  const [address, setAddress] = useState({})
  
  const { register, handleSubmit, formState: {errors }} = useForm({
    resolver: yupResolver(addressSchema),
    mode: 'onBlur',
  })

  useEffect(() => {
    sendRequest({url: `/address/${id}`}, (data) => {
        setAddress(data)
    })
  }, [dispatch, sendRequest, id])

  const addressChange = (newData) => {
    sendRequest({url: `/address/${id}`, method: 'put', data: newData}, (data) => {
      navigate('/dashboard/address')
    }, {})
  }

  const deleteAddress = () => {
    sendRequest({url: `/address/${id}`, method: 'delete'}, () => {
      navigate('/dashboard/address')
    }, {})
  }

  return (
    <SubPage
      title='Edit Address'
      actionTitle='Cancel'
      handleAction={() => navigate(-1)}
    >
      {address?._id ? (
        <EditAddress
          defaultValues={address}
          address={address}
          register={register}
          formErrors={errors}
          addressChange={handleSubmit(addressChange)}
          deleteAddress={deleteAddress}
          defaultChange={() => {}}
        />
      ) : (
        <NotFound message='No address found.' />
      )}
    </SubPage>
  );
}

export default Edit;
