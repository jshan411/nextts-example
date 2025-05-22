import { ReactNode } from 'react';
import SearchableLayout from '@/components/searchableLayout';
import BookItem from '@/components/bookItem';
import fetchBooks from '@/lib/fetchBooks';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const q = context.query.q;
  const books = await fetchBooks(q as string);

  return {
    props: {
      books,
    },
  };
};

export default function Search({ books }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
