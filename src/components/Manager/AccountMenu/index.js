/**
 *
 * AccountMenu
 *
 */

import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import { Collapse, Navbar } from 'reactstrap';

import Button from '../../Common/Button';
import { useMediaQuery } from '../../../hooks';
import { BREAKPOINTS } from '../../../constants';

const AccountMenu = props => {
  const { user, links } = props;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    if(size < BREAKPOINTS.md) 
      setIsMenuOpen(prev => !prev)
  }
  const {size} = useMediaQuery()

  const getAllowedProvider = link => {
    if (!link?.provider) return true;

    const userProvider = user.provider ?? '';
    if (!userProvider) return true;

    return link.provider.includes(userProvider);
  };

  return (
    <div className='panel-sidebar'>
      <Button
        text='Dashboard Menu'
        className={`${isMenuOpen ? 'menu-panel' : 'menu-panel collapse'} show`}
        ariaExpanded={isMenuOpen ? 'true' : 'false'}
        ariaLabel={isMenuOpen ? 'dashboard menu expanded' : 'dashboard menu collapse'}
        onClick={toggleMenu}
      />
      <h3 className='panel-title'>Account</h3>
      <Navbar color='light' light expand='md'>
        <Collapse isOpen={isMenuOpen} navbar>
          <ul className='panel-links'>
            {links.map((link, index) => {
              const PREFIX = link.prefix ? link.prefix : '';
              const isProviderAllowed = getAllowedProvider(link);
              if (!isProviderAllowed) return null;
              return (
                <li key={index}>
                  <NavLink
                    to={PREFIX + link.to}
                    className={({isActive}) => isActive ? 'active-link':''}
                    onClick={toggleMenu}
                    end
                  >
                    {link.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AccountMenu;
