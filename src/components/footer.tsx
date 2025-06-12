import { fetchAllBooks } from "@/lib/api";

export default async function Footer() {
  try {
    const allBooks = await fetchAllBooks();
    return <div>총 {allBooks.length}권의 도서가 있습니다.</div>;
  } catch (error) {
    console.log(error);
    return <div>📚 ONEBITE BOOKS</div>; // 에러 시 간단한 fallback
  }
}
