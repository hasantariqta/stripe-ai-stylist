import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #232f3e;
  color: white;
`;

const Logo = styled.a`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 20px;
`;

const AWSLogo = styled.a`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const Separator = styled.hr`
  height: 20px;
  margin: 0 15px;
  border: none;
  border-left: 1px solid #5a5a5a;
`;

const RightContent = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const Button = styled.a`
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 8px 16px;
  border-radius: 2px;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    margin-left: 8px;
    width: 14px;
    height: 14px;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer data-testid="nav-bar">
      <AWSLogo href="https://aws.amazon.com/" target="_blank" className="hui-navbar-aws-logo">
        <svg width="30" height="18" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.11 12.33L5.66 17.04H3.85L7.08 10.71C8.29 8.42 10.66 9.06 11.77 9.95L12.39 8.83C10.48 7.45 7.37 7.82 5.77 10.71L2.53 17.04H0.72L3.98 10.71C5.19 8.42 7.56 9.06 8.67 9.95L9.29 8.83C7.38 7.45 4.27 7.82 2.67 10.71L0 17.04H4.7L5.48 15.5H9.19L8.11 12.33ZM6.02 14.07L7.1 11.95L8.18 14.07H6.02Z" fill="white"/>
          <path d="M14.36 17.04H12.55L15.82 10.71C17.03 8.42 19.4 9.06 20.51 9.95L21.13 8.83C19.22 7.45 16.11 7.82 14.51 10.71L11.27 17.04H9.46L12.73 10.71C13.94 8.42 16.31 9.06 17.42 9.95L18.04 8.83C16.13 7.45 13.02 7.82 11.42 10.71L8.75 17.04H13.45L14.23 15.5H17.94L16.86 12.33L14.41 17.04H14.36ZM14.77 14.07L15.85 11.95L16.93 14.07H14.77Z" fill="white"/>
          <path d="M29.28 12.33L26.83 17.04H25.02L28.25 10.71C29.46 8.42 31.83 9.06 32.94 9.95L33.56 8.83C31.65 7.45 28.54 7.82 26.94 10.71L23.7 17.04H21.89L25.16 10.71C26.37 8.42 28.74 9.06 29.85 9.95L30.47 8.83C28.56 7.45 25.45 7.82 23.85 10.71L21.17 17.04H25.87L26.65 15.5H30.36L29.28 12.33ZM27.19 14.07L28.27 11.95L29.35 14.07H27.19Z" fill="white"/>
        </svg>
      </AWSLogo>
      
      <Separator />
      
      <Logo href="/" className="hui-navbar-title">
        AI Stylist
      </Logo>
      
      <RightContent>
        <Button 
          href="-1.console.aws.amazon.com/bedrock/home?region=us-east-1#/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Visit Amazon Bedrock
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
            <path d="M14 8.01v-6H8M14.02 2 8 8.01M6 2.01H2v12h12v-3.99" stroke="currentColor" fill="none" strokeLinejoin="round"></path>
          </svg>
        </Button>
      </RightContent>
    </NavbarContainer>
  );
};

export default Navbar;
