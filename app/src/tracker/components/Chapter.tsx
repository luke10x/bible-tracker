import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { authenticated } from '../../components/auth/authenticated';
import { AuthContext } from '../../providers/authProvider';
import { AuthenticatedService } from '../../services/AuthenticatedService';
import {
  ActivityRecord,
  fetchChapterRecords,
  FetchChapterRecordsRequest,
} from '../services/fetchChapterRecords';
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

  const [chapterRecords, setChapterRecords] = useState<ActivityRecord[]>([]);

  const authService = useContext(AuthContext);
  useEffect(() => {
    const authenticatedService = new AuthenticatedService<
      FetchChapterRecordsRequest,
      ActivityRecord[]
    >(authService, fetchChapterRecords);
    console.log({ authenticatedService });

    authenticatedService
      .callWithAccessToken({
        book: bookParam || '',
        chapter: chapter,
      })
      .then((chapterRecords) => {
        setChapterRecords(chapterRecords as ActivityRecord[]);
        console.log({ chapterRecords });
      });
  }, []);

  return (
    <div>
      <h2>
        {book}, {chapter}
      </h2>
      {chapterRecords.map((ar: ActivityRecord, i: number) => (
        <div key={i}>
          {ar.start} - {ar.end} {ar.note}
        </div>
      ))}

      <ActivityRecordForm book={book} chapter={chapter} />
    </div>
  );
};

export const Chapter = authenticated(ChapterInner);
