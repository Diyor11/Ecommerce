/**
 *
 * SignupProvider
 *
 */

import React from 'react';

import { GoogleIcon, FacebookIcon } from '../Icon';

const SignupProvider = () => {
  return (
    <div className='signup-provider'>
      <div className='mb-2 google-btn'>
        <GoogleIcon />
        <span className='btn-text'>Login with Google</span>
      </div>

      <div className='facebook-btn'>
        <FacebookIcon />
        <span className='btn-text'>Login with Facebook</span>
      </div>
    </div>
  );
};

export default SignupProvider;
