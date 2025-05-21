import { useRouter } from 'next/router';
import books from '@/mock/books.json';
import bookStyles from '@/pages/book/[id].module.css';

export default function Book() {
  const { id, title, subTitle, description, author, publisher, coverImgUrl } = books[0];
  return (
    <div className={bookStyles.container}>
      <div className={bookStyles.coverImgContainer} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
        <img src={coverImgUrl} />
      </div>
      <div>
        <div className={bookStyles.title}>{title}</div>
        <div className={bookStyles.subTitle}>{subTitle}</div>
        <div className={bookStyles.author}>
          {author} | {publisher}
        </div>
        <div className={bookStyles.description}>{description}</div>
      </div>
    </div>
  );
}
