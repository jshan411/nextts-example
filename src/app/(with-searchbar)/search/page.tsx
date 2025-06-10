import { use } from "react";
import BookItem from "@/components/bookItem";
import { fetchSearchBooks } from "@/lib/api";
import { delay } from "@/utils/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  try {
    await delay(1500);
    const books = await fetchSearchBooks(q || "");

    return (
      <div>
        {books.map((book, index) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>검색 결과를 가져오는데 실패했습니다.</div>;
  }
}

export default function Search({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = use(searchParams);

  return (
    <Suspense key={q} fallback={<div>Loading...</div>}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
