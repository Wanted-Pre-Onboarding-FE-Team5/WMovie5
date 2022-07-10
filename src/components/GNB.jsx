import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GNB = () => {
  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to='/'> Home</NavbarLink>
            <NavbarLink to='/search'> Search</NavbarLink>
            <NavbarLink to='/favorites'> Favorites</NavbarLink>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <SearchInput></SearchInput>
        </RightContainer>
      </NavbarInnerContainer>
    </NavbarContainer>
  );
};

export default GNB;

const NavbarContainer = styled.nav`
  width: 100%;
  height: 80px;
  background-color: black;
  display: flex;
  flex-direction: column;
`;

const LeftContainer = styled.div`
  flex: 70%;
  display: flex;
  align-items: center;
  padding-left: 5%;
`;

const RightContainer = styled.div`
  flex: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 50px;
`;

const SearchInput = styled.input`
  width: 80%;
  height: 35%;
  border: none;
  outline: none;
`;

const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`;

const NavbarLinkContainer = styled.div`
  display: flex;
`;

const NavbarLink = styled(Link)`
  color: white;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
`;
