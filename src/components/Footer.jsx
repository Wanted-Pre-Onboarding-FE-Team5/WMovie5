import React from 'react';
import styled from 'styled-components';
import { main_color } from '../styles/globalStyle';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>WMovie5 v.0.1.0</FooterText>
      <FooterText>created by wanted-pre-onboarding-fe-5th team5</FooterText>
      <FooterText>participants : 최보성, 김연진, 이유미, 홍정민, 김슬기</FooterText>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  width: 100%;
  height: 20vh;
  margin: 0;
  padding: 30px 0;
  background-color: ${main_color};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FooterText = styled.span`
  margin: 5px 0;
  text-align: center;
  font-size: 0.8rem;
`;
