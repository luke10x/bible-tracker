import { Constants } from '../../helpers/Constants';

export const deleteActivityRecord = async (
  accessToken: string,
  uuid: string,
) => {
  const requestParams = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  await fetch(`${Constants.apiRoot}/${uuid}`, requestParams).catch(
    (error: Error) => {
      console.error('❌ Failed to delete activity record', error);
      throw error;
    },
  );
};
