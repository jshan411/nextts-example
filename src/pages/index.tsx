import indexStyles from '@/pages/index.module.css';
import SearchableLayout from '@/components/searchableLayout';
import { ReactNode } from 'react';
import books from '@/mock/books.json';
import BookItem from '@/components/bookItem';

export const getServerSideProps = () => {
  // 컴포넌트 보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
  // 서버측에서만 실행됨 -> 브라우저에만 기능하는 window 객체 등은 사용 불가
  console.log('서버 터미널에서만 출력됨');
  const data = 'hello';

  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }: { data: string }) {
  // 최초 사전렌더링 시에 서버측 터미널에서 한번 출력됨
  // 이후, javascript bundle 이 브라우저에 전달되고, 브라우저에서 "/"에 접속할 때 마다 브라우저에서 실행됨
  console.log(data);

  return (
    <div className={indexStyles.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map(book => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map(book => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
