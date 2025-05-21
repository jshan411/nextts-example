import { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import searchableLayoutStyles from './searchableLayout.module.css';

export default function SearchableLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };
  const onSearch = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <div className={searchableLayoutStyles.searchbarContainer}>
        <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} placeholder="검색어를 입력하세요" />
        <button onClick={onSearch}>검색</button>
      </div>
      {children}
    </div>
  );
}
