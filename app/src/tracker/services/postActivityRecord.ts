import { ActivityRecord } from './fetchChapterRecords';

export const postActivityRecord = async (
  accessToken: string,
  activityRecord: ActivityRecord,
) => {
  const requestParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',

      Authentication: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(activityRecord),
  };

  fetch('https://api.lvh.me:3003/', requestParams).catch((error: Error) => {
    console.error('❌ Failed to post activity record', error);
    throw error;
  });
};
