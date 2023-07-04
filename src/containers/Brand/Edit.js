/*
 *
 * Edit
 *
 */



import EditBrand from '../../components/Manager/EditBrand';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Edit() {

  useEffect(() => {
    const brandId = this.props.match.params.id;
    this.props.fetchBrand(brandId);
  }, [])
  

  // componentDidUpdate(prevProps) {
  //   if (this.props.match.params.id !== prevProps.match.params.id) {
  //     const brandId = this.props.match.params.id;
  //     this.props.fetchBrand(brandId);
  //   }
  // }

  const {
    user = {},
    brand = {},
    formErrors = {},
    brandEditChange = () => {},
    updateBrand = () => {},
    deleteBrand = () => {},
    activateBrand = {},
  } = this.props;

  const navigate = useNavigate()

  return (
    <SubPage
      title='Edit Brand'
      actionTitle='Cancel'
      handleAction={() => navigate(-1)}
    >
      {brand?._id ? (
        <EditBrand
          user={user}
          brand={brand}
          brandChange={brandEditChange}
          formErrors={formErrors}
          updateBrand={updateBrand}
          deleteBrand={deleteBrand}
          activateBrand={activateBrand}
        />
      ) : (
        <NotFound message='No brand found.' />
      )}
    </SubPage>
  );
}

// const mapStateToProps = state => {
//   return {
//     user: state.account.user,
//     brand: state.brand.brand,
//     formErrors: state.brand.editFormErrors
//   };
// };

export default Edit;
