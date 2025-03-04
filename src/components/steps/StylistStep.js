import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const StepContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

const StepHeader = styled.div`
  margin-bottom: 30px;
`;

const StepTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #16191f;
`;

const StepDescription = styled.p`
  font-size: 1rem;
  color: #545b64;
  line-height: 1.5;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #d5dbdb;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #0073bb;
    box-shadow: 0 0 0 2px rgba(0, 115, 187, 0.2);
  }
`;

const ResponseContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  border-left: 4px solid #ec7211;
`;

const ResponseTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #16191f;
`;

const ResponseContent = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  color: #545b64;
  white-space: pre-wrap;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;

const StylistStep = () => {
  const [stylePreferences, setStylePreferences] = useState('');
  const [occasion, setOccasion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This would be replaced with actual API call to Amazon Bedrock
    setTimeout(() => {
      const mockResponse = `Based on your preferences for ${occasion}, here are some style recommendations:

1. A tailored navy blazer paired with slim-fit chinos and leather loafers
2. A casual button-down shirt in a subtle pattern with dark jeans
3. A lightweight merino wool sweater over a crisp white shirt

These options balance comfort and style while maintaining a professional appearance.`;
      
      setResponse(mockResponse);
      setIsLoading(false);
    }, 2000);
  };
  
  const handleReset = () => {
    setStylePreferences('');
    setOccasion('');
    setResponse('');
  };
  
  return (
    <StepContainer>
      <StepHeader>
        <StepTitle>Get Personalized Style Recommendations</StepTitle>
        <StepDescription>
          Tell us about your style preferences and the occasion, and our AI stylist will provide
          personalized recommendations just for you.
        </StepDescription>
      </StepHeader>
      
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="occasion">What's the occasion?</Label>
            <Input
              type="text"
              id="occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              placeholder="Business meeting, casual outing, formal event, etc."
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="preferences">Tell us about your style preferences</Label>
            <TextArea
              id="preferences"
              value={stylePreferences}
              onChange={(e) => setStylePreferences(e.target.value)}
              placeholder="Describe your preferred colors, fits, brands, or any specific requirements..."
              required
            />
          </FormGroup>
          
          <ButtonContainer>
            <Button type="button" onClick={handleReset}>
              Reset
            </Button>
            <Button primary type="submit" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Get Recommendations'}
            </Button>
          </ButtonContainer>
        </form>
        
        {response && (
          <ResponseContainer>
            <ResponseTitle>Your Style Recommendations</ResponseTitle>
            <ResponseContent>{response}</ResponseContent>
          </ResponseContainer>
        )}
      </FormContainer>
    </StepContainer>
  );
};

export default StylistStep;
