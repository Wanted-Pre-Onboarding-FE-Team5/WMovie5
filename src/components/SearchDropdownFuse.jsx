//Fuse.js 라이브러리 적용 
import React, { useEffect, useState, useMemo } from "react";
import Fuse from "fuse.js";
import { useRecoilState } from 'recoil';
import { movieState } from '../state/atoms';
import { SearchDropdownContainer, Text, SearchResult, Recommend } from "./SearchDropdown";

const fuseOptions = {
  findAllMatches: true,
  shouldSort: true,
}

const SearchDropdownFuse = (props) => {
  const { value } = props;

  const [match, setMatch] = useState([]);
  const [titles, setTitles] = useState([]);

  const movies = useRecoilState(movieState);
  useEffect(()=>{
    setTitles(movies[0].map(i=>i.title_english));
  },[]);

  const fuse = useMemo(
    ()=>new Fuse(titles,fuseOptions),
    [titles]
  );

  useEffect(()=>{
    const sortedMatch = [];
    for(let x of fuse.search(value)) {
      sortedMatch.push(x.item);
    }

    if(sortedMatch.length===0) {
      setMatch(["검색어 없음"]);
    } else {
      setMatch(sortedMatch);
    }
  },[value,fuse])

  return (
    <SearchDropdownContainer>
      <Text>추천 검색어</Text>
      <SearchResult>
        {match.map((matchWord, index) => {
            return <Recommend key={index}>{matchWord}</Recommend>;
          })}
      </SearchResult>
    </SearchDropdownContainer>
  );
};

export default SearchDropdownFuse;
