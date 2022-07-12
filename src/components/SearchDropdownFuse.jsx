//Fuse.js 라이브러리 적용 
import React, { useEffect, useState, useMemo } from "react";
import Fuse from "fuse.js";
import { SearchDropdownContainer, Text, SearchResult } from "./SearchDropdown";

//test용 단어 목록 -> 기능 구현 완료후 삭제
const wordsExample = [
  "간",
  "간염",
  "간암",
  "간성",
  "간질병",
  "간염증",
  "간염증있을때",
  "공백기간",
  "기간",
  "국가간교류",
  "소금간",
  "인간",
  "인간관계",
  "ap",
  "korea",
  "app",
  "apple",
  "air plane",
  "enable",
  "france",
  "bag",
  "water",
  "drug",
  "t-shirts"
];

//Fuse 인스턴스에 줄 옵션 -> 따로 파일로?
const fuseOptions = {
  findAllMatches: true,
  shouldSort: true,
}

const SearchDropdownFuse = (props) => {
  const { value } = props;
  const [match, setMatch] = useState([]);

  const fuse = useMemo(
    ()=>new Fuse(wordsExample,fuseOptions),
    []
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
            return <p key={index}>{matchWord}</p>;
          })}
      </SearchResult>
    </SearchDropdownContainer>
  );
};

export default SearchDropdownFuse;
