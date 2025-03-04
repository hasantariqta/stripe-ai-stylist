import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  max-width: 600px;
  
  @media (min-width: 768px) {
    padding-right: 40px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #16191f;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 30px;
  color: #545b64;
`;

const Duration = styled.p`
  font-size: 0.9rem;
  color: #687078;
  margin-top: 15px;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    max-width: 100%;
    height: auto;
  }
`;

const IntroStep = () => {
  const navigate = useNavigate();
  
  const handleStartDemo = () => {
    navigate('/stylist');
  };
  
  return (
    <div className="hui-step" data-testid="step_Intro">
      <IntroContainer className="intro-step-container">
        <ContentSection className="hui-intro-screen-content">
          <Title className="hui-display-02">AI Stylist</Title>
          <Description className="hui-paragraph-large">
            Amazon Bedrock is the easiest way to build and scale generative AI applications with foundation models. 
            Learn how to use Amazon Bedrock to create a business solution for your use case.
          </Description>
          <Button 
            primary 
            onClick={handleStartDemo}
            data-testid="intro-screen-startbutton"
          >
            Try free demo
          </Button>
          <Duration className="hui-text-secondary hui-label-02">Duration: 5 minutes</Duration>
        </ContentSection>
        
        <ImageContainer className="intro-image-container">
          <img 
            src="/ai-stylist-illustration.svg" 
            alt="AI Stylist Illustration" 
            width="500" 
            height="500"
          />
        </ImageContainer>
      </IntroContainer>
      </div>
  );
};

export default IntroStep;
