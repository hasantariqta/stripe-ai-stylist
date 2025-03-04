import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-top: 1px solid #eaeded;
  font-size: 0.8rem;
  color: #545b64;
  flex-wrap: wrap;
`;

const FooterLink = styled.a`
  color: #545b64;
  text-decoration: none;
  margin: 0 10px;
  
  &:hover {
    text-decoration: underline;
    color: #0073bb;
  }
`;

const Divider = styled.div`
  margin: 0 5px;
`;

const Copyright = styled.div`
  margin: 0 10px;
`;

const Footer = () => {
  return (
    <FooterContainer id="footer">
      <FooterLink href="https://aws.amazon.com/privacy/?nc1=f_pr" target="_blank" rel="noreferrer">
        Privacy
      </FooterLink>
      
      <Divider>|</Divider>
      
      <FooterLink href="amazon.com/terms/?nc1=f_pr" target="_blank" rel="noreferrer">
        Site Terms
      </FooterLink>
      
      <Divider>|</Divider>
      
      <FooterLink href="#" role="button">
        Cookie Preferences
      </FooterLink>
      
      <Copyright>
        © {new Date().getFullYear()} Amazon Web Services, Inc. or its affiliates. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
