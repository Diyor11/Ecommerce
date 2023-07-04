/*
 *
 * List
 *
 */



import { ROLES } from '../../constants';

import BrandList from '../../components/Manager/BrandList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function List() {

  useEffect(() => {
    this.props.fetchBrands();
  }, [])

  const { brands, isLoading, user } = this.props;

  const navigate = useNavigate()

  return (
    <>
      <SubPage
        title={user.role === ROLES.Admin ? 'Brands' : 'Brand'}
        actionTitle={user.role === ROLES.Admin && 'Add'}
        handleAction={() => navigate('/dashboard/brand/add')}
      >
        {isLoading ? (
          <LoadingIndicator inline />
        ) : brands.length > 0 ? (
          <BrandList brands={brands} user={user} />
        ) : (
          <NotFound message='No brands found.' />
        )}
      </SubPage>
    </>
  );
}

// const mapStateToProps = state => {
//   return {
//     brands: state.brand.brands,
//     isLoading: state.brand.isLoading,
//     user: state.account.user
//   };
// };

export default List;
