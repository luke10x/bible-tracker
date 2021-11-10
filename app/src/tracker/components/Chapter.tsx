import React from 'react';
import { useParams } from 'react-router';
import { authenticated } from '../../components/auth/authenticated';
import { BookTitle, isBookTitle, isChapterInABook } from '../structure';
import { ActivityRecordForm } from './ActivityRecordForm';

interface ChapterParams {
  book?: string;
  chapter?: number;
}

const ChapterInner: React.FC = () => {
  const { book: bookParam, chapter: chapterParam } =
    useParams() as ChapterParams;

  if (!isBookTitle(bookParam)) {
    throw new Error('There is not such book title:${bookParam}');
  }

  const book: BookTitle = bookParam;

  if (!isChapterInABook(chapterParam, bookParam)) {
    throw new Error(`Book "${book}" has no such chapter: ${chapterParam}`);
  }

  const chapter: number = chapterParam;

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
