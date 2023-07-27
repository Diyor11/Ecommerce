/**
 *
 * Navigation
 *
 */

import React, { useEffect, useMemo, useState } from 'react';

import { NavLink } from 'react-router-dom';
import {useHttp} from '../../hooks'

import HeaderTop from './HeaderTop';

import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

import {FaBars} from 'react-icons/fa'
import {FiChevronDown} from 'react-icons/fi'
import SearchBar from './SearchBar';

import Button from '../../components/Common/Button';
import CartIcon from '../../components/Common/CartIcon';
import MiniBrand from '../../components/Store//MiniBrand';
import Menu from '../NavigationMenu';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchBrands } from '../../redux/productSlice';
import { toggleCart } from '../../redux/modalSlice';
import Brand from './Brand';
import CartModal from './CartModal ';
import ProfileDropdown from './ProfileDropdown';

const columnsBreakpoints = {
  brand: {xs: { size: 12, order: 1 }, sm: { size: 12, order: 1 }, md: { size: 3, order: 1 }, lg: { size: 3, order: 1 }},
  searchForm: {xs: { size: 12, order: 4 }, sm: { size: 12, order: 4 }, md: { size: 12, order: 4 }, lg: { size: 5, order: 2 }} ,
  links: {xs: { size: 12, order: 2 }, sm: { size: 12, order: 2 }, md: { size: 4, order: 1 }, lg: { size: 5, order: 3 }} ,
  actions: {xs: { size: 12, order: 2 }, sm: { size: 12, order: 2 }, md: { size: 9, order: 1 }, lg: { size: 4, order: 3 }},
}

export default function Navigation() {

  const {sendRequest} = useHttp()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBrandOpen, setIsBrandOpen] = useState(false)
  const [categories, setCategories] = useState([])


  const dispatch = useDispatch()

  const cartItems = useSelector(state => state.cart.products)
  const {authenticated} = useSelector(state => state.profile)
  const displayCategories = useMemo(() => categories && categories.length > 0, [categories])

  useEffect(() => {
    sendRequest({url: '/categories/list', method: 'get'}, setCategories)
  }, [sendRequest])

  const toggleMenu = (value) => setIsMenuOpen(prev => value || !prev)
  const _toggleCart = () => dispatch(toggleCart())
  
  const toggleBrand = () => {
    if(!isBrandOpen) 
      dispatch(fetchBrands())
    setIsBrandOpen(prev => !prev)
  }



  return (
    <header className='header fixed-mobile-header'>
      <HeaderTop />
      <Container>
        <Row className='align-items-center top-header'>
          <Col className='pr-0' {...columnsBreakpoints.brand}>
            <Brand displayCategories={displayCategories} toggleMenu={toggleMenu} />
          </Col>
          <Col className='pt-2 pt-lg-0' {...columnsBreakpoints.searchForm}>
            <SearchBar />
          </Col>
          <Col className='desktop-hidden' {...columnsBreakpoints.links}>
            <div className='header-links'>
              <div>
                {
                  displayCategories && (
                    <Button
                      borderless
                      variant='empty'
                      ariaLabel='open the menu'
                      icon={<FaBars />}
                      onClick={toggleMenu}
                    />
                  )
                }
              </div>
              <div>
                <CartIcon cartItems={cartItems} onClick={_toggleCart} />
              </div>
            </div>
          </Col>
          <Col className='px-0' {...columnsBreakpoints.actions}>
            <Navbar color='light' light expand='md' className='mt-1 mt-md-0'>
              <CartIcon
                className='d-none d-md-block'
                cartItems={cartItems}
                onClick={_toggleCart}
              />
              <Nav navbar>
                <Dropdown nav inNavbar toggle={toggleBrand} isOpen={isBrandOpen} direction='left'>
                  <DropdownToggle nav>
                    Brands
                    <FiChevronDown />
                  </DropdownToggle>
                  <DropdownMenu className='nav-brand-dropdown'>
                      <MiniBrand toggleBrand={toggleBrand} />
                  </DropdownMenu>
                </Dropdown>

                <NavItem>
                  <NavLink to='/shop' className='nav-link'>
                    Shop
                  </NavLink>
                </NavItem>
                <ProfileDropdown />
              </Nav>
            </Navbar>
          </Col>
        </Row>
      </Container>
      <CartModal authenticated={authenticated} />
      <Menu isMenuOpen={isMenuOpen} categories={categories} toggleMenu={toggleMenu} />
    </header>
  )
}