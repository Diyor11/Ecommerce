/*
 *
 * Newsletter
 *
 */

import React, { useState } from 'react';
// import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';

function Newsletter() {

    const [email, setEmail] = useState('')

    const handleSubmit = event => {
      event.preventDefault();
    };


  return (
    <div className='newsletter-form'>
      <p>Sign Up for Our Newsletter</p>
      <form onSubmit={handleSubmit}>
        <div className='subscribe'>
          <Input
            type={'text'}
            name={'email'}
            placeholder={'Please Enter Your Email'}
            value={email}
            onChange={(name, value) => {
              setEmail(value);
            }}
            inlineElement={SubscribeButton}
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
