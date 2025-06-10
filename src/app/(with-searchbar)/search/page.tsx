import BookItem from "@/components/bookItem";
import { fetchSearchBooks } from "@/lib/api";
import { delay } from "@/utils/delay";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  try {
    await delay(1500);
    const books = await fetchSearchBooks(q || "");

    return (
      <div>
        {books.map((book, index) => (
          <BookItem key={book.id} {...book} priority={index < 2} />
        ))}
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>검색 결과를 가져오는데 실패했습니다.</div>;
  }
}
