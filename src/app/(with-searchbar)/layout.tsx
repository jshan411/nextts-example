import { ReactNode } from "react";

export default function SearchLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>Search Layout</div>
      {children}
    </div>
  );
}
