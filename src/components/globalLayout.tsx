import { ReactNode } from 'react';
import Link from 'next/link';
import globalLayoutStyles from './globalLayout.module.css';

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={globalLayoutStyles.container}>
      <header className={globalLayoutStyles.header}>
        <div>
          <Link href="/">📚 홈으로 돌아가기</Link>
        </div>
      </header>
      <main className={globalLayoutStyles.main}>{children}</main>
      <footer className={globalLayoutStyles.footer}>푸터</footer>
    </div>
  );
}
