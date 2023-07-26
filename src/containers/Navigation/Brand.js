import React from 'react';
import { NavLink } from 'reactstrap';
import Button from '../../components/Common/Button'
import { FaBars } from 'react-icons/fa';

const Brand = ({ displayCategories, toggleMenu }) => {
  return (
    <div className='brand'>
      {displayCategories && (
        <Button
          borderless
          variant='empty'
          className='d-none d-md-block'
          ariaLabel='open the menu'
          icon={<FaBars />}
          onClick={toggleMenu}
        />
      )}
      <NavLink to='/'>
        <h1 className='logo'>BEE Store</h1>
      </NavLink>
    </div>
  );
};

export default Brand;