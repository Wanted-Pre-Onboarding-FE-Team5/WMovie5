import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const SearchInput = () => {
  const [searchText, setSearchText] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('');

  useEffect(() => {
    setSearchText(searchParams.get('q') ?? '');
  }, [searchParams]);

  //! debouncing -----------------------------
  // const debounceFunction = (callback, delay) => {
  //   let timer;
  //   return (...args) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => callback(...args), delay);
  //   };
  // };

  // const printValue = useCallback(
  //   debounceFunction((searchText) => console.log(searchText), 500),
  //   []
  //   );

  // const handleChange = (event) => {
  //   printValue(event.target.value);
  //   setSearchText(event.target.value);
  // };
  //! ------------------------------------------

  //! debouncing을 사용하는 경우 아래 handlechange 지우기
  const handleChange = useCallback((event) => {
    setSearchText(event.target.value);
    console.log(event.target.value);
  }, []);
  //! ------------------------------------------

  const onKeyUp = useCallback(
    (event) => {
      if (event.key === 'Enter' && event.target.value.trim().length > 0) {
        setSearchParams({ q: event.target.value });
      }
    },
    [setSearchParams]
  );

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
