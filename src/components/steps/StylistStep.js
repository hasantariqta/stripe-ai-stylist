import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';

const StepContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 160px);
`;

const StepHeader = styled.div`
  margin-bottom: 20px;
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

const ChatContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const ChatHistory = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ChatInputContainer = styled.div`
  border-top: 1px solid #eaeded;
  padding: 16px;
  background-color: #f8f8f8;
`;

const ChatForm = styled.form`
  display: flex;
  gap: 10px;
`;

const ChatTextArea = styled.textarea`
  flex: 1;
  padding: 12px;
  border: 1px solid #d5dbdb;
  border-radius: 4px;
  font-size: 1rem;
  resize: none;
  min-height: 60px;
  max-height: 120px;
  
  &:focus {
    outline: none;
    border-color: #0073bb;
    box-shadow: 0 0 0 2px rgba(0, 115, 187, 0.2);
  }
`;

const SendButton = styled(Button)`
  align-self: flex-end;
`;

const MessageBubble = styled('div').attrs(props => ({
    // Remove isUser from DOM attributes
    className: props.isUser ? 'user-message' : 'assistant-message',
    // Don't pass isUser to the DOM
    isUser: undefined
  }))`
    padding: 12px 16px;
    border-radius: 8px;
    max-width: 80%;
    position: relative;
    line-height: 1.5;
    align-self: flex-start;
    margin-left: 40px;
    
    &.user-message {
      background-color: #f8f8f8;
      color: #16191f;
      border: 1px solid #eaeded;
    }
    
    &.assistant-message {
      background-color: #f1f3f3;
      color: #16191f;
    }
  `;
  

const AvatarContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.isUser ? '#ec7211' : '#232f3e'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: absolute;
  left: -40px;
  top: 0;
`;

const MessageHeader = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  margin-bottom: 4px;
  color: ${props => props.isUser ? '#ec7211' : '#232f3e'};
`;

const ThinkingIndicator = styled.div`
  align-self: flex-start;
  margin-left: 40px;
  padding: 12px 16px;
  
  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #545b64;
    margin-right: 4px;
    animation: pulse 1.5s infinite ease-in-out;
  }
  
  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .dot:nth-child(3) {
    animation-delay: 0.4s;
    margin-right: 0;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(0.7);
      opacity: 0.5;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const LoginContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
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
  margin-bottom: 10px;
  font-size: 0.9rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #ec7211;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const StylistStep = () => {
  const navigate = useNavigate();
  const { 
    isAuthenticated, 
    isLoading, 
    authToken, 
    username, 
    setUsername, 
    password, 
    setPassword, 
    errorMessage, 
    handleLogin 
  } = useAuth();
  
  const [chatInput, setChatInput] = useState('');
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const chatHistoryRef = useRef(null);
  
  // Auto-scroll to bottom of chat history when new messages are added
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);
  
  // Add welcome message when component mounts and user is authenticated
  useEffect(() => {
    if (isAuthenticated && chatHistory.length === 0) {
      setChatHistory([{
        text: "Hello! I'm your AI stylist powered by Amazon Bedrock. Tell me about your style preferences or the occasion you're dressing for, and I'll provide personalized recommendations.",
        isUser: false
      }]);
    }
  }, [isAuthenticated, chatHistory.length]);
  
  // Redirect to home if not authenticated and not loading
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isLoading, isAuthenticated, navigate]);
  
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const success = await handleLogin(username, password);
    if (success) {
      // Stay on this page as we're already here
    }
  };
  
  const callOutfitsAPI = async (prompt) => {
    try {
      console.log('Calling API with prompt:', prompt);
      console.log('Using auth token:', authToken ? 'Token exists' : 'No token');
      
      const response = await fetch('https://85jzer05hj.execute-api.us-east-1.amazonaws.com/prod/stylist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Allow-Methods': 'POST,OPTIONS,GET'
          },
        body: JSON.stringify({ prompt })
      });
      
      console.log('API response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('API response data:', data);
      
      // Check if the response has the expected structure
      if (data && data.response) {
        return data.response;
      } else {
        console.error('Unexpected API response format:', data);
        return 'I received a response but it was in an unexpected format. Please try again.';
      }
    } catch (error) {
      console.error('Error calling API:', error);
      return `Error: ${error.message}. Please try again later.`;
    }
  };
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!chatInput.trim()) return;
    
    // Add user message to chat history
    const userMessage = chatInput.trim();
    setChatHistory(prev => [...prev, { text: userMessage, isUser: true }]);
    setChatInput('');
    setIsApiLoading(true);
    
    try {
      // Call the API with the user's message
      const response = await callOutfitsAPI(userMessage);

      // Add AI response to chat history
      setChatHistory(prev => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      // Handle API error
      setChatHistory(prev => [...prev, { 
        text: "I'm sorry, I encountered an error processing your request. Please try again later.", 
        isUser: false,
        isError: true
      }]);
      console.error('Error getting response:', error);
    } finally {
      setIsApiLoading(false);
    }
  };
  
  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <p>Loading...</p>
      </LoadingContainer>
    );
  }
  
  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <StepContainer>
        <StepHeader>
          <StepTitle>Sign In to AI Stylist</StepTitle>
          <StepDescription>
            Please sign in with your credentials to access the AI Stylist chat.
          </StepDescription>
        </StepHeader>
        
        <LoginContainer>
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
      </StepContainer>
    );
  }
  
  return (
    <StepContainer>
      <StepHeader>
        <StepTitle>AI Stylist Chat</StepTitle>
        <StepDescription>
          Chat with our AI stylist to get personalized fashion recommendations tailored to your preferences.
        </StepDescription>
      </StepHeader>
      
      <ChatContainer>
        <ChatHistory ref={chatHistoryRef}>
          {/* Chat messages */}
          {chatHistory.map((message, index) => (
            <MessageBubble key={index} isUser={message.isUser}>
              <AvatarContainer isUser={message.isUser}>
                {message.isUser ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="8" r="5" stroke="white" strokeWidth="2" />
                    <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 11C20 15.418 16.418 19 12 19C7.582 19 4 15.418 4 11C4 6.582 7.582 3 12 3C16.418 3 20 6.582 20 11Z" stroke="white" strokeWidth="2" />
                    <path d="M8 11L10.5 13.5L16 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </AvatarContainer>
              <MessageHeader isUser={message.isUser}>{message.isUser ? 'You' : 'AI Stylist'}</MessageHeader>
              {message.text}
            </MessageBubble>
          ))}
          
          {/* Thinking indicator */}
          {isApiLoading && (
            <ThinkingIndicator>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </ThinkingIndicator>
          )}
        </ChatHistory>
        
        <ChatInputContainer>
          <ChatForm onSubmit={handleSubmit}>
            <ChatTextArea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask for style advice..."
              required
              rows={2}
            />
            <SendButton 
              primary 
              type="submit" 
              disabled={isApiLoading || !chatInput.trim()}
            >
              Send
            </SendButton>
          </ChatForm>
        </ChatInputContainer>
      </ChatContainer>
    </StepContainer>
  );
};

export default StylistStep;
