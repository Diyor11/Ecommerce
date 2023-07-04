/**
 *
 * ProductPage
 *
 */

import {useEffect, useState} from 'react';
import { Row, Col } from 'reactstrap';
import { NavLink, useParams } from 'react-router-dom';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import { BagIcon } from '../../components/Common/Icon';
import ProductReviews from '../../components/Store/ProductReviews/';
import SocialShare from '../../components/Store/SocialShare';
import { useHttp } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
import { useMemo } from 'react';
import {getReviewsSummary} from '../../utils'
import { toggleCart } from '../../redux/modalSlice';

function ProductPage(props) {  

  useEffect(() => {
    document.body.classList.add('product-page');
    return () => document.body.classList.remove('product-page');
  }, [])

  const {
    shopFormErrors = {},
    // productShopChange = {quantity: 1},
    reviewFormData = {},
    reviewChange = () => {},
    reviewFormErrors = {}
  } = props;

  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [quantity, setQuantity] = useState(1)
  const {id} = useParams()
  const reviewsSummary = getReviewsSummary(reviews)

  const cartItems = useSelector(state => state.cart.products)  

  const itemInCart = useMemo(() => {
    if(!cartItems.length || !product)
      return false

    let index = cartItems.findIndex(item => item._id === product._id)
    return index !== -1
  }, [cartItems, product])

  const {isLoading, sendRequest} = useHttp()

  const dispatch = useDispatch()

  useEffect(() => {
    sendRequest({
      url: `/product/item/${id}`
    }, setProduct)

    sendRequest({
      url: `/review/${id}`
    }, setReviews)
  }, [id, sendRequest])

  const handleAddToCart = () => {
    dispatch(addToCart({...product, quantity}))
    dispatch(toggleCart())
  }

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product._id))
  }

  // const handleInputChange = (name, value) => setProductData(prev => ({...prev, [name]: value}))

  return (
    <div className='product-shop'>
      {isLoading ? (
        <LoadingIndicator />
      ) : product ? (
        <>
          <Row className='flex-row'>
            <Col xs='12' md='5' lg='5' className='mb-3 px-3 px-md-2'>
              <div className='position-relative'>
                <img
                  className='item-image'
                  alt='product'
                  src={`${
                    product.imageUrl
                      ? product.imageUrl
                      : '/images/placeholder-image.png'
                  }`}
                />
                {product.inventory <= 0 && !shopFormErrors['quantity'] ? (
                  <p className='stock out-of-stock'>Out of stock</p>
                ) : (
                  <p className='stock in-stock'>In stock</p>
                )}
              </div>
            </Col>
            <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
              <div className='product-container'>
                <div className='item-box'>
                  <div className='item-details'>
                    <h1 className='item-name one-line-ellipsis'>
                      {product.name}
                    </h1>
                    <p className='sku'>{product.sku}</p>
                    <hr />
                    {product.brand && (
                      <p className='by'>
                        see more from{' '}
                        <NavLink
                          to={`/shop/brand/${product.brand.slug}`}
                          className='default-link'
                        >
                          {product.brand.name}
                        </NavLink>
                      </p>
                    )}
                    <p className='item-desc'>{product.description}</p>
                    <p className='price'>${product.price}</p>
                  </div>
                  <div className='item-customize'>
                    <Input
                      type={'number'}
                      error={shopFormErrors['quantity']}
                      label={'Quantity'}
                      name={'quantity'}
                      decimals={false}
                      min={1}
                      max={10}
                      placeholder={'Product Quantity'}
                      disabled={shopFormErrors['quantity']}
                      value={quantity}
                      onChange={(_, val) => setQuantity(val)}
                    />
                  </div>
                  <div className='my-4 item-share'>
                    <SocialShare product={product} />
                  </div>
                  <div className='item-actions'>
                    {itemInCart ? (
                      <Button
                        variant='primary'
                        disabled={shopFormErrors['quantity']}
                        text='Remove From Bag'
                        className='bag-btn'
                        icon={<BagIcon />}
                        onClick={handleRemoveFromCart}
                      />
                    ) : (
                      <Button
                        variant='primary'
                        disabled={shopFormErrors['quantity']}
                        text='Add To Bag'
                        className='bag-btn'
                        icon={<BagIcon />}
                        onClick={handleAddToCart}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <ProductReviews
            reviews={reviews}
            reviewsSummary={reviewsSummary}
          />
        </>
      ) : (
        <NotFound message='No product found.' />
      )}
    </div>
  );
}

// const mapStateToProps = state => {
//   const itemInCart = state.cart.cartItems.find(
//     item => item._id === state.product.storeProduct._id
//   )
//     ? true
//     : false;

//   return {
//     product: state.product.storeProduct,
//     productData: state.product.productData,
//     shopFormErrors: state.product.shopFormErrors,
//     isLoading: state.product.isLoading,
//     reviews: state.review.productReviews,
//     reviewsSummary: state.review.reviewsSummary,
//     reviewFormData: state.review.reviewFormData,
//     reviewFormErrors: state.review.reviewFormErrors,
//     itemInCart
//   };
// };

export default ProductPage;
