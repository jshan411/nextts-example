"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Searchbar() {
  const router = useRouter(); // 클라이언트 컴포넌트에서 사용할 수 있도록 해준다.
  const [query, setQuery] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/search?q=${query}`);
  };

  return (
    <div>
      <input type="text" value={query} onChange={onChangeSearch} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
