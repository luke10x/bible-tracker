import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { NewTaskForm } from './NewTaskForm';
import { TaskList } from './TaskList';
import { TaskProvider } from './TaskContext';
import { authenticated } from '../auth/authenticated';
import { DailyHeader, SectionHeader } from './headers';

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
  const [activeDay, setActiveDay] = useState<moment.Moment>(today);

  const handleDaySelect = (selectedDay: moment.Moment) => {
    setActiveDay(
      selectedDay.clone().set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      }),
    );
  };

  return (
    <TaskProvider>
      <Wrapper>
        <Content>
          <DailyHeader activeDay={activeDay} onDaySelect={handleDaySelect} />
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
