type BookTitle = string;


export const isBookTitle = (bookTitle: BookTitle | any) bookTitle is BookTitle {
  const possibleTitles = 
  ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekial', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
  'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'];
}

export interface BookInfo {
  id: number;
  title: string;
  chapters: number;
}

export const hebrewScriptures: BookInfo[] = [
  { id: 1, title: 'Genesis', chapters: 50 },
  { id: 2, title: 'Exodus', chapters: 40 },
  { id: 3, title: 'Leviticus', chapters: 27 },
  { id: 4, title: 'Numbers', chapters: 36 },
  { id: 5, title: 'Deuteronomy', chapters: 34 },
  { id: 6, title: 'Joshua', chapters: 24 },
  { id: 7, title: 'Judges', chapters: 21 },
  { id: 8, title: 'Ruth', chapters: 4 },
  { id: 9, title: '1 Samuel', chapters: 31 },
  { id: 10, title: '2 Samuel', chapters: 24 },
  { id: 11, title: '1 Kings', chapters: 22 },
  { id: 12, title: '2 Kings', chapters: 25 },
  { id: 13, title: '1 Chronicles', chapters: 29 },
  { id: 14, title: '2 Chronicles', chapters: 36 },
  { id: 15, title: 'Ezra', chapters: 10 },
  { id: 16, title: 'Nehemiah', chapters: 13 },
  { id: 17, title: 'Esther', chapters: 10 },
  { id: 18, title: 'Job', chapters: 42 },
  { id: 19, title: 'Psalms', chapters: 150 },
  { id: 20, title: 'Proverbs', chapters: 31 },
  { id: 21, title: 'Ecclesiastes', chapters: 12 },
  { id: 22, title: 'Song of Solomon', chapters: 8 },
  { id: 23, title: 'Isaiah', chapters: 66 },
  { id: 24, title: 'Jeremiah', chapters: 52 },
  { id: 25, title: 'Lamentations', chapters: 5 },
  { id: 26, title: 'Ezekial', chapters: 48 },
  { id: 27, title: 'Daniel', chapters: 12 },
  { id: 28, title: 'Hosea', chapters: 14 },
  { id: 29, title: 'Joel', chapters: 3 },
  { id: 30, title: 'Amos', chapters: 9 },
  { id: 31, title: 'Obadiah', chapters: 1 },
  { id: 32, title: 'Jonah', chapters: 4 },
  { id: 33, title: 'Micah', chapters: 7 },
  { id: 34, title: 'Nahum', chapters: 3 },
  { id: 35, title: 'Habakkuk', chapters: 3 },
  { id: 36, title: 'Zephaniah', chapters: 3 },
  { id: 37, title: 'Haggai', chapters: 2 },
  { id: 38, title: 'Zechariah', chapters: 14 },
  { id: 39, title: 'Malachi', chapters: 4 },
];

export const newTestament: BookInfo[] = [
  { id: 40, title: 'Matthew', chapters: 28 },
  { id: 41, title: 'Mark', chapters: 16 },
  { id: 42, title: 'Luke', chapters: 24 },
  { id: 43, title: 'John', chapters: 21 },
  { id: 44, title: 'Acts', chapters: 28 },
  { id: 45, title: 'Romans', chapters: 16 },
  { id: 46, title: '1 Corinthians', chapters: 16 },
  { id: 47, title: '2 Corinthians', chapters: 13 },
  { id: 48, title: 'Galatians', chapters: 6 },
  { id: 49, title: 'Ephesians', chapters: 6 },
  { id: 50, title: 'Philippians', chapters: 4 },
  { id: 51, title: 'Colossians', chapters: 4 },
  { id: 52, title: '1 Thessalonians', chapters: 5 },
  { id: 53, title: '2 Thessalonians', chapters: 3 },
  { id: 54, title: '1 Timothy', chapters: 6 },
  { id: 55, title: '2 Timothy', chapters: 4 },
  { id: 56, title: 'Titus', chapters: 3 },
  { id: 57, title: 'Philemon', chapters: 1 },
  { id: 58, title: 'Hebrews', chapters: 13 },
  { id: 59, title: 'James', chapters: 5 },
  { id: 60, title: '1 Peter', chapters: 5 },
  { id: 61, title: '2 Peter', chapters: 3 },
  { id: 62, title: '1 John', chapters: 5 },
  { id: 63, title: '2 John', chapters: 1 },
  { id: 64, title: '3 John', chapters: 1 },
  { id: 65, title: 'Jude', chapters: 1 },
  { id: 66, title: 'Revelation', chapters: 22 },
];
