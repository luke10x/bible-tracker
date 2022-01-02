import { Constants } from '../../helpers/Constants';
import { ActivityRecord } from './ActivityRecord';

export interface CountsMap {
  [key: string]: number;
}

export const fetchChapterRecordCounts = async (accessToken: string) => {
  const requestParams = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await fetch(`${Constants.apiRoot}/`, requestParams).catch(
    (error: Error) => {
      console.error('❌ Failed to fetch', error);
      throw error;
    },
  );

  const body = await response.json().catch((error: Error) => {
    console.error('❌ Failed to parse JSON', error);
    throw error;
  });

  return body.reduce((acc: CountsMap, each: ActivityRecord) => {
    const key = `${each.book}-${each.chapter}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
};
