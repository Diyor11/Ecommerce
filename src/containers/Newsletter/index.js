/*
 *
 * Newsletter
 *
 */

import React from 'react';
// import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';

function Newsletter( email = 'ggg.@gamil.com', newsletterChange = () => {}, subscribeToNewsletter, formErrors = {} ) {

    const handleSubmit = event => {
      event.preventDefault();
      // subscribeToNewsletter();
    };

    const ref= React.useRef()

  return (
    <div className='newsletter-form'>
      <p>Sign Up for Our Newsletter</p>
      <form onSubmit={handleSubmit}>
        <div className='subscribe'>
          <Input
            type={'text'}
            // ref={ref}  
            // error={formErrors['email']}
            // name={'email'}
            // placeholder={'Please Enter Your Email'}
            // value={email}
            // onChange={(name, value) => {
            //   newsletterChange(name, value);
            // }}
            // inlineElement={SubscribeButton}
          />
        </div>
      </form>
    </div>
  );
}

const SubscribeButton = (
  <Button type='submit' variant='primary' text='Subscribe' />
);

export default Newsletter;
