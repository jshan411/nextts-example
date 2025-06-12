import { use } from "react";
import BookItem from "@/components/bookItem";
import { fetchSearchBooks } from "@/lib/api";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

async function SearchResult({ q }: { q: string }) {
  try {
    // await delay(1500); // 지연 제거
    const books = await fetchSearchBooks(q || "");

    return (
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    );
  } catch (error) {
    console.log(error);
    throw error; // 에러를 다시 던져서 error.tsx가 처리하도록
  }
}

export default function Search({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = use(searchParams);

  return (
    <Suspense key={q} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
