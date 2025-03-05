// src/components/steps/IntroStep.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';

const StepContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #16191f;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #545b64;
  max-width: 800px;
  margin: 0 auto 30px;
  line-height: 1.6;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
  margin-bottom: 60px;
`;

const FeatureCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #16191f;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #545b64;
  line-height: 1.5;
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  
  svg {
    width: 30px;
    height: 30px;
    color: #ec7211;
  }
`;

const CTASection = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const LoginContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #16191f;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #d5dbdb;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0073bb;
    box-shadow: 0 0 0 2px rgba(0, 115, 187, 0.2);
  }
`;

const ErrorMessage = styled.div`
  color: #d13212;
  background-color: #fdf3f1;
  border: 1px solid #f7b6a3;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 0.9rem;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #ec7211;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const IntroStep = () => {
  const navigate = useNavigate();
  const { 
    isAuthenticated, 
    isLoading, 
    username, 
    setUsername, 
    password, 
    setPassword, 
    errorMessage, 
    handleLogin 
  } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleTryDemo = async () => {
    if (isAuthenticated) {
      navigate('/stylist');
    } else {
      setShowLogin(true);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    // Make sure we're passing the current values from state, not references to the state variables
    const success = await handleLogin(username, password);
    if (success) {
      navigate('/stylist');
    }
  };
  

  return (
    <StepContainer>
      <HeroSection>
        <Title>Welcome to AI Stylist</Title>
        <Subtitle>
          Get personalized fashion recommendations powered by Amazon Bedrock.
          Our AI stylist helps you discover outfits that match your style preferences and occasion.
        </Subtitle>
        <img 
          src="/ai-stylist-illustration.svg" 
          alt="AI Stylist Illustration" 
          style={{ maxWidth: '100%', height: 'auto', marginBottom: '30px' }}
        />
      </HeroSection>
      
      <FeatureGrid>
        <FeatureCard>
          <FeatureIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </FeatureIcon>
          <FeatureTitle>Personalized Recommendations</FeatureTitle>
          <FeatureDescription>
            Get outfit suggestions tailored to your unique style preferences, body type, and occasion.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </FeatureIcon>
          <FeatureTitle>Style Guidance</FeatureTitle>
          <FeatureDescription>
            Learn fashion tips, color coordination, and how to dress for different occasions.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </FeatureIcon>
          <FeatureTitle>Trend Analysis</FeatureTitle>
          <FeatureDescription>
            Stay updated with the latest fashion trends and learn how to incorporate them into your wardrobe.
          </FeatureDescription>
        </FeatureCard>
      </FeatureGrid>
      
      {showLogin && !isAuthenticated ? (
        <LoginContainer>
          <h2>Sign In</h2>
          <p>Please sign in to access the AI Stylist demo</p>
          
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          
          <form onSubmit={handleSubmitLogin}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            
            <Button primary type="submit" disabled={isLoading} style={{ width: '100%' }}>
              {isLoading ? <LoadingSpinner /> : 'Sign In'}
            </Button>
          </form>
        </LoginContainer>
      ) : (
        <CTASection>
          <Button primary onClick={handleTryDemo} size="large">
            {isAuthenticated ? 'Continue to AI Stylist' : 'Try Free Demo'}
          </Button>
        </CTASection>
      )}
    </StepContainer>
  );
};

export default IntroStep;
