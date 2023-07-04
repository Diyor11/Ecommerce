import React from "react";
import {Routes, Route} from 'react-router-dom'
import Navigation from "../Navigation";
import Footer from '../../components/Common/Footer'
import { ToastContainer } from 'react-toastify'

import Homepage from "../Homepage";
import Shop from "../Shop";
import { Container } from "reactstrap";
import ProductsShop from "../ProductsShop";
import Page404 from "../../components/Common/Page404";
import BrandsShop from "../BrandsShop";
import CategoryShop from "../CategoryShop";
import ProductPage from '../ProductPage'
import SignUp from '../Signup'
import Login from "../Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProfile } from "../../redux/profleSlice";
import { setToken } from "../../utils";
import BrandsPage from "../BrandsPage";
import Dashboard from "../Dashboard";
import Account from '../../containers/Account';
import AccountSecurity from '../../containers/AccountSecurity';

import Address from '../../containers/Address/List'
import AddressAdd from '../../containers/Address/Add'
import AddressEdit from '../../containers/Address/Edit'

import Orders from '../../containers/Order/List'
import OrderPage from '../../containers/OrderPage'
import WishList from '../../containers/WishList'
import OrderSuccess from '../../containers/OrderSuccess'

import Redirect from "../Redirect";

import '../../styles/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';


export default function Application() {

    const dispatch = useDispatch()

    useEffect(() => {
      const token = localStorage.getItem('token')
      if(token) {
        setToken(token)
        dispatch(fetchProfile())
      }
    }, [dispatch])

    return(
        <div className='application'>
        <ToastContainer theme="colored" autoClose={1500}/>
        <Navigation />
        <main className='main'>
          <Container>
            <div className='wrapper'>
              <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/shop' element={<Shop />}>
                  <Route path='/shop' element={<ProductsShop />} />
                  <Route path='/shop/brand/:slug' element={<BrandsShop />} />
                  <Route path='/shop/category/:slug' element={<CategoryShop />} />
                  <Route path='*' element={<Page404 />} /> 
                </Route>
                <Route path='/product/:id' element={<ProductPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Redirect children={<SignUp />} />} />
                <Route path='/brands' element={<BrandsPage />} />
                <Route
                  path='/dashboard'
                  element={<Redirect isPrivate children={<Dashboard />} />}
                >
                  <Route path="/dashboard" element={<Account />} />
                  <Route path="/dashboard/security" element={<AccountSecurity />} />
                  <Route path="/dashboard/address" element={<Address />} />
                  <Route path="/dashboard/address/add" element={<AddressAdd />} />
                  <Route path="/dashboard/address/edit/:id" element={<AddressEdit />} />
                  <Route path="/dashboard/orders" element={<Orders />} />
                  <Route path="/dashboard/wishlist" element={<WishList />} />
                  <Route path='/dashboard/*' element={<Page404 />} />
                </Route>
                <Route path='/order/success/:id' element={<OrderSuccess />} />
                <Route path='/order/:id' element={<OrderPage />} />
                <Route path='*' element={<Page404 />} />             
              </Routes>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    )
}