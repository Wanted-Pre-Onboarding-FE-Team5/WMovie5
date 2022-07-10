import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const SearchInput = () => {
  const [inputValue, setInputValue] = useState('');

  const debounceFunction = (callback, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
  };

  const printValue = useCallback(
    debounceFunction((inputValue) => console.log(inputValue), 500),
    []
  );

  const handleChange = (event) => {
    printValue(event.target.value);
    setInputValue(event.target.value);
  };

  return (
    <SearchInputContainer>
      <Input type='text' placeholder='검색어를 입력하세요' value={inputValue} onChange={handleChange} />
    </SearchInputContainer>
  );
};

export default SearchInput;

const SearchInputContainer = styled.div`
  width: 60%;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  border: none;
  outline: none;
  font-size: 16px;
`;
