/**
 *
 * SearchBar
 *
 */

import React, { useState } from 'react';

import Button from '../Button';

function SearchBar(props) {
  const [value, setValue] = useState('')
  const [typingTimeout, setTypingTimeout] = useState(0)

  const _onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (this.state.typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setValue(value)
    setTypingTimeout(setTimeout(() => {
      if (this.props.onSearch) {
        props.onSearch({ name, value });
      }
    }, 1000))
  }

  const _handleSubmit = (e) => {
    e.preventDefault();

    const name = this.props.name;
    const value = this.state.value;

    if (props.onSearchSubmit) {
      props.onSearchSubmit({ name, value });
    }
  }

  const _onBlur = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (props.onBlur) {
      props.onBlur({ name, value });
    }
  }

  const {
    id,
    name,
    placeholder,
    className,
    inlineBtn,
    btnText,
    autoComplete
  } = this.props;

  const styles = `search-box${inlineBtn ? ` inline-btn-box` : ''}`;
  const classNames = `input-text search-box${`${
    className && ` ${className}`
  }`}`;

  return (
    <form onSubmit={_handleSubmit} noValidate>
      <div className={styles}>
        <div className='input-text-block'>
          <input
            autoComplete={autoComplete}
            type='text'
            id={id}
            name={name}
            className={classNames}
            placeholder={placeholder}
            value={value}
            onChange={_onChange}
            onBlur={_onBlur}
          />
          <Button type='submit' variant='primary' text={btnText} />
        </div>
      </div>
    </form>
  );
}

SearchBar.defaultProps = {
  className: '',
  id: 'search',
  name: 'search',
  placeholder: 'Search',
  inlineBtn: true,
  btnText: 'Search',
  autoComplete: 'off'
};

export default SearchBar;
