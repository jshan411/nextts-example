import BookItem from "@/components/bookItem";
import { fetchSearchBooks } from "@/lib/api";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  try {
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
    return <div>검색 결과를 가져오는데 실패했습니다.</div>;
  }
}
