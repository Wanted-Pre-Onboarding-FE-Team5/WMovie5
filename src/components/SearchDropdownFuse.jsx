//Fuse.js 라이브러리 적용 
import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { main_color } from "../styles/globalStyle";
import Fuse from "fuse.js";

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
  "app",
  "apple",
  "air plane",
  "enable"
];

//Fuse 인스턴스에 줄 옵션 -> 따로 파일로?
const fuseOptions = {
  findAllMatches: true,
  shouldSort: true,
}

//GNB에서 빈칸이 아닌 검색어를 props로 넘겨준다고 가정(input이 빈칸이면 아예 searchDropdown이 렌더링 되지 않아야한다고 생각함)
const SearchDropdownFuse = (props) => {
  const { input, movies } = props;
  
  //매칭되는 단어 목록 배열 match
  const [match, setMatch] = useState([]);
  
  /* fuse 인스턴스 첫번째 파라미터는 db, 두번째 파라미터는 매칭 체크시 지정할 수 있는 옵션
   * return 값 = match되는 단어들을 db에서 찾아 배열로 반환 
   * return 값 구조 = [
   *  {item: '매칭단어1', refIndex: 0},
   *  {item: '매칭단어2', refIndex: 1}, 
   *  ...
   * ] => 값은 item 프로퍼티에서 꺼내야됨.
   * 아직 이유 모르겠는 부분 #1 = 처음 Fuse 인스턴스를 만들때 왜인지 인스턴스가 계속해서 새로 만들어짐...useMemo사용필요
   * Fuse.js로 결정되면 Fuse 인스턴스 생성 + match만드는 함수 따로 파일로 분리하고 싶음
   */

  const fuse = useMemo(
    ()=>new Fuse(wordsExample,fuseOptions),
    []
  );

  useEffect(()=>{
    const sortedMatch = [];
    for(let x of fuse.search(input)) {
      sortedMatch.push(x.item);
    }

    if(sortedMatch.length===0) {
      setMatch(["검색어 없음"]);
    } else {
      setMatch(sortedMatch);
    }
  },[input,fuse])

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

/* 이 아래 CSS는 자유롭게 수정해주세요
 * SearchDropdownContainer의 width와 height는 임의의 값 
 */
const SearchDropdownContainer = styled.div`
  box-sizing: border-box;
  width: 200px;
  height: auto;
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
