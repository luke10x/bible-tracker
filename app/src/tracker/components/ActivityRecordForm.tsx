import React from 'react';
interface ActivityRecordFormProps {
  book: string;
  chapter: number;
}

export const ActivityRecordForm: React.FC<ActivityRecordFormProps> = (
  props: ActivityRecordFormProps,
) => {
  const { book, chapter } = props;
  return (
    <div>
      {book}, {chapter}
    </div>
  );
};
