import { useRouter } from 'next/router';
import Link from 'next/link';
import { ReactNode } from 'react';
import SearchableLayout from '@/components/searchableLayout';
import books from '@/mock/books.json';
import BookItem from '@/components/bookItem';

export default function Search() {
  return (
    <div>
      <h1>검색 페이지</h1>
      {books.map(book => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
