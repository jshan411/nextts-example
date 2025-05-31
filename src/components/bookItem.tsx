import Link from "next/link";
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
      <img src={coverImgUrl} />
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
