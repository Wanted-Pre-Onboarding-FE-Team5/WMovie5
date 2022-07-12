import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const debounceFunction = (callback, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
  };

  const onDebouncedSetSearchText = debounceFunction((value) => {
    setSearchText(value);
  }, 500);

  const handleChange = (event) => {
    const value = event.target.value;
    onDebouncedSetSearchText(value);
  };

  const onKeyUp = (event) => {
    if (event.key === "Enter" && event.target.value.trim().length > 0) {
      console.log("onkeyup", searchText);
      setSearchText(event.target.value);
      navigate(`/search?q=${searchText}`);
    }
  };

  return (
    <SearchInputContainer>
      <Input
        type="text"
        placeholder="검색어를 입력하세요"
        onChange={handleChange}
        onKeyUp={onKeyUp}
      />
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
