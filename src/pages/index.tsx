import indexStyles from '@/pages/index.module.css';
import SearchableLayout from '@/components/searchableLayout';
import { ReactNode } from 'react';
import BookItem from '@/components/bookItem';
import { InferGetStaticPropsType } from 'next';
import fetchBooks from '@/lib/fetchBooks';
import fetchRandomBooks from '@/lib/fetchRandomBooks';
import Head from 'next/head';

export const getStaticProps = async () => {
  const [allBooks, recommendedBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

  return {
    props: {
      allBooks,
      recommendedBooks,
    },
  };
};

export default function Home({ allBooks, recommendedBooks }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>테스트 도서 목록</title>
        <meta property="og:title" content="테스트 도서 목록" />
        <meta property="og:description" content="테스트 도서 목록입니다." />
        <meta property="og:image" content="https://aoroawebstorage.blob.core.windows.net/images/alind.png" />
      </Head>
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
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
