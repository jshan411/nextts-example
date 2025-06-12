import BookItem from "@/components/bookItem";
import indexStyles from "@/app/(with-searchbar)/page.module.css";
import { fetchAllBooks, fetchRandomBooks } from "@/lib/api";
import { delay } from "@/utils/delay";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

async function SelectedBooks() {
  try {
    await delay(5000);
    const selectedBooks = await fetchRandomBooks();
    return (
      <div>
        {selectedBooks.map((book, index) => (
          <BookItem key={book.id} {...book} priority={index === 0} />
        ))}
      </div>
    );
  } catch (error) {
    console.log(error);
    throw error; // 에러를 다시 던져서 error.tsx가 처리하도록
  }
}

// 컴포넌트에서는 분리된 함수 사용
async function AllBooks() {
  console.log("AllBooks 컴포넌트 렌더링됨");
  try {
    await delay(1000);
    console.log("fetchAllBooks 호출 전");
    const allBooks = await fetchAllBooks();
    console.log("fetchAllBooks 호출 후, 책 개수:", allBooks.length);
    return (
      <div>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    );
  } catch (error) {
    console.log(error);
    throw error; // 에러를 다시 던져서 error.tsx가 처리하도록
  }
}

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className={indexStyles.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <SelectedBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={5} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
