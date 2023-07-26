import React, { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { useNavigate, useLocation } from 'react-router-dom';
import { useHttp } from '../../hooks';
import { renderSuggestion } from '../../utils';

const inputProps = {
  placeholder: 'Search Products',
};

const SearchBar = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');
  const { sendRequest } = useHttp();
  const navigate = useNavigate();
  const location = useLocation()


  const onSuggestionsFetchRequested = async ({ value }) => {
    const searchStr = value.trim().toLowerCase();
    if (searchStr.length > 2) {
      const data = await sendRequest({
        url: `/product/list/search/${searchStr}`,
        method: 'get',
      });
      setSuggestions(data.products);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    navigate(`/product/${suggestion._id}`);
    setValue(suggestion.name);
  };

  const clearSuggistions = () => setSuggestions([])


  useEffect(() => {
    return () => {
      clearSuggistions()
      window.scrollTo(0,0)
    }
  }, [location.pathname])

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(data) => data.name}
      renderSuggestion={renderSuggestion}
      inputProps={{ ...inputProps, value, onChange: (_, { newValue }) => setValue(newValue) }}
      onSuggestionSelected={onSuggestionSelected}
    />
  );
};

export default SearchBar;