/**
 *
 * SocialShare
 *
 */

import React from 'react';
import {FaFacebookF, FaTwitter, FaInstagram} from 'react-icons/fa'
import {AiOutlineMail} from 'react-icons/ai'

import {
  EmailShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareButton
} from 'react-share';

const SocialShare = props => {
  const { product } = props;

  const shareMsg = `I ♥ ${
    product.name
  } product on BEE Store!  Here's the link, ${
    window.location.protocol !== 'https' ? 'http' : 'https'
  }://${window.location.host}/product/${product.slug}`;

  return (
    <ul className='d-flex flex-row mx-0 mb-0 justify-content-center justify-content-md-start share-box'>
      <li>
        <FacebookShareButton url={`${shareMsg}`} className='share-btn facebook'>
          <FaFacebookF />
        </FacebookShareButton>
      </li>
      <li>
        <TwitterShareButton url={`${shareMsg}`} className='share-btn twitter'>
          <FaTwitter />
        </TwitterShareButton>
      </li>
      <li>
        <EmailShareButton url={`${shareMsg}`} className='share-btn envelope'>
          <AiOutlineMail />
        </EmailShareButton>
      </li>
      <li>
        <WhatsappShareButton url={`${shareMsg}`} className='share-btn whatsapp'>
          <FaInstagram />
        </WhatsappShareButton>
      </li>
    </ul>
  );
};

export default SocialShare;
