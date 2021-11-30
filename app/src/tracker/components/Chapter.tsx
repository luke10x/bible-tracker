import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { authenticated } from '../../auth/components/authenticated';
import { AuthContext } from '../../auth/providers/authProvider';
import { getAccessTokenProvider } from '../../auth/services/getAccessTokenProvider';
import { ActivityRecord } from '../services/ActivityRecord';
import { fetchChapterRecords } from '../services/fetchChapterRecords';
import { postActivityRecord } from '../services/postActivityRecord';
import { v4 as uuid } from 'uuid';

import {
  BookTitle,
  getBookTitleFromSlug,
  getChapterFromSlug,
} from '../structure';
import {
  ActivityRecordForm,
  ActivityRecordFormState,
} from './ActivityRecordForm';
import styled from 'styled-components';
import moment from 'moment';
import { deleteActivityRecord } from '../services/deleteActivityRecord';

interface ChapterParams {
  book?: string;
  chapter?: number;
}

const Notes = styled.div`
  > div {
    display: flex;
    flex-wrap: wrap;
    .date {
      flex: 0 1;
      background: lightblue;
      padding: 3px;
      border-radius: 6px;
      white-space: nowrap;
    }
    .separator {
      flex: 0 1;
      padding: 3px;
    }
    .actions {
      flex: 1 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      button {
        color: red;
        flex: 0 1 30px;
        display: inline;
        max-width: 200px;
      }
    }
    > div {
      width: 100%;
      padding: 10px 0 0 0;
    }
    border-bottom: 1px solid lightgrey;
    border-radius: 3px;
    margin: 10px 0;
    padding: 5px;
  }
`;

const ChapterInner: React.FC = () => {
  const { book: bookParam, chapter: chapterParam } =
    useParams() as ChapterParams;

  const book: BookTitle = getBookTitleFromSlug(bookParam);
  const chapter: number = getChapterFromSlug(chapterParam, book);

  const [chapterRecords, setChapterRecords] = useState<ActivityRecord[]>([]);
  const [underDeletion, setUnderDeletion] = useState<string | undefined>(
    undefined,
  );

  const authService = useContext(AuthContext);
  useEffect(() => {
    getAccessTokenProvider(authService)((accessToken: string) => {
      return fetchChapterRecords(accessToken, {
        book: bookParam || '',
        chapter: chapter,
      }).then((chapterRecords: ActivityRecord[]) => {
        setChapterRecords(chapterRecords);
        console.log({ chapterRecords });
      });
    });
    return () => {
      setChapterRecords([]);
    };
  }, [underDeletion]);

  const handleActivitySave = (arfs: ActivityRecordFormState) => {
    const newChapterRecord: ActivityRecord = {
      uuid: uuid(),
      book: bookParam || '',
      chapter,
      start: arfs.start.toISOString(),
      end: arfs.end.toISOString(),
      note: arfs.note,
    };
    setChapterRecords([...chapterRecords, newChapterRecord]);

    getAccessTokenProvider(authService)((accessToken: string) => {
      postActivityRecord(accessToken, newChapterRecord);
      return Promise.resolve();
    });
  };

  const handleActivityDelete = (uuid: string) => {
    getAccessTokenProvider(authService)((accessToken: string) => {
      deleteActivityRecord(accessToken, uuid);
      setUnderDeletion(uuid);
      return Promise.resolve();
    }).then(() => setUnderDeletion(undefined));
  };

  return (
    <div>
      <h2>
        {book}, {chapter}
      </h2>
      {chapterRecords.length === 0 && (
        <div>No records for this chapter so far...</div>
      )}
      <Notes>
        {chapterRecords.map((ar: ActivityRecord, i: number) => (
          <div key={i}>
            <span className="date">
              {moment(ar.start).format('MM/DD/YYYY h:mm A')}
            </span>
            <span className="separator">-</span>
            <span className="date">
              {moment(ar.end).format('MM/DD/YYYY h:mm A')}
            </span>{' '}
            <span className="actions">
              {underDeletion != ar.uuid && (
                <button
                  className="actions"
                  onClick={() => handleActivityDelete(ar.uuid)}
                >
                  Delete
                </button>
              )}
            </span>
            <div>{ar.note}</div>
          </div>
        ))}
      </Notes>

      <ActivityRecordForm
        book={book}
        chapter={chapter}
        onSave={handleActivitySave}
      />
    </div>
  );
};

export const Chapter = authenticated(ChapterInner);
