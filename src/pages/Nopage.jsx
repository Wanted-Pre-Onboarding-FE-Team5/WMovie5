import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Nopage = () => {
  return (
    <NopageContainer>
      <NopageBox>
        <h1>검색 결과가 없습니다.</h1>
        <Link to="/">
          <button type="button">되돌아가기</button>
        </Link>
      </NopageBox>
    </NopageContainer>
  );
};

export default Nopage;

const NopageContainer = styled.div`
  display: flex;
  background-color: #191b22;
  width: 100%;
  height: 100vh;

  button {
    background-color: none;
    border: 1px solid black;
    width: 80px;
    height: 30px;
    border-radius: 5px;
  }
`;

const NopageBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 24px;
    color: white;
    font-weight: bold;
  }
`;
