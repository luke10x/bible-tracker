import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { authenticated } from '../../auth/components/authenticated';
import { AuthContext } from '../../auth/providers/authProvider';
import { getAccessTokenProvider } from '../../auth/services/getAccessTokenProvider';
import {
  CountsMap,
  fetchChapterRecordCounts,
} from '../services/fetchChapterRecordCounts';
import { BookInfo, hebrewScriptures, newTestament } from '../structure';

interface PartProps {
  title: string;
  books: BookInfo[];
  counts: CountsMap | undefined;
}

const Chapters = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  .chapter-box {
    flex: 0 0 60px;
    border: 1px solid #ccccff;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background: #e2e5e6;
    &.red {
      background: #a2ffa6;
    }
    &:hover {
      background: #f2f5f6;
    }
    cursor: pointer;

    div {
      height: 50%;
      width: 50%;
      text-align: center;
    }
  }
`;

const Part: React.FC<PartProps> = ({ title, books, counts }: PartProps) => {
  return (
    <div>
      <h2>{title}</h2>
      {books.map((book) => {
        return (
          <section key={book.id}>
            <h3>{book.title}</h3>
            <Chapters>
              {Array.from(Array(book.chapters).keys())
                .map((x) => x + 1)
                .map((ch) => {
                  const lower = book.title.replace(' ', '-').toLowerCase();
                  return (
                    <Link
                      to={`/bible/${lower}/${ch}`}
                      className={
                        'chapter-box' +
                        (counts && counts[`${lower}-${ch}`] > 0 ? ' red' : '')
                      }
                      key={ch}
                    >
                      <div>{ch}</div>
                    </Link>
                  );
                })}
            </Chapters>
          </section>
        );
      })}
    </div>
  );
};

const DashboardInner: React.FC = () => {
  const [counts, setCounts] = useState<CountsMap | undefined>(undefined);
  const authService = useContext(AuthContext);

  useEffect(() => {
    getAccessTokenProvider(authService)((accessToken: string) => {
      return fetchChapterRecordCounts(accessToken).then((cc: CountsMap) => {
        setCounts(cc);
        console.log({ cc });
      });
    });
    return () => {
      setCounts({});
    };
  }, []);
  console.log({ counts });
  return (
    <div>
      <Part
        title="Hebrew Scriptures"
        books={hebrewScriptures}
        counts={counts}
      />
      <Part title="The New Testament" books={newTestament} counts={counts} />
    </div>
  );
};

export const Dashboard = authenticated(DashboardInner);
