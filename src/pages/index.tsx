import indexStyles from '@/pages/index.module.css';
import SearchableLayout from '@/components/searchableLayout';
import { ReactNode } from 'react';
import BookItem from '@/components/bookItem';
import { InferGetStaticPropsType } from 'next';
import fetchBooks from '@/lib/fetchBooks';
import fetchRandomBooks from '@/lib/fetchRandomBooks';

export const getStaticProps = async () => {
  console.log('getStaticProps');

  const [allBooks, recommendedBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

  return {
    props: {
      allBooks,
      recommendedBooks,
    },
    revalidate: 10, // ISR 방식으로 10초마다 데이터 갱신
    // 스케줄러 타입의 화면에 적용하기 좋은 렌더링 방식
  };
};

export default function Home({ allBooks, recommendedBooks }: InferGetStaticPropsType<typeof getStaticProps>) {
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
