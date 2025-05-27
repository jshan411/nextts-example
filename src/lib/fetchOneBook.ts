import { BookType } from '@/types';

export default async function fetchOneBooks(id: number): Promise<BookType | null> {
  const url = `https://onebite-books-server-brown-xi.vercel.app/book/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    return null;
  }
}
