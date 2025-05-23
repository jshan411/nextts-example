import { BookType } from '@/types';

export default async function fetchBooks(q?: string): Promise<BookType[]> {
  let url = 'http://localhost:12345/book';

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
