export const deleteActivityRecord = async (
  accessToken: string,
  uuid: string,
) => {
  const requestParams = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${accessToken}`,
    },
  };

  fetch(`https://api.lvh.me:3003/${uuid}`, requestParams).catch(
    (error: Error) => {
      console.error('❌ Failed to delete activity record', error);
      throw error;
    },
  );
};
