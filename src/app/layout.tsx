import "@/app/globals.css";
import Link from "next/link";
import layoutStyles from "@/app/layout.module.css";
import { BookType } from "@/types";

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  if (!response.ok) {
    return <footer>제작 @winterlood</footer>;
  }
  const books: BookType[] = await response.json();
  return (
    <footer>
      <div>{books.length}개의 도서가 존재합니다.</div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={layoutStyles.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
