import { BookType } from '@/types';

export default async function fetchRandomBooks(): Promise<BookType[]> {
  const url = 'http://localhost:12345/book/random';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch random books');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    return [];
  }
}
