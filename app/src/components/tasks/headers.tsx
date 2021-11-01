import React from 'react';
import styled from 'styled-components';

export const SectionHeader = styled.div`
  padding: 24px 10px 0 10px;
  .ant-page-header-heading {
    border-bottom: 4px solid red;
  }
`;

export const DailyHeader: React.FC = () => {
  return <span>some header</span>;
};
