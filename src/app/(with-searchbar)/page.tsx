import BookItem from "@/components/bookItem";
import indexStyles from "@/app/(with-searchbar)/page.module.css";
import { fetchAllBooks, fetchRandomBooks } from "@/lib/api";

async function SelectedBooks() {
  try {
    const selectedBooks = await fetchRandomBooks();
    return (
      <div>
        {selectedBooks.map((book, index) => (
          <BookItem
            key={book.id}
            {...book}
            priority={index < 3} // 첫 3개 이미지에만 priority 적용
          />
        ))}
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>Failed to fetch books</div>;
  }
}

// 컴포넌트에서는 분리된 함수 사용
async function AllBooks() {
  try {
    const allBooks = await fetchAllBooks();
    return (
      <div>
        {allBooks.map((book, index) => (
          <BookItem
            key={book.id}
            {...book}
            priority={index < 2} // 첫 2개 이미지에만 priority 적용
          />
        ))}
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>Failed to fetch books</div>;
  }
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
    </div>
  );
}
