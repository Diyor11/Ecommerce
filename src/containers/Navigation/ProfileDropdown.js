import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { logOut } from '../../redux/profleSlice';

const ProfileDropdown = () => {
  const { user, authenticated } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch(logOut());
    navigate('/');
  };

  if (!authenticated || !user) {
    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav>
                Welcome!
                <FiChevronDown />
            </DropdownToggle>
            <DropdownMenu>
            <DropdownItem onClick={() => navigate('/login')}>
                Login
            </DropdownItem>
            <DropdownItem onClick={() => navigate('/register')}>
                Sign Up
            </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
  }

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        {user.name}
        <FiChevronDown />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={() => navigate('/dashboard')}>Dashboard</DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={signOut}>Sign Out</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default ProfileDropdown;