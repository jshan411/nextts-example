import { BookType } from "@/types";

// 모든 책 데이터 가져오기
export async function fetchAllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const books: BookType[] = await response.json();
  return books;
}

// 랜덤 책 데이터 가져오기
export async function fetchRandomBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch random books");
  }

  const books: BookType[] = await response.json();
  return books;
}

// ID로 특정 책 가져오기
export async function fetchBookById(id: string | string[]) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
    {
      next: {
        revalidate: 3600, // 1시간마다 재검증
        tags: [`book-${id}`], // 책별로 캐시 태그 지정
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch book with id ${id}`);
  }

  const book: BookType = await response.json();
  return book;
}

// 검색어로 책 검색하기
export async function fetchSearchBooks(query: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${query}`,
    {
      next: {
        revalidate: 60, // 검색 결과는 60초 동안 캐시
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to search books with query: ${query}`);
  }

  const books: BookType[] = await response.json();
  return books;
} 