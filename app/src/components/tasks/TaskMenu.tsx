import React from 'react';
import styled from 'styled-components';
import { TaskStatus } from './types';

interface TaskMenuProps {
  taskStatus: TaskStatus;
  onMenuCommand: (taskState: string) => void;
}

export const TaskMenu = (props: TaskMenuProps) => {
  return <span>menue</span>;
};
