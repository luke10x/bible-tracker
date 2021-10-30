import React from 'react';
import styled from 'styled-components';

import backSvg from './icon-back.svg';
import dateSvg from './icon-date.svg';
import doneSvg from './icon-done.svg';
import forwardSvg from './icon-forward.svg';
import forwardKillSvg from './icon-forward-kill.svg';
import forwardDoneSvg from './icon-forward-done.svg';
import killSvg from './icon-kill.svg';
import noteSvg from './icon-note.svg';
import taskSvg from './icon-task.svg';

const Icon = styled.img`
  border: 1px solid lightgrey;
  width: 36px;
`;

export const BackIcon = (props: any) => <Icon src={backSvg} alt="task" />;
export const DateIcon = (props: any) => <Icon src={dateSvg} alt="task" />;
export const DoneIcon = (props: any) => <Icon src={doneSvg} alt="task" />;
export const ForwardIcon = (props: any) => <Icon src={forwardSvg} alt="task" />;
export const ForwardDoneIcon = (props: any) => (
  <Icon src={forwardDoneSvg} alt="task" />
);
export const ForwardKillIcon = (props: any) => (
  <Icon src={forwardKillSvg} alt="task" />
);
export const KillIcon = (props: any) => <Icon src={killSvg} alt="task" />;
export const NoteIcon = (props: any) => <Icon src={noteSvg} alt="note" />;
export const TaskIcon = (props: any) => <Icon src={taskSvg} alt="task" />;
