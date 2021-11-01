import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { NewTaskForm } from './NewTaskForm';
import { TaskList } from './TaskList';
import { TaskProvider } from './TaskContext';
import { authenticated } from '../auth/authenticated';
import { DailyHeader } from './headers';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Content = styled.div`
  flex: 1 0 auto;
`;
const Footer = styled.div`
  flex-shrink: 0;
  overflow: hidden; // Otherwise it somehow add to scroll
`;

export const Inner: React.FC = () => {
  const today = moment();
  const [activeDay] = useState<moment.Moment>(today);

  return (
    <TaskProvider>
      <Wrapper>
        <Content>
          <DailyHeader />
          <TaskList activeDay={activeDay} />
        </Content>
        <Footer>
          <NewTaskForm />
        </Footer>
      </Wrapper>
    </TaskProvider>
  );
};

export const Tasks = authenticated(Inner);
