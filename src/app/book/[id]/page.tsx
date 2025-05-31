import bookStyles from "@/app/book/[id]/page.module.css";
import Image from "next/image";
import { fetchRandomBooks, fetchBookById } from "@/lib/api";
import { notFound } from "next/navigation";

// 자주 접근하는 주요 책 ID에 대해 빌드 시 정적 생성
export async function generateStaticParams() {
  try {
    const books = await fetchRandomBooks();
    return books.map((book) => ({
      id: book.id.toString(),
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;

  try {
    // api.ts의 fetchBookById 함수 사용
    const book = await fetchBookById(id);
    const { title, subTitle, description, author, publisher, coverImgUrl } =
      book;

    return (
      <div className={bookStyles.container}>
        <div
          className={bookStyles.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <Image
            src={coverImgUrl}
            alt={`${title} 표지 이미지`}
            width={300}
            height={450}
            priority
          />
        </div>
        <div className={bookStyles.title}>{title}</div>
        <div className={bookStyles.subTitle}>{subTitle}</div>
        <div className={bookStyles.author}>
          {author} | {publisher}
        </div>
        <div className={bookStyles.description}>{description}</div>
      </div>
    );
  } catch {
    notFound();
  }
}
