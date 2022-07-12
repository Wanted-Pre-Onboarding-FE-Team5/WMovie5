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
  const { value } = props;
  const [match, setMatch] = useState([]);

  /*
   * 틀린 단어가 넘어와도 가장 연관성 있게 찾는 방법 생각해내야 됨.
   */
  const findMatchByValue = (value) => {
    const filteredMatch = wordsExample.filter((word) => word.includes(value) === true);
    console.log("그냥 인풋값",value);
    console.log("includes 적용",filteredMatch); 

/* 정규식 만들기 -> sort()로 알아서 순서 오름차순으로  
const value="물놀이";    
    const a = value.split(''); //["물","놀","이"]

    전부 일치 : regEx1 = /물놀이.*|.*물놀이.*|.*물놀이/g
2글자만 일치 : 
/물놀/ regEx2 = /[^이]물놀[^이]|[^이]*물놀$/
/물X이/ regEx3 = /[^놀]물[^놀]*이[^놀]|[^놀]물[^놀]*이[^놀]/
/놀이/ regEx4 = /.*[^물]놀이[^물]*\/
1글자만 일치 : 
/물/ regEx5 = /[^놀|이]([물][^놀|이][^이])[^놀|이]/
/놀/ regEx6 = /[^물|이]([^물|이][놀][^이])[^물|이]/
/이/ regEx7 = /[^놀|물]([^물|놀][^놀|물][이])[^물|놀]/
*/

    if(filteredMatch.length===0) {
      return ["검색어 없음"];
    }
    else return filteredMatch.sort();
  };

  useEffect(() => {
    setMatch(findMatchByValue(value));
  }, [value]);

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
