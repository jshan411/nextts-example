"use client";

import { ReactNode } from "react";

// import ServerComponent from "./server-component";

// export default function ClientComponent() {
//   console.log("ClientComponent");
//   // 클라이언트 컴포넌트에서 서버 컴포넌트를 호출하기 때문에,
//   // next는 강제로 서버 컴포넌트를 클라이언트 컴포넌트도 취급한다.
//   return <ServerComponent />;
// }

export default function ClientComponent({ children }: { children: ReactNode }) {
  console.log("ClientComponent");
  return <div>{children}</div>;
}
