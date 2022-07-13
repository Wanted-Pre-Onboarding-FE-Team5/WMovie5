import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { useRecoilState } from "recoil";
import { movieState } from "../state/atoms";
import styled from "styled-components";
import { main_color } from "../styles/globalStyle";

const fuseOptions = {
  findAllMatches: true,
  shouldSort: true,
};

const SearchDropdown = (props) => {
  const { value, onResetInputValue } = props;

  const [match, setMatch] = useState([]);
  const [titles, setTitles] = useState([]);

  const navigate = useNavigate();
  const movies = useRecoilState(movieState);
  useEffect(() => {
    setTitles(movies[0].map((i) => i.title_english));
  }, []);

  const fuse = useMemo(() => new Fuse(titles, fuseOptions), [titles]);

  useEffect(() => {
    const sortedMatch = [];
    for (let x of fuse.search(value)) {
      sortedMatch.push(x.item);
    }

    if (sortedMatch.length === 0) {
      setMatch(["검색어 없음"]);
    } else {
      setMatch(sortedMatch);
    }
  }, [value, fuse]);

  const handleDropdownClick = (event) => {
    navigate(`/search?q=${event.target.innerText}`);
    setMatch([]);
    onResetInputValue();
  };

  return (
    <SearchDropdownContainer>
      <Text>추천 검색어</Text>
      <SearchResult>
        {match?.slice(0, 8).map((matchWord, index) => {
          return (
            <Recommend key={index} onClick={handleDropdownClick}>
              {matchWord}
            </Recommend>
          );
        })}
      </SearchResult>
    </SearchDropdownContainer>
  );
};

export default SearchDropdown;

const SearchDropdownContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: ${main_color};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 0;
  position: absolute;
  top: 34px;
  z-index: 200;
`;

const Text = styled.span`
  padding: 5px 10px;
  color: gray;
  font-size: 0.8rem;
`;

const SearchResult = styled.div`
  width: 100%;
`;

const Recommend = styled.p`
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;
