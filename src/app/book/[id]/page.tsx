import bookStyles from "@/app/book/[id]/page.module.css";
import Image from "next/image";
import { fetchRandomBooks, fetchBookById } from "@/lib/api";
import { notFound } from "next/navigation";
import { use } from "react";

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

async function BookDetail({ id }: { id: string }) {
  try {
    // api.ts의 fetchBookById 함수 사용
    const book = await fetchBookById(id);
    const { title, subTitle, description, author, publisher, coverImgUrl } =
      book;

    return (
      <section>
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
            style={{
              width: "auto",
              height: "auto",
              maxHeight: "350px",
              objectFit: "contain",
            }}
          />
        </div>
        <div className={bookStyles.title}>{title}</div>
        <div className={bookStyles.subTitle}>{subTitle}</div>
        <div className={bookStyles.author}>
          {author} | {publisher}
        </div>
        <div className={bookStyles.description}>{description}</div>
      </section>
    );
  } catch {
    notFound();
  }
}

function ReviewEditor() {
  async function createReviewAction(formData: FormData) {
    "use server";
    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();
    console.log(content, author);
  }

  return (
    <section>
      <form action={createReviewAction}>
        <input name="content" placeholder="리뷰 내용" />
        <input name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className={bookStyles.container}>
      <BookDetail id={id} />
      <ReviewEditor />
    </div>
  );
}
