export interface FetchChapterRecordsRequest {
  book: string;
  chapter: number;
}
export interface ActivityRecord {
  book: string;
  chapter: number;
  note: string;
  start: string;
  end: string;
}

export const fetchChapterRecords = async (
  accessToken: string,
  request: FetchChapterRecordsRequest,
) => {
  const requestParams = {
    headers: {
      Authentication: `Bearer ${accessToken}`,
    },
  };

  const response = await fetch('https://api.lvh.me:3003/', requestParams).catch(
    (error: Error) => {
      console.error('❌ Failed to fetch', error);
      throw error;
    },
  );

  const body = await response.json().catch((error: Error) => {
    console.error('❌ Failed to parse JSON', error);
    throw error;
  });

  const chapterActivityRecords = body.filter((each: ActivityRecord) => {
    return each.book == request.book && each.chapter == request.chapter;
  });

  return chapterActivityRecords;
};
