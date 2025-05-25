import { ReactNode, useState } from 'react';
import { useEffect } from 'react';
import SearchableLayout from '@/components/searchableLayout';
import BookItem from '@/components/bookItem';
import fetchBooks from '@/lib/fetchBooks';
import { useRouter } from 'next/router';
import { BookType } from '@/types';

// // getStaticProps 함수는 빌드 시 실행된다 -> 빌드 시점에 쿼리 파라메터를 알 수 없음.
// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);

//   return {
//     props: {
//       books,
//     },
//   };
// };

export default function Search() {
  const router = useRouter();
  const q = router.query.q;

  const [books, setBooks] = useState<BookType[]>([]);

  const fetchedBooks = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchedBooks();
    }
  }, [q, router]);

  return (
    <div>
      {books.map(book => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
