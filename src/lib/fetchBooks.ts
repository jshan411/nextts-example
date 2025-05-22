import { BookType } from "@/types";


export default async function fetchBooks(): Promise<BookType[]> {
  const url = 'http://localhost:12345/book'

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

