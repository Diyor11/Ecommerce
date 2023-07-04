/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddBrand from '../../components/Manager/AddBrand';
import SubPage from '../../components/Manager/SubPage';
import { useNavigate } from 'react-router-dom';

function Add(props) {
  const {
    brandFormData = {},
    formErrors = {},
    brandChange = () => {},
    addBrand = () => {},
  } = props;

  const navigate = useNavigate()

  return (
    <SubPage
      title='Add Brand'
      actionTitle='Cancel'
      handleAction={() => navigate(-1)}
    >
      <AddBrand
        brandFormData={brandFormData}
        formErrors={formErrors}
        brandChange={brandChange}
        addBrand={addBrand}
      />
    </SubPage>
  );
}

// const mapStateToProps = state => {
//   return {
//     brandFormData: state.brand.brandFormData,
//     formErrors: state.brand.formErrors
//   };
// };

export default Add;
