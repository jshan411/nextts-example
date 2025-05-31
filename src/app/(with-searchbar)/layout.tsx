import { ReactNode, Suspense } from "react";
import Searchbar from "@/components/searchbar";

export default function SearchLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>검색창 로딩 중...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
