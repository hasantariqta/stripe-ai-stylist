import React, { createContext, useState, useEffect, useContext } from 'react';
import { Amplify } from 'aws-amplify';
import { signIn, signOut, fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';

// Configure Amplify with your Cognito information
Amplify.configure({
  Auth: {
    Cognito: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_sKNccomdK',
      userPoolClientId: 'nse7mh20ihsghrqri1ellpgg3',
    }
  },
  API: {
    REST: {
      outfitsApi: {
        endpoint: 'https://85jzer05hj.execute-api.us-east-1.amazonaws.com/prod',
        region: 'us-east-1'
      }
    }
  }
});

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      // Get current authenticated user
      await getCurrentUser();
      
      // Get current session including tokens
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();
      
      if (idToken) {
        setAuthToken(idToken);
        setIsAuthenticated(true);
      } else {
        throw new Error('No valid token found');
      }
    } catch (error) {
      console.log('User is not authenticated', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (usernameInput, passwordInput) => {
    setErrorMessage('');
    setIsLoading(true);
    
    console.log('Attempting to sign in with:', { username: usernameInput }); // Don't log passwords
    
    try {
      // Sign in the user with the provided credentials
      console.log('Calling signIn...');
      const signInOutput = await signIn({
        username: usernameInput,
        password: passwordInput,
      });
      
      console.log('Sign in response:', signInOutput);
      
      // Check if sign in was successful
      if (signInOutput) {
        try {
          console.log('Fetching auth session...');
          // Get session including tokens
          const session = await fetchAuthSession();
          console.log('Session fetched:', session);
          
          const idToken = session.tokens?.idToken?.toString();
          
          if (idToken) {
            console.log('Token obtained successfully');
            setAuthToken(idToken);
            setIsAuthenticated(true);
            return true;
          } else {
            console.error('No ID token found in session');
            throw new Error('No valid token found after sign in');
          }
        } catch (sessionError) {
          console.error('Error fetching session after sign in:', sessionError);
          throw sessionError;
        }
      } else {
        console.error('Sign in returned no output');
        throw new Error('Sign in returned no output');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      console.error('Error details:', { name: error.name, message: error.message });
      
      // Provide more specific error messages based on error type
      if (error.name === 'UserNotConfirmedException') {
        setErrorMessage('Account not confirmed. Please check your email for a confirmation link.');
      } else if (error.name === 'NotAuthorizedException') {
        setErrorMessage('Incorrect username or password.');
      } else if (error.name === 'UserNotFoundException') {
        setErrorMessage('User does not exist.');
      } else {
        setErrorMessage(error.message || 'Failed to sign in. Please check your credentials and try again.');
      }
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleLogout = async () => {
    try {
      await signOut();
      setAuthToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    authToken,
    isAuthenticated,
    isLoading,
    username,
    setUsername,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
    handleLogin,
    handleLogout,
    checkAuthStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
