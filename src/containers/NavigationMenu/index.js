/**
 *
 * NavigationMenu
 *
 */

import React from 'react';

import { NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';

// import actions from '../../actions';

import Button from '../../components/Common/Button';
import { CloseIcon } from '../../components/Common/Icon';

function NavigationMenu({ isMenuOpen = false, categories = [], toggleMenu }) {

    const handleCategoryClick = () => {
      toggleMenu();
    };

  return (
    <div
      className={isMenuOpen ? 'mini-menu-open' : 'hidden-mini-menu'}
      aria-hidden={isMenuOpen ? false : true}
    >
      <div className='mini-menu'>
        <div className='navigation-menu'>
          <div className='menu-header'>
            {isMenuOpen && (
              <Button
                borderless
                variant='empty'
                ariaLabel='close the menu'
                icon={<CloseIcon />}
                onClick={toggleMenu}
              />
            )}
          </div>
          <div className='menu-body'>
            <Container>
              <h3 className='menu-title'>Shop By Category</h3>
              <nav role='navigation'>
                <ul className='menu-list'>
                  {categories.map((link, index) => (
                    <li key={index} className='menu-item'>
                      <NavLink
                        onClick={handleCategoryClick}
                        to={'/shop/category/' + link._id}
                        // activeClassName='active-link'
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </Container>
          </div>
        </div>
      </div>
      <div
        className={
          isMenuOpen ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'
        }
        onClick={() => toggleMenu(false)}
      />
    </div>
  )
}

export default NavigationMenu;
