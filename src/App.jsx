// import Application from './containers/Application'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import Footer from './components/Common/Footer'
import Navigation from './containers/Navigation'
import { ToastContainer } from 'react-toastify'
import { Container } from 'reactstrap'
import Homepage from './pages/Homepage'
import Shop from './pages/Shop'
import ProductsShop from './containers/ProductsShop'
import BrandsShop from './containers/BrandsShop'
import CategoryShop from './containers/CategoryShop'
import Page404 from './components/Common/Page404'
import ProductPage from './pages/ProductPage'
import Login from './pages/Login'
import Redirect from './containers/Redirect'
import Signup from './pages/Signup'
import BrandsPage from './pages/BrandsPage'
import Dashboard from './pages/Dashboard'
import Account from './containers/Account'
import AccountSecurity from './containers/AccountSecurity'

import {AddressAdd, AddressEdit, AddressList} from './containers/Address'
import Orders from './containers/Order'
import Wishlist from './containers/WishList'
import OrderSuccess from './pages/OrderSuccess'
import OrderPage from './pages/OrderPage'
import { useEffect } from 'react'
import { setToken } from './utils'
import { fetchProfile } from './redux/profleSlice'

import './styles/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const dispatch = useDispatch()

    useEffect(() => {
      const token = localStorage.getItem('token')
      if(token) {
        setToken(token)
        dispatch(fetchProfile())
      }
    }, [dispatch])

  return (
    <>
      <BrowserRouter>
        <div className='application'>
          <ToastContainer theme="colored" autoClose={1000}/>
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
                  <Route path='/login' element={<Redirect children={<Login />} />} />
                  <Route path='/register' element={<Redirect children={<Signup />} />} />
                  <Route path='/brands' element={<BrandsPage />} />
                  <Route
                    path='/dashboard'
                    element={<Redirect isPrivate children={<Dashboard />} />}
                  >
                    <Route path="/dashboard" element={<Account />} />
                    <Route path="/dashboard/security" element={<AccountSecurity />} />
                    <Route path="/dashboard/address" element={<AddressList />} />
                    <Route path="/dashboard/address/add" element={<AddressAdd />} />
                    <Route path="/dashboard/address/edit/:id" element={<AddressEdit />} />
                    <Route path="/dashboard/orders" element={<Orders />} />
                    <Route path="/dashboard/wishlist" element={<Wishlist />} />
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
      </BrowserRouter>
    </>
  )
}

export default App
