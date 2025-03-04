import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.background || '#ffffff'};
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const AppLayout = ({ children, background }) => {
  return (
    <LayoutContainer background={background} data-testid="app-layout">
      <Navbar />
      <Content data-testid="app-layout-content">
        {children}
      </Content>
      <Footer />
    </LayoutContainer>
  );
};

export default AppLayout;
