/*
 *
 * Brand
 *
 */

import React from 'react';
import { ROLES } from '../../constants';
import List from './List';
import Add from './Add';
import Edit from './Edit';
import Page404 from '../../components/Common/Page404';

class Brand extends React.PureComponent {
  render() {
    const { user } = this.props;

    return (
      <div className='brand-dashboard'>
        {/* <Switch>
          <Route exact path='/dashboard/brand' component={List} />
          <Route exact path='/dashboard/brand/edit/:id' component={Edit} />
          {user.role === ROLES.Admin && (
            <Route exact path='/dashboard/brand/add' component={Add} />
          )}
          <Route path='*' component={Page404} />
        </Switch> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

export default Brand;
