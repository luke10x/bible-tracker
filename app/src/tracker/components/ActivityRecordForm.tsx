import React from 'react';
import { authenticated } from '../../components/auth/authenticated';

interface ActivityRecordFormProps {
  book: string;
  chapter: number;
}

const ActivityRecordFormInner: React.FC<ActivityRecordFormProps> = (
  props: ActivityRecordFormProps,
) => {
  const { book, chapter } = props;
  return (
    <div>
      {book}, {chapter}
    </div>
  );
};
export const ActivityRecordForm = authenticated(ActivityRecordFormInner);
