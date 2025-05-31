import bookStyles from "@/app/book/[id]/page.module.css";
import { BookType } from "@/types";
import Image from "next/image";

// 자주 접근하는 주요 책 ID에 대해 빌드 시 정적 생성
export async function generateStaticParams() {
  try {
    // 메인 페이지에 표시되는 책들을 정적으로 생성
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
      { next: { revalidate: 3600 } } // 1시간마다 재검증
    );

    if (!response.ok) return [];

    const books: BookType[] = await response.json();
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

  // 캐시 태그를 사용하여 특정 책만 재검증할 수 있도록 함
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
    {
      next: {
        revalidate: 3600, // 1시간마다 재검증
        tags: [`book-${id}`], // 책별로 캐시 태그 지정
      },
    }
  );

  if (!response.ok) {
    return <div>Failed to fetch book</div>;
  }

  const book: BookType = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

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
}
