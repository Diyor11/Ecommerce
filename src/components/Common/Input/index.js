/**
 *
 * Input
 *
 */

import React, {forwardRef} from 'react';
import ReactStars from 'react-rating-stars-component';

const Input = forwardRef((props, ref) => {
  const {
    autoComplete,
    type,
    value,
    error,
    defaultValue,
    decimals,
    min,
    max,
    disabled,
    placeholder,
    rows,
    label,
    name,
    onChange,
    inlineElement
  } = props;

  const _onChange = e => {
    if (e.target.name === 'image') {
      onChange(e.target.name, e.target.files[0]);
    } else {
      onChange(e.target.name, e.target.value);      
    }
  };

  if (type === 'textarea') {
    const styles = `input-box${error ? ' invalid' : ''}`;

    return (
      <div className={styles}>
        {label && <label>{label}</label>}
        <textarea
          type={'textarea'}
          onChange={e => {
            _onChange(e);
          }}
          rows={rows}
          name={name}
          value={value}
          placeholder={placeholder}
          className={'textarea-text'}
          ref={ref}
        />
        <span className='invalid-message'>{error && error.message}</span>
      </div>
    );
  } else if (type === 'number') {
    const styles = `input-box${error ? ' invalid' : ''}`;

    const handleOnInput = e => {
      if (!decimals) {
        e.target.value = e.target.value.replace(/[^0-9]*/g, '');
      }
    };
    return (
      <div className={styles}>
        {label && <label>{label}</label>}
        <input
          autoComplete={autoComplete}
          step='step'
          min={min || 0}
          max={max || null}
          pattern='[0-9]'
          onInput={handleOnInput}
          ref={ref}
          type={type}
          onChange={e => {
            _onChange(e);
          }}
          disabled={disabled}
          name={name}
          value={value}
          placeholder={placeholder}
          className={'input-number'}
        />
        <span className='invalid-message'>{error && error.message}</span>
      </div>
    );
  } else if (type === 'stars') {
    const styles = `input-box${error ? ' invalid' : ''}`;

    return (
      <div className={styles}>
        {label && <label>{label}</label>}
        <ReactStars
          name={name}
          starCount={5}
          size={30}
          color={'#adb5bd'}
          activeColor={'#ffb302'}
          a11y={true}
          isHalf={false}
          halfIcon={<i className='fa fa-star-half-alt' />}
          value={value}
          ref={ref}
          onChange={value => {
            onChange(name, value);
          }}
        />
        <span className='invalid-message'>{error && error.message}</span>
      </div>
    );
  } else {
    const styles = `input-box${inlineElement ? ` inline-btn-box` : ''} ${
      error ? 'invalid' : ''
    }`;

    return (
      <div className={styles}>
        {label && <label>{label}</label>}
        <div className='input-text-block'>
          <input
            className={'input-text'}
            autoComplete={autoComplete}
            ref={ref}
            type={type}
            onChange={e => {
              _onChange(e);
            }}
            disabled={disabled}
            name={name}
            defaultValue={defaultValue}
            value={value}
            placeholder={placeholder}
          />
          {inlineElement}
        </div>
        <span className='invalid-message'>{error && error.message}</span> 
      </div>
    );
  }
});

Input.defaultProps = {
  step: 1,
  decimals: true,
  rows: '4',
  inlineElement: null,
  autoComplete: 'on'
};

export default Input;
