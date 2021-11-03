import React from 'react';
import { useParams } from 'react-router';
import { authenticated } from '../../components/auth/authenticated';
import { ActivityRecordForm } from './ActivityRecordForm';

interface ChapterParams {
  book?: string;
  chapter?: number;
}

const ChapterInner: React.FC = () => {
  const { book, chapter } = useParams() as ChapterParams;

  return (
    <div>
      <h2>
        {book}, {chapter}
      </h2>
      <ActivityRecordForm book={book} chapter={chapter} />
    </div>
  );
};
export const Chapter = authenticated(ChapterInner);
