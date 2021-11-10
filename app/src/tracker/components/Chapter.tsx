import React from 'react';
import { useParams } from 'react-router';
import { authenticated } from '../../components/auth/authenticated';
import {
  BookTitle,
  getBookTitleFromSlug,
  getChapterFromSlug,
} from '../structure';
import { ActivityRecordForm } from './ActivityRecordForm';

interface ChapterParams {
  book?: string;
  chapter?: number;
}

const ChapterInner: React.FC = () => {
  const { book: bookParam, chapter: chapterParam } =
    useParams() as ChapterParams;

  const book: BookTitle = getBookTitleFromSlug(bookParam);
  const chapter: number = getChapterFromSlug(chapterParam, book);

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
