import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { main_color } from "../styles/globalStyle";

//test용 단어 목록 -> 기능 구현 완료후 삭제
const wordsExample = [
  "ap",
  "korea",
  "app",
  "apple",
  "air plane",
  "enable",
  "france",
  "bag",
  "water",
  "trump",
  "t-shirts",
];

const SearchDropdown = (props) => {
  const { value, keyName } = props;
  const [match, setMatch] = useState([]);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

  console.log(keyName.value); //props 안 넘어오는 중 (기대값 : ArrowUp | ArrowDown)

  //useCallback?
  const customFussy = (value, callback) => {
    const numberOfCases = [];

    //정규식 x => 반복문과 slice 사용
    for (let x = 0; x < value.length; x++) {
      for (let y = 0; y < value.length - x; y++) {
        numberOfCases.push(value.slice(x, value.length - y));
      }
    }

    callback(numberOfCases);
  };

  const customFussyCallback = (numberOfCasesArray) => {
    const filteredMatch = [];
    for (let x = 0; x < numberOfCasesArray.length; x++) {
      const caseWord = numberOfCasesArray[x];
      filteredMatch.push(
        wordsExample.filter((word) => word.includes(caseWord) === true)
      );
    }

    const arr2 = [
      ...new Set(
        filteredMatch.reduce(function (acc, cur) {
          return [...acc, ...cur];
        })
      ),
    ];

    setMatch(arr2);
  };

  if (keyName) {
    if (keyName === "ArrowDown" && match.length - 1 > dropDownItemIndex) {
      setDropDownItemIndex(dropDownItemIndex + 1);
    }

    if (keyName === "ArrowUp" && dropDownItemIndex >= 0)
      setDropDownItemIndex(dropDownItemIndex - 1);
    if (keyName === "Enter" && dropDownItemIndex >= 0) {
      console.log("드롭다운 에서 enter 쳤을때", /*match[dropDownItemIndex]*/); //keyName 잘 넘어오면 Enter 키에 대한 부분 SearchInput/onKeyUp에도 추가하기
      setDropDownItemIndex(-1);
    }
  }

  useEffect(() => {
    customFussy(value, customFussyCallback);
  }, [value]);

  return (
    <SearchDropdownContainer>
      <Text>추천 검색어</Text>
      <SearchResult>
        {match?.map((matchWord, index) => {
          return <Recommend key={index}>{matchWord}</Recommend>;
        })}
      </SearchResult>
    </SearchDropdownContainer>
  );
};

export default SearchDropdown;

/* 이 아래 CSS는 자유롭게 수정해주세요 */
export const SearchDropdownContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: ${main_color};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 18px;
  position: absolute;
  top: 34px;
  z-index: 200;
`;

export const Text = styled.span`
  color: gray;
  font-size: 0.8rem;
`;

export const SearchResult = styled.div`
  width: 90%;
`;

export const Recommend = styled.p`
  padding: 5px 0;
`;
