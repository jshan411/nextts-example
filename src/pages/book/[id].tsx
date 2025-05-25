import bookStyles from '@/pages/book/[id].module.css';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchOneBooks from '@/lib/fetchOneBook';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBooks(Number(id));

  return {
    props: { book },
  };
};

export default function Book({ book }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!book) {
    return <div>책을 찾을 수 없습니다.</div>;
  }

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <div className={bookStyles.container}>
      <div className={bookStyles.coverImgContainer} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
        <img src={coverImgUrl} alt={`${title} 표지`} />
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
