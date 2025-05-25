import indexStyles from '@/pages/index.module.css';
import SearchableLayout from '@/components/searchableLayout';
import { ReactNode, useEffect } from 'react';
import books from '@/mock/books.json';
import BookItem from '@/components/bookItem';
import { InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetchBooks';
import fetchRandomBooks from '@/lib/fetchRandomBooks';

export const getServerSideProps = async () => {
  const [allBooks, recommendedBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

  return {
    props: {
      allBooks,
      recommendedBooks,
    },
  };
};

export default function Home({ allBooks, recommendedBooks }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={indexStyles.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recommendedBooks.map(book => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map(book => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
