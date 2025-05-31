import { fetchAllBooks } from "@/lib/api";

export default async function Footer() {
  try {
    const allBooks = await fetchAllBooks();
    return <div>총 {allBooks.length}권의 도서가 있습니다.</div>;
  } catch (error) {
    console.log(error);
    return <div>도서 정보를 불러올 수 없습니다.</div>;
  }
}
