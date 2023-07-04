/**
 *
 * Edit Address
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Checkbox from '../../Common/Checkbox';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import { inputIntegrate } from '../../../utils';

const inputs = [
  {name: 'address', breakpoints: {xs: 12, md: 12}, inputCredentials: {type: 'text', label: 'Address', placeholder: 'Address: Street, House No / Apartment No'}}, 
  {name: 'city', breakpoints: {xs: 12, md: 12}, inputCredentials: {type: 'text', label: 'City', placeholder: 'City'}}, 
  {name: 'state', breakpoints: {xs: 12, lg: 6}, inputCredentials: {type: 'text', label: 'State', placeholder: 'State'}}, 
  {name: 'country', breakpoints: {xs: 12, lg: 6}, inputCredentials: {type: 'text', label: 'Country', placeholder: 'Country'}}, 
  {name: 'zipCode', breakpoints: {xs: 12, md: 12}, inputCredentials: {type: 'text', label: 'Zipcode', placeholder: 'Please Enter Your Zipcode'}}, 
]

const EditAddress = props => {
  const { address, formErrors, register, deleteAddress, addressChange, defaultValues } = props;

  const inputsData = inputs.map((data) => {
    const {name, inputCredentials, ...rest} = data

    return {
      ...rest, 
      inputCredentials: Object.assign(
        inputCredentials, 
        inputIntegrate({inputCredentials, name}, register, {required: true}),
      )
    }
  })

  return (
    <div className='edit-address'>
      <form onSubmit={addressChange} noValidate>
        <Row>
          {inputsData.map(({inputCredentials, breakpoints}) => (
            <Col key={inputCredentials.name} {...breakpoints}>
              <Input
                error={formErrors[inputCredentials.name]}
                defaultValue={defaultValues[inputCredentials.name]}
                {...inputCredentials}
              />
            </Col>
          ))}
          <Col xs='12' md='12'>
            <Checkbox
              id={'default'}
              label={'As the Default'}
              name={'isDefault'}
              checked={address.isDefault}
              onChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='d-flex flex-column flex-md-row'>
          <Button
            type='submit'
            text='Save'
            className='mb-3 mb-md-0 mr-0 mr-md-3'
          />
          <Button
            variant='danger'
            text='Delete'
            onClick={() => deleteAddress(address._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditAddress;
