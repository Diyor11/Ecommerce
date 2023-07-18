/**
 *
 * Navigation
 *
 */

import React, { useEffect, useState } from 'react';

import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {useHttp} from '../../hooks'
import Autosuggest from 'react-autosuggest';

import {renderSuggestion} from '../../utils'

import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import {FaBars} from 'react-icons/fa'
import {FiChevronDown} from 'react-icons/fi'

import Button from '../../components/Common/Button';
import CartIcon from '../../components/Common/CartIcon';
import MiniBrand from '../../components/Store//MiniBrand';
import Menu from '../NavigationMenu';
import Cart from '../Cart';
import { useSelector } from 'react-redux';
import { logOut } from '../../redux/profleSlice';
import { useDispatch } from 'react-redux';
import { fetchBrands } from '../../redux/productSlice';
import { toggleCart } from '../../redux/modalSlice';

export default function Navigation() {

  const {sendRequest} = useHttp()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBrandOpen, setIsBrandOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [suggistions, setSuggistions] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const isCartOpen = useSelector(state => state.modal.cartOpen)

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartItems = useSelector(state => state.cart.products)
  const {user, authenticated} = useSelector(state => state.profile)

  useEffect(() => {
    sendRequest({url: '/categories/list', method: 'get'}, setCategories)
  }, [sendRequest])


  const inputProps = {
    placeholder: 'Search Products',
    value: searchValue,
    onChange: (_, { newValue }) => {
      setSearchValue(newValue);
    }
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const _toggleCart = (value) => dispatch(toggleCart())
  
  const toggleBrand = () => {
    if(!isBrandOpen) 
      dispatch(fetchBrands())
    setIsBrandOpen(prev => !prev)
  }
  const signOut = () => dispatch(logOut())

  const onSuggistion = ({value}) => {
    const searchStr = value.trim().toLowerCase()
    if(searchStr.length > 2) {
      sendRequest(
        {url: `/product/list/search/${searchStr}`, method: 'get'},
        (data) => setSuggistions(data.products)
      )
    }
  }

  const clearSuggistions = () => setSuggistions([])

  useEffect(() => {
    return () => {
      clearSuggistions()
      window.scrollTo(0,0)
    }
  }, [location.pathname])

  return (
    <header className='header fixed-mobile-header'>
      <HeaderTop />
      <Container>
        <Row className='align-items-center top-header'>
          <Col
            xs={{ size: 12, order: 1 }}
            sm={{ size: 12, order: 1 }}
            md={{ size: 3, order: 1 }}
            lg={{ size: 3, order: 1 }}
            className='pr-0'
          >
            <div className='brand'>
              {categories && categories.length > 0 && (
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
                <h1 className='logo'>MERN Store</h1>
              </NavLink>
            </div>
          </Col>
          <Col
            xs={{ size: 12, order: 4 }}
            sm={{ size: 12, order: 4 }}
            md={{ size: 12, order: 4 }}
            lg={{ size: 5, order: 2 }}
            className='pt-2 pt-lg-0'
          >
            <Autosuggest
              suggestions={suggistions}
              onSuggestionsFetchRequested={onSuggistion}
              onSuggestionsClearRequested={clearSuggistions}
              getSuggestionValue={(data) => data.name}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              onSuggestionSelected={(_, item) => {                
                navigate(`/product/${item.suggestion._id}`);
                setSearchValue(item.suggestion.name)
              }}
            />
          </Col>
          <Col
            xs={{ size: 12, order: 2 }}
            sm={{ size: 12, order: 2 }}
            md={{ size: 4, order: 1 }}
            lg={{ size: 5, order: 3 }}
            className='desktop-hidden'
          >
            <div className='header-links'>
              {
                categories && categories.length > 0 && (
                  <Button
                    borderless
                    variant='empty'
                    ariaLabel='open the menu'
                    icon={<FaBars />}
                    onClick={toggleMenu}
                  />
                )
              }
              <CartIcon cartItems={cartItems} onClick={_toggleCart} />
            </div>
          </Col>
          <Col
            xs={{ size: 12, order: 2 }}
            sm={{ size: 12, order: 2 }}
            md={{ size: 9, order: 1 }}
            lg={{ size: 4, order: 3 }}
            className='px-0'
          >
            <Navbar color='light' light expand='md' className='mt-1 mt-md-0'>
              <CartIcon
                className='d-none d-md-block'
                cartItems={cartItems}
                onClick={_toggleCart}
              />
              <Nav navbar>
                <Dropdown
                  nav
                  inNavbar
                  toggle={toggleBrand}
                  isOpen={isBrandOpen}
                  direction='left'
                >
                  <DropdownToggle nav>
                    Brands
                    <FiChevronDown />
                  </DropdownToggle>
                  <DropdownMenu className='nav-brand-dropdown'>
                    <div className='mini-brand'>
                      <MiniBrand
                        toggleBrand={toggleBrand}
                      />
                    </div>
                  </DropdownMenu>
                </Dropdown>
                <NavItem>
                  <NavLink
                    to='/shop'
                    // activeClassName='active'
                    className='nav-link'
                  >
                    Shop
                  </NavLink>
                </NavItem>
                {(authenticated && user) ? (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>
                      {user.firstName}
                      <FiChevronDown />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => navigate('/dashboard')}
                      >
                        Dashboard
                      </DropdownItem>
                      <DropdownItem onClick={signOut}>Sign Out</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
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
                )}
              </Nav>
            </Navbar>
          </Col>
        </Row>
      </Container>

      {/* hidden cart drawer */}
      <div
        className={isCartOpen ? 'mini-cart-open' : 'hidden-mini-cart'}
        aria-hidden={isCartOpen ? false : true}
      >
        <div className='mini-cart'>
          <Cart isCartOpen={isCartOpen} authenticated={authenticated} closeCart={() => _toggleCart(false)} />
        </div>
        <div 
          className={
            isCartOpen ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'
          }
          onClick={_toggleCart}
        />
      </div>

      {/* hidden menu drawer */}
      <div
        className={isMenuOpen ? 'mini-menu-open' : 'hidden-mini-menu'}
        aria-hidden={isMenuOpen ? false : true}
      >
        <div className='mini-menu'>
          <Menu 
            isMenuOpen={isBrandOpen}
            categories={categories}
            toggleMenu={toggleMenu}
          />
        </div>
        <div
          className={
            isMenuOpen ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'
          }
          onClick={toggleMenu}
        />
      </div>
    </header>
  )
}


function HeaderTop() {
  return(
    <div className='header-info'>
        <Container>
          <Row>
            <Col md='4' className='text-center d-none d-md-block'>
              <i className='fa fa-truck' />
              <span>Free Shipping</span>
            </Col>
            <Col md='4' className='text-center d-none d-md-block'>
              <i className='fa fa-credit-card' />
              <span>Payment Methods</span>
            </Col>
            <Col md='4' className='text-center d-none d-md-block'>
              <i className='fa fa-phone' />
              <span>Call us 951-999-9999</span>
            </Col>
            <Col xs='12' className='text-center d-block d-md-none'>
              <i className='fa fa-phone' />
              <span> Need advice? Call us 951-999-9999</span>
            </Col>
          </Row>
        </Container>
      </div>
  )
}
