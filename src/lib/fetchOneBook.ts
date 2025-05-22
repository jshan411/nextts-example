import { BookType } from "@/types";

export default async function fetchOneBooks(id: number): Promise<BookType | null> {
  let url = `http://localhost:12345/book/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
