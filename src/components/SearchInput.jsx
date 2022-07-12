import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
//import SearchDropdownFuse from './SearchDropdownFuse';
import SearchDropdown from './SearchDropdown';

//atom = searchResult를 다루는 전역 state 제작 예정

const SearchInput = () => {
  const [searchText, setSearchText] = useState('');
  //const [searchParams, setSearchParams] = useSearchParams('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   setSearchText(searchParams.get('q') ?? '');
  // }, [searchParams]);

  //! debouncing -----------------------------
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
  //! ------------------------------------------

  //! debouncing을 사용하는 경우 아래 handlechange 지우기
  // const handleChange = useCallback((event) => {
  //   setSearchText(event.target.value);
  //   console.log(event.target.value);
  // }, []);
  //! ------------------------------------------

  // const onKeyUp = useCallback((event) => {
  //   if (event.key === 'Enter' && event.target.value.trim().length > 0) {
  //     setSearchText(event.target.value);
  //     console.log(searchText);
  //     navigate(`/search?q=${searchText}`);
  //   }
  // }, []);

  const onKeyUp = (event) => {
    if (event.key === 'Enter' && event.target.value.trim().length > 0) {
      setSearchText(event.target.value);
      console.log(searchText);
      navigate(`/search?q=${searchText}`);
    }
  };

  return (
    <SearchInputContainer>
      <Input type='text' placeholder='검색어를 입력하세요' value={searchText} onChange={handleChange} onKeyUp={onKeyUp} />
      {searchText && <SearchDropdown value={searchText} />}
      {/*{searchText && <SearchDropdownFuse value={searchText} />}*/}
    </SearchInputContainer>
  );
};

export default SearchInput;

const SearchInputContainer = styled.div`
  width: 15rem;
  display: flex;
  justify-content:center;
  align-items:center;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 2rem;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 0 12px;
`;
