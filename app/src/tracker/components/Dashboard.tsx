import React from 'react';
import styled from 'styled-components';
import { authenticated } from '../../components/auth/authenticated';
import { BookInfo, hebrewScriptures, newTestament } from '../structure';

interface PartProps {
  title: string;
  books: BookInfo[];
}

const Chapters = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  .chapter-box {
    flex: 0 0 60px;
    border: 1px solid blue;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background: #e2e5e6;
    div {
      height: 50%;
      width: 50%;
      text-align: center;
    }
  }
`;

const Part: React.FC<PartProps> = ({ title, books }: PartProps) => {
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
                .map((ch) => (
                  <div className="chapter-box" key={ch}>
                    <div>{ch}</div>
                  </div>
                ))}
            </Chapters>
          </section>
        );
      })}
    </div>
  );
};

const DashboardInner: React.FC = () => {
  // console.log({ books });
  return (
    <div>
      <Part title="Hebrew Scriptures" books={hebrewScriptures} />
      <Part title="The New Testament" books={newTestament} />
    </div>
  );
};

export const Dashboard = authenticated(DashboardInner);
