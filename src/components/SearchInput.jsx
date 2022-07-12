import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//atom = searchResult를 다루는 전역 state 제작 예정

const SearchInput = () => {
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();

  const debounceFunction = (callback, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
  };

  const printValue = useCallback(
    debounceFunction((searchText) => console.log(searchText), 500),
    []
  );

  const handleChange = (event) => {
    printValue(event.target.value);
    setSearchText(event.target.value);
  };

  const onKeyUp = (event) => {
    if (event.key === 'Enter' && event.target.value.trim().length > 0) {
      setSearchText(event.target.value);
      navigate(`/search?q=${searchText}`);
    }
  };

  return (
    <SearchInputContainer>
      <Input type='text' placeholder='검색어를 입력하세요' value={searchText} onChange={handleChange} onKeyUp={onKeyUp} />
    </SearchInputContainer>
  );
};

export default SearchInput;

const SearchInputContainer = styled.div`
  width: 50%;
`;

const Input = styled.input`
  width: 100%;
  height: 18px;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 12px;
`;
