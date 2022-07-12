import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { main_color } from "../styles/globalStyle";

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

const SearchDropdown = (props) => {
  const { value } = props; //최종 입력 단어만 넘어오는게 아님!
  const [match, setMatch] = useState([]); //최종

  //인풋 value로 만들수 있는 경우의 수 만드는 함수(우선순위 제 기준으로 정함...틀릴수도있음)
  const customFussy = (value, callback) =>{
    const numberOfCases = []; //경우의 수 = [app, ap, a, pp,p p]

    //정규식 x => 반복문과 slice 사용
    for(let x=0;x<value.length;x++){
      for(let y=0;y<value.length-x;y++){
        numberOfCases.push(value.slice(x,value.length-y));
      }
    }
    callback(numberOfCases);
  }

  const customFussyCallback = (numberOfCasesArray) => {
    const filteredMatch = [];
    for(let x of numberOfCasesArray) {  //x 말고 뭐 좋은거 없을까요? case하려고 했는데 예약어임.
      console.log(x);
      filteredMatch.push(wordsExample.filter((word)=>word.includes(x)===true));
      console.log("includes 적용하고 나서",filteredMatch);
    }

    if(filteredMatch.length===0) {
      return ["검색어 없음"];
    }
    else return filteredMatch.sort();
  };

  useEffect(() => {
    setMatch(customFussy(value,customFussyCallback));
  },[value]);

  return (
    <SearchDropdownContainer>
      <Text>추천 검색어</Text>
      <SearchResult>
        {match?.map((matchWord, index) => {
          return <p key={index}>{matchWord}</p>;
        })}
      </SearchResult>
    </SearchDropdownContainer>
  );
};

export default SearchDropdown;

/* 이 아래 CSS는 자유롭게 수정해주세요 */
export const SearchDropdownContainer = styled.div`
  width: 95%;
  height: auto;
  background-color: ${main_color};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 18px;
  position: absolute;
  top: 34px;
`;

export const Text = styled.span`
  color: gray;
  font-size: 0.8rem;
`;

export const SearchResult = styled.div`
  width: 90%;
  padding: 0;
`;
