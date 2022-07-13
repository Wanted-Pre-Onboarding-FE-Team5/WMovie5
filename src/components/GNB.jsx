import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchInput from './SearchInput';

const GNB = () => {
  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to='/'>Home</NavbarLink>
            <NavbarLink to='/favorites'>Favorites</NavbarLink>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <SearchInput />
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
  justify-content: center;
  align-items: center;
`;

const NavbarInnerContainer = styled.div`
  width: 90%;
  height: 80px;
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavbarLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
`;

const NavbarLink = styled(Link)`
  color: white;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
`;
