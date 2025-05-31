import bookStyles from "@/app/book/[id]/page.module.css";
import { BookType } from "@/types";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
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
        <img src={coverImgUrl} />
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
