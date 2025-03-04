import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.primary ? '#ec7211' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#545b64'};
  border: ${props => props.primary ? '1px solid #ec7211' : '1px solid #545b64'};
  padding: 8px 20px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.primary ? '#eb5f07' : '#fafafa'};
    border-color: ${props => props.primary ? '#eb5f07' : '#545b64'};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #00a1c9;
  }
  
  svg {
    margin-left: 8px;
  }
`;

const Button = ({ children, primary, onClick, type = 'button', ...props }) => {
  return (
    <StyledButton 
      primary={primary} 
      onClick={onClick} 
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
