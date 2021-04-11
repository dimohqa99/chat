import React from 'react';
import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import styled from 'styled-components';
import { Route } from 'react-router';
import { MessageInput } from '../components/MessageInput';
import { MessageList } from './MessageList';

const StyledLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`;

export const Chat = () => (
  <Route path="/(chat|search|friends)/:id">
    <StyledLayout>
      <Header />
      <MessageList />
      <MessageInput />
    </StyledLayout>
  </Route>
);