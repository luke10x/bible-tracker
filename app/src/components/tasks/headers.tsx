import React, { useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { TaskContext } from './TaskContext';

export const SectionHeader = styled.div`
  padding: 24px 10px 0 10px;
  .ant-page-header-heading {
    border-bottom: 4px solid red;
  }
`;

const getDateDiffLabel = (dateDiff: number) => {
  switch (true) {
    case dateDiff < -1:
      return `${-dateDiff} days ago`;
    case dateDiff === -1:
      return 'Yesterday';
    case dateDiff === 0:
      return 'Today';
    case dateDiff === 1:
      return 'Tomorrow';
    case dateDiff > 1:
      return `${dateDiff} days ahead`;
  }
};

interface DailyHeaderProps {
  defaultDayValue: moment.Moment;
  onDaySelect: (date: moment.Moment) => void;
  activeDay: string;
}

export const DailyHeader = (props: any) => {
  const activeMoment = moment(props.activeDay);
  const { dateDiff } = useContext(TaskContext);
  return <span>some header</span>;
};
