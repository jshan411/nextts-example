import Link from "next/link";
import Image from "next/image";
import bookItemStyles from "@/components/bookItem.module.css";
import { BookType } from "@/types";

export default function BookItem({
  id,
  title,
  subTitle,
  // description,
  author,
  publisher,
  coverImgUrl,
}: BookType) {
  return (
    <Link href={`/book/${id}`} className={bookItemStyles.container}>
      <Image
        src={coverImgUrl}
        alt={`${title} 표지`}
        width={100}
        height={150}
        className={bookItemStyles.coverImage}
      />
      <div>
        <div className={bookItemStyles.title}>{title}</div>
        <div className={bookItemStyles.subTitle}>{subTitle}</div>
        <br />
        <div className={bookItemStyles.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
