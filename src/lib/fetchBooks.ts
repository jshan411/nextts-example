import { BookType } from '@/types';

export default async function fetchBooks(q?: string): Promise<BookType[]> {
  let url = 'https://onebite-books-server-brown-xi.vercel.app/book';

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
    return [];
  }
}
