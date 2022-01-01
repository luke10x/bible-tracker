import moment from 'moment';
import * as React from 'react';
import { useLocation } from 'react-router';
import { ActivityRecord } from '../services/ActivityRecord';
import { v4 as uuid } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import AuthService from '../../auth/services/authService';
import { AuthContext } from '../../auth/providers/authProvider';
import { User } from 'oidc-client';
import styled from 'styled-components';
import { getAccessTokenProvider } from '../../auth/services/getAccessTokenProvider';
import { postActivityRecord } from '../services/postActivityRecord';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 960px;
  margin: 0 auto;
  padding: 10px;
  .logoutBtn {
    padding: 5px;
  }
`;

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const GoInner: React.FC = () => {
  const query = useQuery();

  const authService: AuthService = useContext(AuthContext);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    authService.getUser().then((user) => {
      if (user === null) {
        // window.location.replace('/');
      } else {
        setUser(user);
      }
      return user;
    });
  }, [user?.id_token]);

  const saveGoParamsAndRedirectToLogin = (c: string, t: string) => {
    // myStorage = window.sessionStorage;
    sessionStorage.setItem('go_c', c);
    sessionStorage.setItem('go_t', t);
    authService.login();
  };

  const c = query.get('c') || '';
  const [book, chapter] = c.split(',');
  const t = query.get('t') || '';
  const [timestamp, duration] = t.split(' '); // the plus turns into space

  const start = moment(parseInt(timestamp) * 1000);
  const end = moment(parseInt(timestamp) * 1000 + parseInt(duration) * 1000);

  const newChapterRecord: ActivityRecord = {
    uuid: uuid(),
    book: book,
    chapter: Number(chapter),
    start: start.toISOString(),
    end: end.toISOString(),
    note: 'Imported from external link',
  };

  const saveRecordAndRedirectToChapter = (record: ActivityRecord) => {
    getAccessTokenProvider(authService)((accessToken: string) => {
      postActivityRecord(accessToken, record).then(() => {
        console.log('yes posted, can redir now');

        window.location.replace(`/bible/${record.book}/${record.chapter}`);
      });
      return Promise.resolve();
    });
  };

  // const isAuthenticated = authService.isAuthenticated();
  console.log({ newChapterRecord });
  return (
    <Wrapper>
      {user && <h3>Hello {user.profile.name},</h3>}
      You are about to add a log for activity record on {book}, chapter{' '}
      {chapter}.
      <br />
      It took time:
      <table>
        <tr>
          <td>from:</td>
          <td>{start.toLocaleString()}</td>
        </tr>
        <tr>
          <td>to:</td>
          <td>{end.toLocaleString()}</td>
        </tr>
      </table>
      {!user && (
        <div>
          But first of all you need to
          <button onClick={() => saveGoParamsAndRedirectToLogin(c, t)}>
            Login
          </button>
        </div>
      )}
      {user && (
        <div>
          <button
            onClick={() => saveRecordAndRedirectToChapter(newChapterRecord)}
          >
            Yes, add this record
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export const Go = GoInner;
