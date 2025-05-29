"use client";

import { useState } from "react";

export default function Searchbar() {
  const [query, setQuery] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input type="text" value={query} onChange={onChangeSearch} />
      <button>검색</button>
    </div>
  );
}
