import bookStyles from '@/pages/book/[id].module.css';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fetchOneBooks from '@/lib/fetchOneBook';
import { useRouter } from 'next/router';
import Head from 'next/head';

export const getStaticPaths = async () => {
  // 화면 접속 비율을 계산해서, paths에 지정할지 blocking 할지 결정
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }],
    fallback: true, // 빌드 시점에 존재하지 않는 경로에 접속했을 때의 대비책;
    // false: 404 Not Found
    // blocking: SSR 방식
    // true: SSR 방식 + 데이터가 없는 fallback 페이지 제공
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBooks(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

export default function Book({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>테스트 도서 목록</title>
          <meta property="og:title" content="테스트 도서 목록" />
          <meta property="og:description" content="테스트 도서 목록입니다." />
          <meta property="og:image" content="https://aoroawebstorage.blob.core.windows.net/images/alind.png" />
        </Head>
        <div>Loading...</div>;
      </>
    );
  }

  if (!book) {
    return <div>책을 찾을 수 없습니다.</div>;
  }

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={coverImgUrl} />
      </Head>
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
    </>
  );
}
