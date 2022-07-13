import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { debounce } from "../utils/debounce";
import SearchDropdown from "./SearchDropdown";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedText, setDebouncedText] = useState("");

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
    setInputValue(value);
    updateDebounceText(value);
  };

  const onKeyUp = (event) => {
    if (event.key === "Enter" && event.target.value.trim().length > 0) {
      setDebouncedText(event.target.value);
      navigate(`/search?q=${inputValue}`);
    }
  };

  useEffect(() => {
    console.log("debouncedText:", debouncedText);
  }, [debouncedText]);

  return (
    <SearchInputContainer>
      <Input
        type="text"
        placeholder="검색어를 입력하세요"
        value={inputValue}
        onChange={handleChange}
        onKeyUp={onKeyUp}
      />
      {debouncedText && <SearchDropdown value={debouncedText}/>}
    </SearchInputContainer>
  );
};

export default SearchInput;

const SearchInputContainer = styled.div`
  width: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
