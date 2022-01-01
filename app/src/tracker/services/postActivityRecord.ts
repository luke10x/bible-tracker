import { Constants } from '../../helpers/Constants';
import { ActivityRecord } from './ActivityRecord';

export const postActivityRecord = async (
  accessToken: string,
  activityRecord: ActivityRecord,
) => {
  const requestParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',

      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(activityRecord),
  };

  await fetch(`${Constants.apiRoot}/`, requestParams).catch((error: Error) => {
    console.error('❌ Failed to post activity record', error);
    throw error;
  });
};
