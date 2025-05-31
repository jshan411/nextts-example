import BookItem from "@/components/bookItem";
import indexStyles from "@/app/(with-searchbar)/page.module.css";
import { BookType } from "@/types";

// 데이터 페칭 로직을 별도 함수로 분리
async function fetchAllBooks() {
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

// 컴포넌트에서는 분리된 함수 사용
async function AllBooks() {
  try {
    const allBooks = await fetchAllBooks();
    return (
      <div>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    );
  } catch {
    return <div>Failed to fetch books</div>;
  }
}

// Footer 컴포넌트도 같은 함수 사용 가능
async function Footer() {
  try {
    const allBooks = await fetchAllBooks();
    return <div>총 {allBooks.length}권의 도서가 있습니다.</div>;
  } catch {
    return <div>도서 정보를 불러올 수 없습니다.</div>;
  }
}

async function SelectedBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  if (!response.ok) {
    return <div>Failed to fetch books</div>;
  }
  const selectedBooks: BookType[] = await response.json();
  return (
    <div>
      {selectedBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={indexStyles.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <SelectedBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
