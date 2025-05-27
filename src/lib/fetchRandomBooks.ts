import { BookType } from '@/types';

export default async function fetchRandomBooks(): Promise<BookType[]> {
  const url = 'https://onebite-books-server-brown-xi.vercel.app/book/random';

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
