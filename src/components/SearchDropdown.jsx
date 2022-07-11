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
  "에어",
  "에어컨만든사람",
  "에어컨",
  "커피프린스",
  "커피",
  "커피아이스크림",
  "커스텀",
  "apple",
  "app",
  "air plane",
  "enable",
];

//GNB에서 빈칸이 아닌 검색어를 props로 넘겨준다고 가정(input이 빈칸이면 아예 searchDropdown이 렌더링 되지 않아야한다고 생각함)
const SearchDropdown = (props) => {
  const { input, movies } = props;

  //매칭되는 단어 목록 배열 match
  const [match, setMatch] = useState([]);
  
  /*
   * 틀린 단어가 넘어와도 가장 연관성 있게 찾는 방법 생각해내야 됨.
   */
  const findMatchByInput = (input) => {
    const temp = wordsExample.filter((word) => word.includes(input));
    if(temp.length===0) {
      return ["검색어 없음"];
    }
    else return temp.sort();
  };

  useEffect(() => {
    setMatch(findMatchByInput(input));
  }, [input]);

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

/* 이 아래 CSS는 자유롭게 수정해주세요 
 * SearchDropdownContainer의 width와 height는 임의의 값 
 */
const SearchDropdownContainer = styled.div`
  box-sizing: border-box;
  width: 500px;
  height: 500px;
  border-radius: 25px;
  background-color: ${main_color};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 20px;
`;

const Text = styled.span`
  color: gray;
  font-size: 0.8rem;
`;

const SearchResult = styled.div`
  width: 90%;
  padding: 0;
`;
