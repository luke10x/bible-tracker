import React from 'react';
import { useParams } from 'react-router';
import { authenticated } from '../../components/auth/authenticated';

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
    </div>
  );
};
export const Chapter = authenticated(ChapterInner);
