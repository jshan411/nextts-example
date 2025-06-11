import Link from "next/link";
import Image from "next/image";
import bookItemStyles from "@/components/bookItem.module.css";
import { BookType } from "@/types";

interface BookItemProps extends BookType {
  priority?: boolean; // LCP 최적화를 위한 우선순위 속성 추가
}

export default function BookItem({
  id,
  title,
  subTitle,
  // description,
  author,
  publisher,
  coverImgUrl,
  priority = false, // 기본값은 false
}: BookItemProps) {
  return (
    <Link href={`/book/${id}`} className={bookItemStyles.container}>
      <Image
        src={coverImgUrl}
        alt={`${title} 표지`}
        width={80}
        height={105}
        className={bookItemStyles.coverImage}
        priority={priority} // 조건부 priority 적용
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
