import React from "react";
import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";

const GNB = () => {
  return (
    <GNBContainer>
      <GNBLogo>WMovie5</GNBLogo>
      <GNBTabContainer>
        <GNBTab>검색</GNBTab>
        <GNBTab>즐겨찾기</GNBTab>
      </GNBTabContainer>
      <GNBSearchContainer>
        <GNBSearchForm>
          <GNBSearchInput />
          <GNBSearchButton>
            <BiSearchAlt size={17} />
          </GNBSearchButton>
        </GNBSearchForm>
      </GNBSearchContainer>
    </GNBContainer>
  );
};

export default GNB;

const GNBContainer = styled.div`
  width: 100%;
  height: 50px;
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: black;
  color: white;
  box-shadow: 0px 4px 4px 4px black;
  -moz-box-shadow: 0px 4px 4px 4px black;
  -webkit-box-shadow: 0px 4px 4px 4px black;
`;

const GNBLogo = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

const GNBTabContainer = styled.div`
  gap: 1rem;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
`;

const GNBTab = styled.div`
  padding: 0 0.5rem;
  cursor: pointer;
`;

const GNBSearchContainer = styled.div`
  width: 15rem;
  padding: 0.2rem 0;
  border: 0.125rem solid gray;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GNBSearchForm = styled.form`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GNBSearchInput = styled.input`
  width: 10rem;
  border: none;
  color: white;
  background-color: black;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
`;

const GNBSearchButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  margin-left: 0.2rem;
  font-size: 1rem;
  cursor: pointer;
`;
