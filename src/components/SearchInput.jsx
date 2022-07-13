import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { debounce } from '../utils/debounce';

//atom = searchResult를 다루는 전역 state 제작 예정

const SearchInput = () => {
  const [searchText, setSearchText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');

  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateDebounceText = useCallback(
    debounce((value) => {
      setDebouncedText(value);
    }, 500),
    []
  );

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    updateDebounceText(value);
  };

  const onKeyUp = (event) => {
    if (event.key === 'Enter' && event.target.value.trim().length > 0) {
      setDebouncedText(event.target.value);
      navigate(`/search?q=${searchText}`);
    }
  };

  useEffect(() => {
    console.log('debouncedText:', debouncedText);
  }, [debouncedText]);

  return (
    <SearchInputContainer>
      <Input type='text' placeholder='검색어를 입력하세요' value={searchText} onChange={handleChange} onKeyUp={onKeyUp} />
      {/*debouncedText && <SearchDropdown value={debouncedText} />*/}
      {/*{debouncedText && <SearchDropdownFuse value={debouncedText} />}*/}
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
